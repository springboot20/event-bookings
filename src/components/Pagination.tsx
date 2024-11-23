import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export const Pagination: React.FC<{
  page: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}> = ({ page, handleNextPage, handlePreviousPage, totalPages, hasNextPage, hasPrevPage }) => {
  return (
    <div className="sticky top-full mb-2 mt-2">
      <div className="flex items-center justify-center max-w-sm mx-auto gap-4 rounded-lg bg-white border h-12">
        <button
          type="button"
          className="cursor-pointer flex items-center gap-2 leading-[0] text-gray-700 py-2 text-base font-medium"
          onClick={handlePreviousPage}
          disabled={!hasPrevPage}
        >
          <ArrowLeftIcon strokeWidth={3.4} className="h-4 w-4" />
          <span>Previous</span>
        </button>
        <span className="text-base font-normal text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          className="cursor-pointer flex items-center gap-2 leading-[0] text-gray-700 py-2 text-base font-medium"
          onClick={handleNextPage}
          disabled={!hasNextPage}
        >
          <span>Next</span>
          <ArrowRightIcon strokeWidth={3.4} className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
