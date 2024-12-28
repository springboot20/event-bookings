import { Link } from 'react-router-dom';
import { EventInterface } from '../../types/events';
import { formatDate, formatPrice } from '../../util';
import { BookmarkIcon, CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Skeleton from 'react-loading-skeleton';
import { motion } from 'framer-motion';

export const EventItem: React.FC<{ event: EventInterface }> = ({ event }) => {
  return (
    <motion.div
      layout
      className='bg-white rounded-xl border h-fit md:max-w-sm w-full overflow-hidden'>
      <header className='h-40 w-full '>
        {event?.image?.url === null ? (
          <Skeleton className='h-full w-full -top-1' />
        ) : (
          <img src={event?.image?.url} alt='' className='h-full w-full object-cover object-top' />
        )}
      </header>
      <div className='mt-2 space-y-3 p-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg white- text-gray-900 font-semibold hover:underline'>
            <Link to={`/events/${event?._id}`}>{event?.title}</Link>
          </h3>
          <p className='text-sm text-gray-700 font-medium'>{formatPrice(event?.price)}</p>
        </div>

        <div className='flex items-center justify-between'>
          <div className='space-x-1.5 flex items-center'>
            <MapPinIcon className='size-4' />
            <span className='text-sm text-gray-800 font-medium'>{event?.location}</span>
          </div>

          <div className='space-x-1.5 flex items-center'>
            <span className='text-sm text-gray-800 font-normal'>
              {formatDate(event?.eventDate)}
            </span>
            <CalendarDaysIcon className='size-4' />
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <button className='flex items-center space-x-1.5 px-4 py-1.5 rounded-3xl border hover:bg-gray-100 bg-gray-50 '>
            <BookmarkIcon className='size-4' />
            <span className='text-sm font-normal capitalize'>bookmark</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
