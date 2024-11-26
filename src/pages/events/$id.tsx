import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetEventByIdQuery } from "../../features/event/event.slice";
import { EventInterface } from "../../types/events";
import { toast } from "react-toastify";
import { formatPrice } from "../../util";

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
    <div className="py-4 mx-auto grid grid-col-1 sm:max-w-xl lg:max-w-4xl lg:grid-col-3">
      <div className="max-w-sm w-full bg-white rounded-md p-4">
        <header className="rounded border overflow-hidden w-full col-span-full lg:col-span-1">
          <img src={event?.image?.url} alt="" className="h-full w-full object-cover" />
        </header>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-gray-900 font-semibold">{event.title}</h3>
            <p className="text-base text-gray-700 font-medium">{formatPrice(event.price)}</p>
          </div>
          <p className="text-base text-gray-800 font-normal mt-2">{event.description}</p>
        </div>
      </div>

      <div className="col-span-full lg:col-span-2">
        
      </div>
    </div>
  );
};

export default Event;
