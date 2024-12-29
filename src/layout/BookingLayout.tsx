import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderNavigation } from '../components/navigation/HeaderNavigation';

const BookingLayout: React.FC = () => {
  return (
    <>
      <HeaderNavigation />
      <main className='mx-auto mt-16 max-w-7xl px-4 xl:px-0'>
        <Outlet />
      </main>
    </>
  );
};

export default BookingLayout;
