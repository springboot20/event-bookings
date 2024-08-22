import { useNavigate } from "react-router-dom";
import EventCategory from "./Category";
import React, { useState } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const Events = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  console.log(searchQuery);
  return (
    <motion.div>
      <motion.div className="mx-auto max-w-xl mb-4">
        <motion.fieldset>
          <motion.label htmlFor="search" hidden>
            search bar
          </motion.label>
          <motion.div className="flex items-center border rounded-md overflow-hidden focus-within:ring-[0.1rem] focus-within:ring-indigo-400  focus-within:border-transparent h-10 w-full">
            <motion.span className="h-full flex items-center justify-center w-10">
              <MagnifyingGlassIcon className="h-4 text-gray-400" />
            </motion.span>
            <motion.input
              type="tel"
              value={searchQuery}
              onChange={handleChange}
              placeholder="Search events"
              className="block w-full h-full px-4 py-2 flex-1 border-none bg-white  focus:outline-none focus:ring-0 text-gray-700 placeholder:text-sm placeholder:font-semibold"
            />
          </motion.div>
        </motion.fieldset>
      </motion.div>
      <header className="flex items-center justify-between">
        <h1 className="text-base sm:text-xl font-semibold text-gray-900">Event Lists</h1>

        <button
          onClick={() => navigate("/events/create-event")}
          className="flex items-center gap-2 text-xs font-semibold py-2.5 text-white px-3 rounded-lg bg-indigo-500 uppercase tracking-wider"
        >
          <PlusIcon className="h-4 text-white" />
          create event
        </button>
      </header>
      <EventCategory />
    </motion.div>
  );
};

export default Events;
