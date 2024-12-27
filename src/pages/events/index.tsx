import { useNavigate, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PlusIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { EventSkeletonLoading } from '../../components/loaders/SkeletonLoader';
import { AcceptedPersmissonRoles, formatDate, formatPrice } from '../../util';
import { useGetAllEventsQuery } from '../../features/event/event.slice';
import { EventInterface } from '../../types/events';
import { toast } from 'react-toastify';
import { Pagination } from '../../components/Pagination';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

const Events = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAllEventsQuery({
    limit,
    page,
    title: searchQuery,
    featured: false,
  });
  const { user } = useAppSelector((state: RootState) => state.auth);

  const events = data?.data?.docs;

  console.log(events);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  const totalPages = data?.data?.totalPages ?? 1;
  const hasNextPage = data?.data?.hasNextPage ?? false;
  const hasPrevPage = data?.data?.hasPrevPage ?? false;

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPrevPage) {
      setPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    if (data?.message) {
      toast.success(data?.message);
    }
  }, [data?.message]);

  return (
    <motion.div className='py-4'>
      <motion.div className='mx-auto max-w-xl mb-4'>
        <motion.fieldset>
          <motion.label htmlFor='search' hidden>
            search bar
          </motion.label>
          <motion.div className='flex items-center border rounded-md overflow-hidden focus-within:ring-[0.1rem] focus-within:ring-indigo-400  focus-within:border-transparent h-12 w-full'>
            <motion.span className='h-full flex items-center justify-center w-10'>
              <MagnifyingGlassIcon className='h-4 text-gray-400' />
            </motion.span>
            <motion.input
              type='tel'
              value={searchQuery}
              onChange={handleChange}
              placeholder='Search events'
              className='block w-full h-full px-4 py-2 flex-1 border-none bg-white  focus:outline-none focus:ring-0 text-gray-700 text-sm font-normal'
            />
          </motion.div>
        </motion.fieldset>
      </motion.div>
      <header className='flex items-center justify-between'>
        <h1 className='text-base sm:text-xl font-semibold text-gray-900'>Event Lists</h1>

        {user?.role === AcceptedPersmissonRoles.ADMIN && (
          <button
            type='button'
            onClick={() => navigate('/events/create-event')}
            className='flex items-center gap-2 text-xs font-semibold py-2.5 text-white px-3 rounded bg-indigo-500 uppercase tracking-wider'>
            <PlusIcon className='h-4 text-white' />
            create event
          </button>
        )}
      </header>
      <motion.div
        layout
        initial='hidden'
        animate='visible'
        variants={gridVariants}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 gap-5'>
        {isLoading ? (
          <EventSkeletonLoading cardsNumber={8} />
        ) : events && events?.length ? (
          events?.map((event: EventInterface) => (
            <motion.div
              layout
              key={event?._id}
              className='bg-white border rounded-xl h-fit md:max-w-sm w-full overflow-hidden'>
              <header className='rounded-xl h-40 w-full '>
                <img
                  src={event?.image?.url}
                  alt=''
                  className='h-full w-full object-cover object-top'
                />
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
          ))
        ) : searchQuery ? (
          <p className='text-base font-medium text-gray-500'>No event found with {searchQuery}</p>
        ) : (
          <EventSkeletonLoading cardsNumber={8} />
        )}
      </motion.div>
      {events?.length && (
        <Pagination
          page={page}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      )}
    </motion.div>
  );
};

export default Events;
