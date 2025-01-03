import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react/jsx-runtime';
import { SeatsSelection } from '../Select';
import { classNames } from '../../util';
import { BookmarkIcon, TableCellsIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useBookmark } from '../../hooks/useBookmark';
import { useEffect } from 'react';

export const BookMarkSeats = ({
  onClose,
  isOpen,
  eventId,
}: {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
}) => {
  const {
    selectedSeats,
    setQuery,
    isLoading,
    allSeats,
    selectedEventSeats,
    newSelectedSeatIds,
    handleSelectedSeats,
    filteredSeats,
    setNewSelectedSeatIds,
    setEventId,
    bookmark,
    setSelectedEventSeats,
    addNewItemToBookmark,
    refetchSeats,
    refetch
  } = useBookmark();

  const selectedItem = bookmark?.bookmarkItems?.find((item: any) => {
    return item?.event?._id === eventId;
  });

  useEffect(() => {
    setEventId(eventId);
    const seats = selectedItem?.seats;

    if (selectedItem) {
      setSelectedEventSeats(seats);
    }
  }, [eventId, selectedItem, setEventId, setSelectedEventSeats]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={onClose} className='relative z-30 ' as='div'>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <DialogBackdrop className='fixed inset-0 bg-black/30' />
        </TransitionChild>
        <div className='fixed inset-0 z-20'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <DialogPanel className='relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 h-auto'>
                <DialogTitle className='text-lg font-medium text-gray-700'>
                  Select seats to reserved for event
                </DialogTitle>
                <SeatsSelection
                  selectedSeats={selectedSeats}
                  filteredSeats={filteredSeats}
                  setQuery={setQuery}
                  isLoading={isLoading}
                  onChange={handleSelectedSeats}
                />

                <div className='my-5'>
                  <span
                    className={classNames('font-medium text-indigo-600 inline-flex items-center')}>
                    <TableCellsIcon className='h-5 w-5 mr-2' /> Selected Seats
                  </span>
                  <div className='flex justify-start items-center flex-wrap gap-2 mt-3'>
                    {allSeats
                      ?.filter((seat) => [...new Set([...newSelectedSeatIds])].includes(seat._id))
                      ?.sort((a, b) => a.number - b.number)
                      ?.map((ss) => {
                        return (
                          <div
                            className='inline-flex bg-secondary rounded-full p-2 border-[1px] border-zinc-400 items-center gap-2'
                            key={ss?._id}>
                            <p className='text-indigo-600'>{ss?.number}</p>
                            {!ss?.isReserved && (
                              <XCircleIcon
                                role='button'
                                className='w-6 h-6 hover:text-indigo-500 text-indigo-600 cursor-pointer'
                                onClick={() => {
                                  setNewSelectedSeatIds(
                                    [...new Set([...newSelectedSeatIds])]?.filter(
                                      (s) => s !== ss?._id
                                    )
                                  );
                                }}
                              />
                            )}
                          </div>
                        );
                      })}

                    {selectedEventSeats?.map((ss) => {
                      return (
                        <div
                          className='inline-flex bg-secondary rounded-full p-2 border-[1px] border-zinc-400 items-center gap-2'
                          key={ss?._id}>
                          <p className='text-indigo-600'>{ss?.number}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className='mt-5 flex justify-between items-center gap-4'>
                  <button
                    type='button'
                    disabled={isLoading}
                    onClick={onClose}
                    className='w-1/2 flex items-center gap-1 justify-center text-sm rounded-3xl px-2 py-3.5 text-center border hover:bg-red-400 bg-red-500 text-white'>
                    <XCircleIcon role='button' className='w-6 h-6' />
                    <span className='text-sm font-normal capitalize'>close</span>
                  </button>
                  <button
                    type='button'
                    disabled={isLoading}
                    onClick={async () => {
                      await addNewItemToBookmark(eventId);
                      refetchSeats();
                      refetch()
                      setTimeout(() => onClose(), 1500);
                    }}
                    className='w-1/2 flex items-center gap-1 justify-center text-sm rounded-3xl px-2 py-3.5 text-center border hover:bg-indigo-400 bg-indigo-500 text-white'>
                    <BookmarkIcon className='size-4' />
                    <span className='text-sm font-normal capitalize'>add to bookmark</span>
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
