import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetEventByIdQuery } from "../../features/event/event.slice";
import { EventInterface } from "../../types/events";
import { toast } from "react-toastify";
import { MapPinIcon } from "@heroicons/react/24/outline";
import UserAvatar from "../../assets/user-avatar.png";

const Event: React.FC = () => {
  const { id } = useParams();
  const { data } = useGetEventByIdQuery(id!);

  const event = data?.data?.event as EventInterface;
  const message = data?.message;

  console.log(event);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  return (
    <div className="py-4 mx-auto grid grid-col-1 sm:max-w-xl xl:max-w-full lg:grid-col-2 xl:grid-cols-3 gap-5">
      <div className="w-full bg-white rounded-md p-4 col-span-full lg:col-span-1">
        <header className="rounded border overflow-hidden w-full">
          <img src={event?.image?.url} alt="" className="h-full w-full object-cover" />
        </header>

        <div className="mt-4">
          <h3 className="text-lg text-gray-900 font-semibold">{event?.title}</h3>
          <p className="text-sm text-gray-600 font-normal mt-1">{event?.description}</p>
        </div>
      </div>

      <div className="col-span-full lg:col-span-1 xl:col-span-2">
        <div className="flex items-center flex-col sm:flex-row sm:justify-between">
          <div className="flex items-center space-x-2">
            {!event?.owner?.avatar?.url ? (
              <span className="size-10 rounded-full block bg-red-300 border border-white">
                <img src={UserAvatar} className="h-full w-full object-cover object-center" />
              </span>
            ) : (
              <span className="size-10 rounded-full overflow-hidden">
                <img
                  src={event?.owner?.avatar?.url}
                  alt={`${event?.owner?.username} image`}
                  className="h-full w-full object-cover object-center"
                />
              </span>
            )}
            <p className="space-x-2">
              <span>owner:</span>
              <span className="capitalize">{event?.owner?.username}</span>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-4 text-gray-800" />
            <p className="space-x-2">
              <span>venue:</span>
              <span>{event?.location}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
