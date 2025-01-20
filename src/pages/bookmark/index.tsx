import { Fragment, useEffect } from "react";
import cartImage from "../../assets/cart-image.jpg";
import { Link } from "react-router-dom";
import { formatPrice, classNames } from "../../util";
import {
  PencilSquareIcon,
  TableCellsIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useBookmark } from "../../hooks/useBookmark";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

const Bookmarks = () => {
  // Redux variables
  const {
    bookmark,
    handleCancelEdit,
    handleDelete,
    handleEditClick,
    handleUpdateSeats,
    isEditing,
    refreshTrigered,
    refetch,
    selectedItemId,

    // seats variables
    selectedSeats,
    setQuery,
    isLoading,
    allSeats,
    selectedEventSeats,
    newSelectedSeatIds,
    handleSelectedSeats,
    filteredSeats,
    setNewSelectedSeatIds,
    refetchSeats,
  } = useBookmark();

  const shipping = 5.0;
  const OrderTotal = (): number => {
    return bookmark?.totalBookmark ?? 1 * shipping;
  };

  useEffect(() => {
    refetch();
  }, [refreshTrigered, refetch]);

  return (
    <Fragment>
      <div className="h-full relative px-4 py-8">
        <div>
          <h1 className="font-bold text-2xl text-gray-800 dark:text-white leading-5">
            Event Bookmark
          </h1>
        </div>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          <div className="col-span-1 xl:col-span-2">
            <div className="rounded-md border bg-white border-gray-300 mb-12 p-6">
              {!bookmark?.bookmarkItems?.length ? (
                <div className="flex flex-col justify-center items-center text-center">
                  <div className="mb-6">
                    <img
                      src={cartImage}
                      alt=""
                      className="max-w-full h-auto align-middle object-contain object-center block"
                    />
                  </div>
                  <p className="text-xl font-semibold text-gray-800 mb-6">
                    Your bookmark is empty. Keep reserving to find an event!
                  </p>
                  <Link
                    to="/events"
                    className="bg-gray-800 hover:bg-gray-600 rounded-md px-5 py-2 text-lg font-medium text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  >
                    Keep Bookmarking
                  </Link>
                </div>
              ) : (
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {bookmark?.bookmarkItems.map((item: any) => (
                      <li key={item?.event?._id} className="flex py-6">
                        <div className="h-36 w-44 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item?.event?.image?.url}
                            alt={"event image"}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between  font-medium text-gray-900">
                              <h3 className="text-gray-700 font-medium capitalize text-sm">
                                {item?.event?.name}
                              </h3>
                              <p className="text-sm font-medium text-gray-700">
                                {formatPrice(item?.event?.price)}
                              </p>
                            </div>
                            <p className="text-gray-500">booked seats ({item?.seats?.length})</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            {selectedItemId === item?.event?._id && isEditing ? (
                              <div className="flex items-start space-x-4">
                                <div className="">
                                  <SeatsSelection
                                    selectedSeats={selectedSeats}
                                    filteredSeats={filteredSeats}
                                    setQuery={setQuery}
                                    isLoading={isLoading}
                                    onChange={handleSelectedSeats}
                                  />
                                  <div>
                                    <span
                                      className={classNames(
                                        "font-medium text-indigo-600 inline-flex items-center"
                                      )}
                                    >
                                      <TableCellsIcon className="h-5 w-5 mr-2" /> Selected Seats
                                    </span>
                                    <div className="flex justify-start items-center flex-wrap max-w-sm gap-2 mt-3">
                                      {allSeats
                                        ?.filter((seat) =>
                                          [...new Set([...newSelectedSeatIds])].includes(seat._id)
                                        )
                                        ?.sort((a, b) => a.number - b.number)
                                        ?.map((ss) => {
                                          return (
                                            <div
                                              className="inline-flex bg-secondary rounded-full p-2 border-[1px] border-zinc-400 items-center gap-2"
                                              key={ss?._id}
                                            >
                                              <p className="text-indigo-600">{ss?.number}</p>
                                              {!ss?.isReserved && (
                                                <XCircleIcon
                                                  role="button"
                                                  className="w-6 h-6 hover:text-indigo-500 text-indigo-600 cursor-pointer"
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
                                            className="inline-flex bg-secondary rounded-full p-2 border-[1px] border-zinc-400 items-center gap-2"
                                            key={ss?._id}
                                          >
                                            <p className="text-indigo-600">{ss?.number}</p>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    refetchSeats();
                                    handleUpdateSeats(item.event?._id);
                                  }}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={handleCancelEdit}
                                  className="font-medium text-gray-500 hover:text-gray-400"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <>
                                <div></div>
                                <div className="flex space-x-4 items-center">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleDelete(item?.event?._id);
                                    }}
                                    className="text-red-600 hover:text-red-500"
                                  >
                                    <TrashIcon className="h-6" />
                                    <span className="sr-only">delete</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleEditClick(item?.event?._id)}
                                    className="text-indigo-600 hover:text-indigo-500"
                                  >
                                    <PencilSquareIcon className="h-6" />
                                    <span className="sr-only">edit</span>
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="relative col-span-1 w-full">
            <div className="p-6 bg-white rounded-lg border w-full">
              <h3 className="text-base sm:text-lg font-medium text-gray-800">Bookmark summary</h3>

              <ul className="mt-3">
                <li className="border-b py-3 px-2 flex items-center justify-between">
                  <span className="text-gray-600 text-sm font-normal capitalize">subtotal</span>
                  <span className="font-semibold text-sm text-gray-800">
                    {formatPrice(bookmark?.totalBookmark ?? 0)}
                  </span>
                </li>
                <li className="border-b py-3 px-2 flex items-center justify-between">
                  <span className="text-gray-600 text-sm font-normal capitalize">
                    shipping estimate
                  </span>
                  <span className="font-semibold text-sm text-gray-800">
                    {formatPrice(shipping)}
                  </span>
                </li>
              </ul>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-medium text-gray-800">Bookmark total</h3>
                <span className="font-semibold text-base text-gray-800">
                  {formatPrice(OrderTotal())}
                </span>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="text-base font-medium text-white py-2.5 px-2 rounded bg-gray-800 hover:bg-gray-600 w-full block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Continue to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Bookmarks;

interface SeatInterface {
  number: number;
  isReserved: boolean;
  _id: string;
}

export const SeatsSelection: React.FC<{
  selectedSeats: SeatInterface[];
  isLoading: boolean;
  filteredSeats: SeatInterface[] | undefined;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onChange: (value: SeatInterface[]) => void;
}> = ({ isLoading, onChange, setQuery, filteredSeats, selectedSeats }) => {
  return (
    <Combobox
      as="div"
      className="w-full"
      multiple
      value={selectedSeats}
      onChange={(value) => onChange(value!)}
    >
      <div className="relative mt-2">
        <ComboboxButton className="w-full">
          <ComboboxInput
            aria-label="options"
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 rounded focus:ring-1 outline-none font-satoshi font-normal text-sm w-full block py-2 px-5"
          />
        </ComboboxButton>
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="size-6 text-gray-700" aria-hidden="true" />
        </ComboboxButton>

        <ComboboxOptions className="absolute outline outline-[1px] outline-zinc-400 bg-white mt-2 p-2 z-20 max-h-40 overflow-y-scroll rounded dark:bg-gray-800 text-base shadow-lg ring-opacity-5 focus:outline-none sm:text-sm w-full">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-3 h-full">
              <div aria-label="Loading..." role="status">
                <svg className="h-7 w-7 animate-spin" viewBox="3 3 18 18">
                  <path
                    className="fill-white"
                    d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                  ></path>
                  <path
                    className="fill-[#4632A8]"
                    d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                  ></path>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-500">loading seats...</span>
            </div>
          ) : (
            filteredSeats?.map((opt) => (
              <ComboboxOption
                key={opt.number}
                value={opt}
                disabled={opt.isReserved}
                className={({ active }) =>
                  classNames(
                    "flex items-center space-x-2 py-1.5 px-2 cursor-pointer relative",
                    active ? "bg-gray-100 text-gray-600" : "text-gray-700",
                    opt.isReserved && "bg-red-50"
                  )
                }
              >
                {({ selected, active }) => (
                  <>
                    <span className={classNames("block truncate", selected ? "font-semibold" : "")}>
                      {opt.number}
                    </span>

                    {opt.isReserved && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4 text-red-600"
                        )}
                      >
                        <ExclamationCircleIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-indigo-400" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};
