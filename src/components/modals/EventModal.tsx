import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { EventInterface } from "../../types/events";
import { useNavigate } from "react-router-dom";

export const EventModal = ({
  setIsOpen,
  isOpen,
  event,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  event: EventInterface;
}) => {
  const close = () => setIsOpen(false);
  const navigate = useNavigate();

  return (
    <Dialog
      open={isOpen}
      as="div"
      transition
      className="w-full relative z-30 rounded-xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
      onClose={close}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            as="div"
            className="bg-white border rounded-xl max-w-sm w-full p-4 h-[32rem]"
            role="button"
          >
            <header className="rounded-xl overflow-hidden h-64 border w-full bg-white">
              <img src={event?.image?.url} alt="" />
            </header>
            <div className="mt-2 h-44">
              <h3 className="text-lg text-gray-800 font-semibold">{event?.title}</h3>
              <div className="space-y-5 self-end mt-2">
                <p className="text-xs sm:text-base text-gray-700">{event.description}</p>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate(`/events/${event._id}`)}
                    className="w-full text-center py-1.5 px-3 rounded-md bg-[#FFF1A8] text-[#3D3D3D] text-sm border font-semibold"
                  >
                    Go to Event
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-1.5 px-3 rounded-md bg-[#FFE2D9] text-[#3D3D3D] text-sm border font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
