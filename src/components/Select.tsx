import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { classNames } from "../app/util";

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
            className="border p-2 rounded focus:ring-1 outline-none font-satoshi font-normal text-sm w-full block py-4 px-5"
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
                className={({ active }) =>
                  classNames(
                    "flex items-center space-x-2 py-1.5 px-2 relative",
                    opt.isReserved ? "bg-red-50 cursor-not-allowed" : "cursor-pointer",
                    active ? "bg-gray-100 text-gray-600" : "text-gray-700"
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
