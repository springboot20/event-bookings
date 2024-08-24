import { useState } from "react";
import { EventModal } from "../modals/EventModal";
import { EventInterface } from "../../types/events";

export const FeaturedEventCard = (event: EventInterface) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <EventModal isOpen={isOpen} setIsOpen={setIsOpen} event={event} />
      <div className="bg-white border rounded-xl p-4 h-fit" role="button">
        <header className="rounded-xl h-32 border w-full bg-white"></header>
        <div className="mt-2 space-y-3">
          <h3 className="text-base text-gray-800 font-medium">{event.title}</h3>
          <div className="flex w-full justify-end">
            <button
              className="text-indigo-800 font-semibold text-sm"
              onClick={() => setIsOpen(true)}
            >
              Read more
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
