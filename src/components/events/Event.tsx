import { EventInterface } from "../../types/events";

// EventInterface

export const EventCard = (_: EventInterface) => {
  return (
    <div className="bg-white border rounded-xl p-4 h-fit" role="button">
      <header className="rounded-xl h-32 border w-full bg-white"></header>
      <div className="mt-2 space-y-3">
        <h3 className="text-base text-gray-800 font-medium">
          70% OFF - Table Tennis contest. Book fast!
        </h3>
      </div>
    </div>
  );
};
