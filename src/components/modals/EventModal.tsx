import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export const EventModal = ({
  setIsOpen,
  isOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const close = () => setIsOpen(false);

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
            className="bg-white border rounded-xl max-w-sm p-4 h-[32rem]"
            role="button"
          >
            <header className="rounded-xl h-64 border w-full bg-white"></header>
            <div className="mt-2 space-y-5 h-44">
              <h3 className="text-base text-gray-800 font-medium">
                70% OFF - Table Tennis contest. Book fast!
              </h3>
              <div className="space-y-5 self-end">
                <p className="text-xs sm:text-base text-gray-700">
                  Table tennis contest held at the YMCA Auditorium are now at a hot price. Book your
                  tickets at 70% off and enjoy the game.
                </p>

                <div className="space-y-2">
                  <button className="w-full text-center py-1.5 px-3 rounded-md bg-[#FFF1A8] text-[#3D3D3D] text-sm border font-semibold">
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
