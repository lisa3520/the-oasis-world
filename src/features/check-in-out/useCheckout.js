import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export function useCheckout() {
  const queryclient = useQueryClient()
  const navigate = useNavigate()
  //可以调用checkin（bookingId）来触发checkin
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`)
      queryclient.invalidateQueries({ active: true })
      navigate('/')
    },
    onError: () => toast.error('There is an error while checking out'),
  })
  return { checkout, isCheckingOut }
}
