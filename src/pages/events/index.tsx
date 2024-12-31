import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { EventSkeletonLoading } from '../../components/loaders/SkeletonLoader';
import { AcceptedPersmissonRoles } from '../../util';
import { useGetAllEventsQuery } from '../../features/event/event.slice';
import { EventInterface } from '../../types/events';
import { toast } from 'react-toastify';
import { Pagination } from '../../components/Pagination';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { EventItem } from './EventItem';

const Events = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAllEventsQuery({
    limit,
    page,
    title: searchQuery.toLowerCase(),
    featured: false,
  });
  const { user } = useAppSelector((state: RootState) => state.auth);

  const events = data?.data?.docs;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  const totalPages = data?.data?.totalPages ?? 1;
  const hasNextPage = data?.data?.hasNextPage ?? false;

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
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
        ) : searchQuery && events?.length === 0 ? (
          <p className='text-base font-medium text-gray-500'>No event found with {searchQuery}</p>
        ) : events?.length === 0 ? (
          <EventSkeletonLoading cardsNumber={8} />
        ) : (
          events?.map((event: EventInterface) => <EventItem event={event} key={event?._id} />)
        )}
      </motion.div>
      {events?.length !== 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      )}
    </motion.div>
  );
};

export default Events;
