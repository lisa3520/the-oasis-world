import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { getStaysAfterDate } from '../../services/apiBookings'

export function useRecentStays() {
  const [searchParams] = useSearchParams()
  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'))
  //subDays是计算从当前日期往回数 numDays 天后的日期
  const queryDate = subDays(new Date(), numDays).toISOString()
  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `last-${numDays}`],
  })
  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  )
  return { isLoading, stays, confirmedStays, numDays }
}
