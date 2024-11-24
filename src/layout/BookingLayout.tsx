import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderNavigation } from "../components/navigation/HeaderNavigation";

const BookingLayout: React.FC = () => {
  return (
    <>
      <HeaderNavigation />
      <main className="mt-16">
        <div className="mx-auto max-w-7xl px-4 xl:px-0">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default BookingLayout;
