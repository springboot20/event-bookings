import { FeaturedEventCard } from '../components/events/FeaturedEvent';
import { EventSkeletonLoading } from '../components/loaders/SkeletonLoader';
import { useGetAllEventsQuery } from '../features/event/event.slice';
import { EventInterface } from '../types/events';

const BookingHome = () => {
  const { data, isLoading } = useGetAllEventsQuery({
    featured: true,
  });

  const events = data?.data?.docs;

  return isLoading ? (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 gap-5 py-4'>
      <EventSkeletonLoading cardsNumber={7} />
    </div>
  ) : (
    <div className='py-4'>
      <h1 className='text-base sm:text-xl font-semibold text-gray-900'>What's happening</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 gap-5'>
        {events?.slice(0, 10).map((event: EventInterface) => (
          <FeaturedEventCard key={event._id} {...event} />
        ))}
      </div>
    </div>
  );
};

export default BookingHome;
