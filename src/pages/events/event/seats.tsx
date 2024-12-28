import { useParams } from 'react-router-dom';
import {
  useGetAllEventSeatsQuery,
  useReserveSeatForEventMutation,
} from '../../../features/seat/seat.slice';
import { SeatInterface } from '../../../types/seat';
import { SeatChart } from '../../../components/seats/SeatChart';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function Seats() {
  const { eventId } = useParams();
  const [reserveSeatForEvent] = useReserveSeatForEventMutation();
  const [isReserved, setIsReserved] = useState<boolean | string>('all');
  const { data, refetch } = useGetAllEventSeatsQuery({
    eventId: eventId as string,
    isReserved: typeof isReserved === 'boolean' ? isReserved : '',
  });
  const seats: SeatInterface[] = data?.data?.seats || data?.data;

  const handleReserveSeatForEvent = async (seatId: string) => {
    try {
      const response = await reserveSeatForEvent({
        eventId,
        seat: seatId,
        reservedAt: Date.now(),
      }).unwrap();

      const data = response;

      if (response.statusCode.toString().startsWith('2')) {
        toast(data?.message, {
          type: 'success',
        });
      }

      await Promise.resolve(setTimeout(() => refetch(), 1000));
    } catch (error: any) {
      toast(error?.error || error?.data?.message, { type: 'error' });
    }
  };

  return (
    <div className='mt-20'>
      <div className='flex items-center justify-end my-4'>
        <fieldset className='space-x-2 flex items-center'>
          <div className='flex items-center gap-2'>
            <input
              type='radio'
              name='isReserved'
              id='all-seats'
              className='size-5 rounded-full'
              value={'all'}
              checked={isReserved === 'all'}
              onChange={(e) => {
                setIsReserved(e.target.value);
                setTimeout(() => refetch(), 1000);
              }}
            />
            <label htmlFor='all-seats' className='text-sm font-normal capitalize text-gray-500'>
              all seats
            </label>
          </div>

          <div className='flex items-center gap-2'>
            <input
              type='radio'
              name='isReserved'
              id='available-seats'
              className='size-5 rounded-full'
              value={'false'}
              checked={isReserved === false}
              onChange={(e) => {
                console.log(JSON.parse(e.target.value));
                setIsReserved(JSON.parse(e.target.value));
                setTimeout(() => refetch(), 1000);
              }}
            />
            <label
              htmlFor='available-seats'
              className='text-sm font-normal capitalize text-gray-500'>
              available seats
            </label>
          </div>

          <div className='flex items-center gap-2'>
            <input
              type='radio'
              name='isReserved'
              id='occupied-seats'
              checked={isReserved === true}
              className='size-5 rounded-full'
              value={'true'}
              onChange={(e) => {
                console.log(JSON.parse(e.target.value));
                setIsReserved(JSON.parse(e.target.value));
                setTimeout(() => refetch(), 1000);
              }}
            />
            <label
              htmlFor='occupied-seats'
              className='text-sm font-normal capitalize text-gray-500'>
              occupied seats
            </label>
          </div>
        </fieldset>
      </div>
      <SeatChart seats={seats} handleClick={handleReserveSeatForEvent} />
    </div>
  );
}
