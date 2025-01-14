import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderNavigation } from '../components/navigation/HeaderNavigation';
import BookmarkModal from '../components/modals/BookmarkModal';

const BookingLayout: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <BookmarkModal isOpen={isOpen} setIsOpen={setOpen} />
      <HeaderNavigation setOpen={setOpen}/>
      <main className='mx-auto mt-16 max-w-7xl px-2'>
        <Outlet />
      </main>
    </>
  );
};

export default BookingLayout;
