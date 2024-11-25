import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetEventByIdQuery } from "../../features/event/event.slice";
import { EventInterface } from "../../types/events";
import { toast } from "react-toastify";

const Event: React.FC = () => {
  const { id } = useParams();
  const { data } = useGetEventByIdQuery(id!);

  const event = data?.data?.event as EventInterface;
  const message = data?.message;

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  return (
    <div className="py-4">
      <div className="bg-white border rounded-xl p-4 h-fit md:max-w-sm w-full py-4">
        <header className="rounded-xl h-52 overflow-hidden border w-full bg-white">
          <img src={event?.image?.url} alt="" className="h-full w-full object-cover" />
        </header>
        <div className="mt-2 space-y-3">
          <h3 className="text-base text-gray-800 font-medium">{event?.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default Event;
