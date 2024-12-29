import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  Description,
  TransitionChild,
} from '@headlessui/react';
import { TrashIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react/jsx-runtime';

export const DeleteModal: React.FC<{
  open: boolean;
  onClose: () => void;
  handleDelete: () => Promise<void>;
  deleteEventLoading: boolean;
  eventDeleted: boolean;
}> = ({ open, onClose, handleDelete, deleteEventLoading, eventDeleted }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog open={open} onClose={onClose} className='w-full relative z-30 ' as='div'>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <DialogBackdrop className='fixed inset-0 z-10 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0' />
        </TransitionChild>

        <div className='fixed inset-0 z-20 overflow-hidden'>
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='flex h-screen items-center justify-center'>
                <DialogPanel className='bg-white border rounded-lg relative max-w-md w-full flex flex-col p-4'>
                  <button
                    onClick={onClose}
                    className='h-12 w-12 flex items-center justify-center absolute top-0 right-0'>
                    <span className='sr-only'>Close modal</span>
                    <XCircleIcon className='h-5 text-[#758E95]' strokeWidth={2.5} />
                  </button>
                  <DialogTitle as='h1' className='text-xl font-bold text-red-500 mt-3'>
                    Delete Event
                  </DialogTitle>
                  <div className='text-center mt-3 space-y-2'>
                    <DialogTitle as='h3' className='font-normal text-base text-red-500'>
                      Are you sure you want to delete this event?
                    </DialogTitle>
                    <Description className='mt-3 text-[#413F3F] font-normal text-sm sm:text-base'>
                      Deleting this event means it will be permanently removed from events
                      collections and cannot be recovered
                    </Description>
                  </div>

                  <div className='flex items-center justify-between mt-4'>
                    <button
                      type='button'
                      disabled={deleteEventLoading}
                      onClick={async () => {
                        await handleDelete();
                        if (eventDeleted) {
                          setTimeout(() => onClose(), 2000);
                        }
                      }}
                      className='flex items-center space-x-1.5 px-4 py-1.5 disabled:cursor-not-allowed rounded border bg-red-500 hover:bg-red-400 transition-colors text-white'>
                      {deleteEventLoading ? (
                        <span>deleting event...</span>
                      ) : (
                        <>
                          <TrashIcon className='h-5 w-5' />
                          <span>delete event</span>
                        </>
                      )}
                    </button>

                    <button
                      type='button'
                      onClick={onClose}
                      className='flex items-center space-x-1.5 px-4 py-1.5 disabled:cursor-not-allowed rounded border bg-indigo-500 hover:bg-indigo-400 transition-colors text-white'>
                      <XCircleIcon className='h-5 w-5' />
                      <span>cancel delete</span>
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
