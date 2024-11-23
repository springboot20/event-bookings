import { EventInterface } from "../../types/events";
import { useNavigate } from "react-router-dom";

export const EventCard = (event: EventInterface) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white border rounded-xl h-auto md:max-w-sm w-full cursor-pointer overflow-hidden"
      role="button"
      onClick={() => navigate(`/events/${event._id}`)}
    >
      <header className="h-52 overflow-hidden w-full">
        <img src={event?.image?.url} alt="" className="h-full w-full object-cover" />
      </header>
      <div className="mt-2 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base text-gray-800 font-medium">{event.title}</h3>
          <h3 className="text-base text-gray-800 font-medium">{event.title}</h3>
        </div>
      </div>
    </div>
  );
};
