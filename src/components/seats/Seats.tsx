import {
  useGetAllEventSeatsQuery,
  useReserveSeatForEventMutation,
} from '../../features/seat/seat.slice';
import { SeatInterface } from '../../types/seat';
import { SeatChart } from './SeatChart';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useAddEventToBookmarkMutation } from '../../features/bookmark/bookmark.slice';

export default function Seats({
  eventId,
  setShowSeats,
}: {
  eventId: string;
  setShowSeats: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [reserveSeatForEvent] = useReserveSeatForEventMutation();
  const [isReserved, setIsReserved] = useState<boolean | string>('all');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [addEventToBookmark] = useAddEventToBookmarkMutation();
  const { data, refetch, isLoading } = useGetAllEventSeatsQuery({
    eventId: eventId as string,
    isReserved: typeof isReserved === 'boolean' ? isReserved : '',
  });
  const seats: SeatInterface[] = data?.data?.seats || data?.data;

  const handleSelectedSeats = (seatId: string) => {
    setSelectedSeats((prev) => [...prev, seatId]);
  };

  const handleReserveSeatForEvent = async () => {
    try {
      const response = await reserveSeatForEvent({
        eventId,
        seats: [...new Set([...selectedSeats])],
        reservedAt: Date.now(),
      }).unwrap();

      const data = response;

      if (response.statusCode.toString().startsWith('2')) {
        toast(data?.message, {
          type: 'success',
        });
      }
    } catch (error: any) {
      toast(error?.error || error?.data?.message, { type: 'error' });
    }
  };

  const handleAddEventToBookmark = async () => {
    try {
      const response = await addEventToBookmark({
        eventId,
        seats: [...new Set([...selectedSeats])],
      }).unwrap();
      const data = response;

      if (response.statusCode.toString().startsWith('2')) {
        toast(data?.message, {
          type: 'success',
        });
      }
    } catch (error: any) {
      toast(error?.error || error?.data?.message, { type: 'error' });
    }
  };

  const handleFulfilment = () => {
    handleReserveSeatForEvent();
    handleAddEventToBookmark();
  };

  return (
    <div className='mt-20'>
      <fieldset className='space-x-2 flex items-center justify-end'>
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
          <label htmlFor='available-seats' className='text-sm font-normal capitalize text-gray-500'>
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
              setTimeout(() => refetch(), 1500);
            }}
          />
          <label htmlFor='occupied-seats' className='text-sm font-normal capitalize text-gray-500'>
            occupied seats
          </label>
        </div>
      </fieldset>
      {isLoading ? (
        <div className='flex items-center justify-center space-x-3 h-[calc(100vh-5rem)]'>
          <div aria-label='Loading...' role='status'>
            <svg className='h-7 w-7 animate-spin' viewBox='3 3 18 18'>
              <path
                className='fill-white'
                d='M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z'></path>
              <path
                className='fill-[#4632A8]'
                d='M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z'></path>
            </svg>
          </div>
          <span className='text-sm font-medium text-gray-500'>loading seats</span>
        </div>
      ) : (
        <>
          <SeatChart seats={seats} handleClick={handleSelectedSeats} />
          <button
            onClick={() => {
              handleFulfilment();
              setTimeout(() => setShowSeats(false), 1000);
            }}
            className='mt-10 px-4 w-fit text-center py-1.5 rounded-3xl border hover:bg-gray-50 bg-white'>
            <span className='text-sm font-normal capitalize'>reserve seat / add to bookmark</span>
          </button>
        </>
      )}
    </div>
  );
}
