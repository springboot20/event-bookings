import { EventInterface } from "../../types/events";
import { AcceptedPersmissonRoles, formatDate, formatPrice, truncateChars } from "../../util";
import {
  BookmarkIcon,
  CalendarDaysIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useState, useCallback } from "react";
import { DeleteModal } from "../modals/DeleteEventModal";
import { useDeleteEventMutation } from "../../features/event/event.slice";
import { toast } from "react-toastify";

export const EventItem: React.FC<{ event: EventInterface; handleOpenBookmark: () => void }> = ({
  event,
  handleOpenBookmark,
}) => {
  const event_date = new Date(event?.eventDate);
  const isSoldOut = event_date.getTime() < new Date(Date.now()).getTime();
  const navigate = useNavigate();
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [eventDeleted, setEventDeleted] = useState<boolean>(false);
  const [deleteEvent, { isLoading }] = useDeleteEventMutation();

  const { user } = useAppSelector((state: RootState) => state.auth);
  const handleEventDelete = useCallback(
    async (eventId: string) => {
      await deleteEvent(eventId)
        .unwrap()
        .then((response) => {
          setEventDeleted(true);
          toast.success(response.message);
        })
        .catch((error: any) => {
          if (error) {
            toast.error(error.error);
            toast.error(error.data.message);
          }
          setEventDeleted(true);
        });
    },
    [deleteEvent]
  );

  const onOpen = (id: string) => setOpen((prev) => ({ ...prev, [id]: true }));
  const onClose = (id: string) => setOpen((prev) => ({ ...prev, [id]: false }));

  return (
    <>
      <DeleteModal
        open={!!open[event?._id]}
        onClose={() => onClose(event?._id)}
        eventDeleted={eventDeleted}
        deleteEventLoading={isLoading}
        handleDelete={() => handleEventDelete(event?._id)}
      />
      <motion.div layout className="bg-white rounded-xl border h-fit w-full overflow-hidden">
        <header className="h-40 w-full ">
          {event?.image?.url === null ? (
            <Skeleton className="h-full w-full -top-1" />
          ) : (
            <img src={event?.image?.url} alt="" className="h-full w-full object-cover object-top" />
          )}
        </header>
        <div className="mt-2 space-y-3 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-gray-900 font-medium">{event?.title}</h3>
            <p className="text-sm text-gray-700 font-medium">{formatPrice(event?.price)}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-x-1.5 flex items-center">
              <MapPinIcon className="size-4" />
              <span className="text-sm truncate text-gray-800 font-medium">
                {truncateChars(event?.location, 14)}
              </span>
            </div>

            <div className="space-x-1.5 flex items-center">
              <span className="text-sm text-gray-800 font-normal">
                {formatDate(event?.eventDate)}
              </span>
              <CalendarDaysIcon className="size-4" />
            </div>
          </div>
          {[AcceptedPersmissonRoles.ADMIN, AcceptedPersmissonRoles.MODERATOR].includes(
            user?.role
          ) ? (
            <div className="flex items-center justify-between mt-2">
              <button
                type="button"
                onClick={() => onOpen(event?._id)}
                className="flex items-center gap-1 text-xs rounded-3xl px-5 py-1.5 border hover:bg-red-400 bg-red-500 text-white"
              >
                <TrashIcon className="h-5 w-5" />
                <span>delete event</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  navigate(`/events/${event?._id}/edit-event/`);
                }}
                className="flex items-center gap-1 text-xs rounded-3xl px-5 py-1.5 border hover:bg-indigo-400 bg-indigo-500 text-white"
              >
                <PencilIcon className="h-5 w-5" />
                <span>edit event</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between mt-2">
              <button
                type="button"
                disabled={isSoldOut}
                className="flex items-center space-x-1.5 px-4 py-1.5 rounded-3xl border hover:bg-gray-100 disabled:bg-gray-100 bg-gray-50"
                onClick={handleOpenBookmark}
              >
                <BookmarkIcon className="size-4" />
                <span className="text-sm font-normal capitalize">bookmark</span>
              </button>

              {isSoldOut ? (
                <button
                  disabled={isSoldOut}
                  type="button"
                  className="flex items-center space-x-1.5 px-4 py-1.5 disabled:cursor-not-allowed rounded-3xl border bg-red-400"
                >
                  <ExclamationCircleIcon className="size-4 text-white" />
                  <span className="text-sm font-normal capitalize text-white">event ended</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate(`/events/${event?._id}`)}
                  className="flex items-center space-x-1.5 px-4 py-1.5 rounded-3xl border hover:bg-indigo-400 bg-indigo-500 text-white"
                >
                  <BookmarkIcon className="size-4" />
                  <span className="text-sm font-normal capitalize">event details</span>
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};
