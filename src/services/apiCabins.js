import supabase, { supabaseUrl } from './supabase'
export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error(error)
    throw new Error('cabins could not be loaded')
  }
  return data
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id)
  if (error) {
    console.error(error)
    throw new Error('cabins could not be deleted')
  }
  return data
}
export async function createEditCabin(newCabin, id) {
  // 在JavaScript中，startsWith() 方法是用来检查一个字符串是否以另一个字符串开始。它返回一个布尔值（true 或 false），表示调用该方法的字符串是否以给定的子字符串开头。
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  )
  //   "https://vfodrjehlabzhhykxkwk.supabase.co/storage/v1/object/public/cabin-images/0.6986571196026115-cabin-008.jpg"
  // 'https://vfodrjehlabzhhykxkwk.supabase.co/storage/v1/object/public/cabin-images/cabin-008.jpg'
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
  //1.create/edit cabin,这里存储图片的地址是正确的
  let query = await supabase.from('cabins')
  //create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }])

  //edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id)

  const { data, error } = await query.select().single()
  if (error) {
    console.error(error)
    throw new Error('Cabin could not be created')
  }
  //2. upload image，这里的newCabin.image是文件类型，上面是新的对象，斌没有对newCabin进行修改
  // 2. Upload image
  if (hasImagePath) return data
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)
  //3.Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id)
    console.error(storageError)
    throw new Error(
      'cabins image could not be uploaded and the cabin was not created'
    )
  }
  return data
}
