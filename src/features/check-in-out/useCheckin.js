import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export function useCheckin() {
  const queryclient = useQueryClient()
  const navigate = useNavigate()
  //可以调用checkin（bookingId）来触发checkin
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`)
      queryclient.invalidateQueries({ active: true })
      navigate('/')
    },
    onError: () => toast.error('There is an error while checking in'),
  })
  return { checkin, isCheckingIn }
}
