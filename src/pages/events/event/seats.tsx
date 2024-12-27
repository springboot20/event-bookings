import { useParams } from 'react-router-dom';
import { useGetAllEventSeatsQuery } from '../../../features/seat/seat.slice';
import { SeatInterface } from '../../../types/seat';
import { SeatChart } from '../../../components/seats/SeatChart';

export default function Seats() {
  const { eventId } = useParams();
  const { data } = useGetAllEventSeatsQuery(eventId as string);

  const seats: SeatInterface[] = data?.data?.seats;

  console.log(seats);

  const handleClick = (id: string) => {
    console.log(id);
  };

  return <SeatChart seats={seats} handleClick={handleClick} />;
}
