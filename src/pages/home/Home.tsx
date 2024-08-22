import { FeaturedEventCard } from "../../components/events/Card";

const BookingHome = () => {
  return (
    <>
      <h1 className="text-base sm:text-xl font-semibold text-gray-900">What's happening</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 gap-5">
        <FeaturedEventCard />
        <FeaturedEventCard />
        <FeaturedEventCard />
        <FeaturedEventCard />
        <FeaturedEventCard />
      </div>
    </>
  );
};

export default BookingHome;
