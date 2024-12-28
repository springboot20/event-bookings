import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetEventByIdQuery } from '../../../features/event/event.slice';
import { EventInterface } from '../../../types/events';
import { toast } from 'react-toastify';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import UserAvatar from '../../../assets/user-avatar.png';
import { classNames, formatDate, formatDateTime, formatPrice } from '../../../util';
import Skeleton from 'react-loading-skeleton';

const Event: React.FC = () => {
  const { eventId } = useParams();
  const { data, isLoading } = useGetEventByIdQuery(eventId!);
  const navigate = useNavigate();

  const event = data?.data as EventInterface;
  const message = data?.message;

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  return (
    <div className='py-4 mx-auto flex flex-col max-w-5xl gap-5'>
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
          <span className='text-sm font-medium text-gray-500'>loading event...</span>
        </div>
      ) : (
        <>
          <div className='w-full bg-white rounded-md p-4 col-span-full lg:col-span-1'>
            <header
              className={classNames(
                'rounded overflow-hidden max-w-sm mx-auto h-full',
                event?.image?.url && 'border border-gray-300'
              )}>
              {event?.image?.url !== null ? (
                <img src={event?.image?.url} alt='' className='h-full w-full object-cover' />
              ) : (
                <Skeleton className='!-mt-2 relative h-72 w-full border border-gray-300 appearance-none' />
              )}
            </header>

            <div className='mt-4'>
              <h3 className='text-lg text-gray-900 font-semibold'>{event?.title}</h3>
              <p className='text-sm text-gray-600 font-normal mt-1'>{event?.description}</p>
            </div>
          </div>

          <div className='col-span-full lg:col-span-1 xl:col-span-2'>
            <div className='flex flex-col xs:items-center xs:flex-row xs:justify-between gap-2'>
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
                <p className='space-x-1 text-sm'>
                  <span className='capitalize font-medium text-gray-500'>owner:</span>
                  <span className='capitalize font-normal text-gray-500'>{event?.owner?.username}</span>
                </p>
              </div>

              <div className='flex items-center space-x-0.5'>
                <MapPinIcon className='h-4 text-gray-800' />
                <p className='space-x-1 text-sm'>
                  <span className='capitalize font-medium text-gray-500'>venue:</span>
                  <span className='capitalize font-normal text-gray-500'>{event?.location}</span>
                </p>
              </div>
            </div>

            <div className='flex flex-col xs:items-center xs:flex-row xs:justify-between gap-2 mt-2 xs:mt-4'>
              <div className='flex items-center space-x-1.5'>
                <span className='flex items-center justify-center'>
                  <ClockIcon className='size-8 text-gray-500' strokeWidth={0.8} />
                </span>

                <div className=''>
                  <p className='space-x-1 text-sm text-gray-500'>
                    <span className='capitalize font-medium text-gray-500'>date:</span>
                    <span>{formatDate(event?.eventDate)}</span>
                  </p>

                  <p className='space-x-1 text-sm text-gray-500'>
                    <span className='capitalize font-medium text-gray-500'>time:</span>
                    <span>
                      {formatDateTime(event?.time?.from)} - {formatDateTime(event?.time?.to)}
                    </span>
                  </p>
                </div>
              </div>

              <div className='flex items-center space-x-3'>
                <p className='space-x-1 text-sm flex items-start text-gray-500'>
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
                    strokeWidth={0.8}
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M5.92141 9.65555C3.46857 8.93444 2.67976 8.18889 2.67976 7.02778C2.67976 5.69556 3.77112 4.76667 5.59725 4.76667C7.52063 4.76667 8.23379 5.80556 8.29862 7.33333H10.6866C10.611 5.23111 9.47642 3.3 7.21807 2.67667V0H3.97642V2.64C1.88016 3.15333 0.194499 4.69333 0.194499 7.05222C0.194499 9.87556 2.25835 11.2811 5.27308 12.1C7.97446 12.8333 8.51473 13.9089 8.51473 15.0456C8.51473 15.8889 7.98526 17.2333 5.59725 17.2333C3.37132 17.2333 2.49607 16.1089 2.37721 14.6667H0C0.129666 17.3433 1.90177 18.8467 3.97642 19.3478V22H7.21807V19.3722C9.32515 18.92 11 17.5389 11 15.0333C11 11.5622 8.37426 10.3767 5.92141 9.65555Z'
                      fill='rgb(107 114 128)'
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button
              type='button'
              onClick={() => {
                navigate(`/events/${event?._id}/seats`);
              }}
              className='mt-10 px-4 w-fit text-center py-1.5 rounded-3xl border hover:bg-gray-50 bg-white'>
              <span className='text-sm font-normal capitalize'>resererve a seat</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Event;
