import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Spinner from '../../ui/Spinner'
import { useSettings } from './useSettings'
import { useUpdateSetting } from './useUpdateSetting'

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    //settings: { ... } = {} 当初始化时值没有取到的时候，minBookingLength、maxBookingLength、maxGuestsPerBooking 和 breakfastPrice 都会被赋予 undefined（因为右侧的默认值是空对象 {}，并且没有为这些内部属性提供默认值）。但是，这里有一个微妙之处：由于直接在解构表达式中设置了默认值（即 {}），它实际上并不会影响到已经解构的 settings 变量本身
  } = useSettings()
  const { updateSetting, isUpdating } = useUpdateSetting()
  if (isLoading) return <Spinner />
  function handleUpdate(e, field) {
    const { value } = e.target
    if (!value) return
    updateSetting({ [field]: value })
  }
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
