import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useEffect, useState } from 'react';
import { BookmarkInterface } from '../../types/bookmark';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { formatPrice, LocalStorage } from '../../util';
import { toast } from 'react-toastify';
import {
  useRemoveItemFromBookmarkMutation,
  useUserBookmarkQuery,
} from '../../features/bookmark/bookmark.slice';

export default function BookmarkModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data, refetch } = useUserBookmarkQuery();
  const [removeItemFromBookmark] = useRemoveItemFromBookmarkMutation();
  const { isNewItemAddedToBookmark } = useAppSelector((state: RootState) => state.bookmark);
  const [refreshTrigered, setRefreshTrigered] = useState(false);

  const bookmark = data?.data?.bookmark ?? (LocalStorage.get('bookmark') as BookmarkInterface);

  const handleDelete = async (eventtId: string) => {
    try {
      const response = await removeItemFromBookmark(eventtId).unwrap();
      setRefreshTrigered(!refreshTrigered);

      if (response.message) {
        toast.success(response.message);
      }
    } catch (error: any) {
      if (error.data) {
        toast.error(error.data.message);
      }
    }
  };
  useEffect(() => {
    refetch();
  }, [refreshTrigered, isNewItemAddedToBookmark, refetch]);

  return (
    <Dialog open={isOpen} onClose={setIsOpen} className='relative z-20'>
      <DialogBackdrop className='fixed inset-0 z-10 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0' />
      <div className='fixed inset-0 overflow-hidden z-20'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
            <DialogPanel className='pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700'>
              <div className='flex h-full flex-col bg-white shadow-xl'>
                <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                  <div className='flex items-start justify-between'>
                    <DialogTitle className='text-lg font-medium text-gray-900'>
                      Shopping cart
                    </DialogTitle>
                    <div className='ml-3 flex h-7 items-center'>
                      <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className='h-10 w-10 flex items-center justify-center absolute right-4 top-4 rounded-full bg-gray-100'>
                        <span className='sr-only'>Close panel</span>
                        <XMarkIcon className='h-5' strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>

                  <div className='mt-10'>
                    <div className='py-3'>
                      <div className='flow-root'>
                        <ul role='list' className='-my-6 divide-y divide-gray-200'>
                          {bookmark?.bookmarkItems?.slice(0, 6)?.map((item: any) => (
                            <li key={item?.event?._id} className='flex py-6'>
                              <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                <img
                                  src={item?.event?.image?.url}
                                  alt={`${item?.event?.title}`}
                                  className='h-full w-full object-cover object-center'
                                />
                              </div>

                              <div className='ml-4 flex flex-1 flex-col'>
                                <div>
                                  <div className='flex justify-between  font-medium text-gray-900'>
                                    <h3 className='text-gray-700 font-medium capitalize text-lg'>
                                      {item?.event?.title}
                                    </h3>
                                    <p className='text-lg font-medium text-gray-700'>
                                      {formatPrice(item?.event?.price)}
                                    </p>
                                  </div>
                                  <p className='text-base font-normal text-gray-500'>
                                    {item?.event?.description}
                                  </p>
                                </div>
                                <div className='flex flex-1 items-end justify-between text-sm'>
                                  <p className='text-gray-500 text-lg font-medium'>
                                    booked seats ({item?.seats?.length})
                                  </p>
                                  <div className='flex space-x-4 items-center'>
                                    <button
                                      type='button'
                                      onClick={() => {
                                        handleDelete(item?.event?._id);
                                      }}
                                      className='text-red-600 hover:text-red-500'>
                                      <TrashIcon className='h-6' />
                                      <span className='sr-only'>delete</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Link
                      to='/bookmarks'
                      onClick={() => setIsOpen(false)}
                      className='text-base font-medium text-white py-2.5 px-2 rounded bg-gray-800 w-full block text-center'>
                      See all bookmarked events 
                    </Link>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
