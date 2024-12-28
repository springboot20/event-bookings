import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export const Pagination: React.FC<{
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}> = ({ page, handleNextPage, handlePreviousPage, totalPages, hasNextPage }) => {
  return (
    <div className='sticky top-full mb-2 mt-8'>
      <div className='flex items-center justify-center max-w-sm mx-auto gap-4 rounded-lg bg-white border'>
        <button
          type='button'
          className='cursor-pointer flex items-center gap-2 leading-[0] text-gray-700 py-2 text-sm font-medium disabled:text-gray-500'
          onClick={handlePreviousPage}
          disabled={page === 1}>
          <ArrowLeftIcon strokeWidth={2} className='h-4 w-4' />
          <span>Previous</span>
        </button>
        <span className='text-sm font-medium text-gray-600'>
          Page {page} of {totalPages}
        </span>
        <button
          type='button'
          className='cursor-pointer flex items-center gap-2 leading-[0] text-gray-700 disabled:text-gray-500 py-2 text-sm font-medium'
          onClick={handleNextPage}
          disabled={!hasNextPage}>
          <span>Next</span>
          <ArrowRightIcon strokeWidth={2} className='h-4 w-4' />
        </button>
      </div>
    </div>
  );
};
