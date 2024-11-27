import { useState } from "react";
import { EventModal } from "../modals/EventModal";
import { EventInterface } from "../../types/events";

export const FeaturedEventCard = (event: EventInterface) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <EventModal isOpen={isOpen} setIsOpen={setIsOpen} event={event} />
      <div className="bg-white border rounded-xl p-4 h-fit" role="button">
        <header className="rounded-xl h-52 overflow-hidden border w-full bg-white">
          <img src={event?.image?.url} alt="" className="h-full w-full object-cover" />
        </header>
        <div className="mt-2 space-y-3">
          <h3 className="text-lg text-gray-800 font-semibold">{event?.title}</h3>
          <p className="text-sm text-gray-800 font-normal">{event?.description}</p>
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
