import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetEventByIdQuery } from '../../features/event/event.slice';
import { EventInterface } from '../../types/events';
import { toast } from 'react-toastify';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import UserAvatar from '../../assets/user-avatar.png';
import { classNames, formatDate, formatDateTime, formatPrice } from '../../util';
import Skeleton from 'react-loading-skeleton';

const Event: React.FC = () => {
  const { id } = useParams();
  const { data } = useGetEventByIdQuery(id!);

  const event = data?.data as EventInterface;
  const message = data?.message;

  console.log(event);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  return (
    <div className='py-4 mx-auto flex flex-col max-w-5xl gap-5'>
      <div className='w-full bg-white rounded-md p-4 col-span-full lg:col-span-1'>
        <header
          className={classNames(
            'rounded overflow-hidden max-w-sm mx-auto h-full',
            event?.image?.url && 'border border-gray-300'
          )}>
          {event?.image?.url !== null ? (
            <Skeleton className='!-mt-2 relative h-72 w-full border border-gray-300 appearance-none' />
          ) : (
            <img src={event?.image?.url} alt='' className='h-full w-full object-cover' />
          )}
        </header>

        <div className='mt-4'>
          <h3 className='text-lg text-gray-900 font-semibold'>{event?.title}</h3>
          <p className='text-sm text-gray-600 font-normal mt-1'>{event?.description}</p>
        </div>
      </div>

      <div className='col-span-full lg:col-span-1 xl:col-span-2'>
        <div className='flex items-center flex-col sm:flex-row sm:justify-between'>
          <div className='flex items-center space-x-2'>
            {!event?.owner?.avatar?.url ? (
              <span className='size-10 rounded-full block bg-red-300 border border-white'>
                <img
                  src={UserAvatar}
                  className='h-full w-full object-cover object-center'
                  alt={event?.title}
                />
              </span>
            ) : (
              <span className='size-10 rounded-full overflow-hidden'>
                <img
                  src={event?.owner?.avatar?.url}
                  alt={`${event?.owner?.username} avatar`}
                  className='h-full w-full object-cover object-center'
                />
              </span>
            )}
            <p className='space-x-2 text-base'>
              <span className='capitalize font-medium text-gray-500'>owner:</span>
              <span className='capitalize'>{event?.owner?.username}</span>
            </p>
          </div>

          <div className='flex items-center space-x-2'>
            <MapPinIcon className='h-4 text-gray-800' />
            <p className='space-x-2 text-base'>
              <span className='capitalize font-medium text-gray-500'>venue:</span>
              <span>{event?.location}</span>
            </p>
          </div>
        </div>

        <div className='flex items-center flex-col sm:flex-row sm:justify-between'>
          <div className='flex items-center space-x-3 mt-4'>
            <span className='flex items-center justify-center'>
              <ClockIcon className='size-8 text-gray-500' />
            </span>

            <div className=''>
              <p className='space-x-2 text-base text-gray-500'>
                <span className='capitalize font-medium text-gray-500'>date:</span>
                <span>{formatDate(event?.eventDate)}</span>
              </p>

              <p className='space-x-2 text-base text-gray-500'>
                <span className='capitalize font-medium text-gray-500'>time:</span>
                <span>
                  {formatDateTime(event?.time?.from)} - {formatDateTime(event?.time?.to)}
                </span>
              </p>
            </div>
          </div>

          <div className='flex items-center space-x-3 mt-4'>
            <p className='space-x-2 text-base flex items-start text-gray-500'>
              <span className='capitalize font-medium'>price:</span>
              <span className='flex flex-col -space-y-1'>
                <small className='capitalize'>{formatPrice(event?.price)}</small>
                <small className='line-through text-gray-400'>28.50</small>
              </span>
            </p>
            <span className='flex items-center justify-center'>
              <svg
                width='11'
                height='22'
                viewBox='0 0 11 22'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M5.92141 9.65555C3.46857 8.93444 2.67976 8.18889 2.67976 7.02778C2.67976 5.69556 3.77112 4.76667 5.59725 4.76667C7.52063 4.76667 8.23379 5.80556 8.29862 7.33333H10.6866C10.611 5.23111 9.47642 3.3 7.21807 2.67667V0H3.97642V2.64C1.88016 3.15333 0.194499 4.69333 0.194499 7.05222C0.194499 9.87556 2.25835 11.2811 5.27308 12.1C7.97446 12.8333 8.51473 13.9089 8.51473 15.0456C8.51473 15.8889 7.98526 17.2333 5.59725 17.2333C3.37132 17.2333 2.49607 16.1089 2.37721 14.6667H0C0.129666 17.3433 1.90177 18.8467 3.97642 19.3478V22H7.21807V19.3722C9.32515 18.92 11 17.5389 11 15.0333C11 11.5622 8.37426 10.3767 5.92141 9.65555Z'
                  fill='black'
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
