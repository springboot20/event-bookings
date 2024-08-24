import { FeaturedEventCard } from "../../components/events/FeaturedEvent";
import { useEvent } from "../../hooks/events/useEvent";

export const BookingHome = () => {
  const { events } = useEvent();

  return (
    <>
      <h1 className="text-base sm:text-xl font-semibold text-gray-900">What's happening</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 gap-5">
        {events?.slice(0, 10).map((event) => (
          <FeaturedEventCard key={event._id} {...event} />
        ))}
      </div>
    </>
  );
};
