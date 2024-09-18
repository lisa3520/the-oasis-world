import styled from 'styled-components'
import Spinner from '../../ui/Spinner'
import CabinRow from './CabinRow'
import { useCabins } from './useCabins'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import Empty from '../../ui/Empty'
import { useSearchParams } from 'react-router-dom'

export default function CabinTable() {
  const { isLoading, cabins, error } = useCabins()
  const [searchParam] = useSearchParams()
  if (isLoading) return <Spinner />
  let filteredCabins
  //1.filter
  const filterValue = searchParam.get('discount') || 'all'
  if (!cabins.length) return <Empty resourceName='cabins' />
  if (filterValue === 'all') filteredCabins = cabins
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0)
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0)
  //2.sort
  const sortBy = searchParam.get('sortBy') || 'name-asc'
  const [field, direction] = sortBy.split('-')
  const modifer = direction === 'asc' ? 1 : -1
  const sortedCabin = filteredCabins.sort((a, b) => {
    //考虑首字母排序
    if (field == 'name') {
      // localeCompare() 方法，它返回一个表示字符串在排序中应该位于参考字符串前面、后面还是与之相同的数字
      return a[field].localeCompare(b[field]) * modifer
    } else {
      return (a[field] - b[field]) * modifer
    }
  })
  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header role='row'>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  )
}
