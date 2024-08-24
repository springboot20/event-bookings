import { EventInterface } from "../../types/events";

export const EventCard = (event: EventInterface) => {

  return (
    <div className="bg-white border rounded-xl p-4 h-fit md:max-w-sm w-full" role="button">
      <header className="rounded-xl h-32 border w-full bg-white"></header>
      <div className="mt-2 space-y-3">
        <h3 className="text-base text-gray-800 font-medium">
         {event.title}
        </h3>
      </div>
    </div>
  );
};
