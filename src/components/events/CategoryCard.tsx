import { useEffect, useRef } from "react";
import { CategoryInteface } from "../../types/events";
import { motion } from "framer-motion";

export const EventCard = (_: CategoryInteface) => {
  const ref = useRef<HTMLDivElement>(null);
  const category = useRef<string>("");

  useEffect(() => {
    category.current = ref.current?.dataset.category!;
    console.log(category);
  }, [category]);

  return (
    <motion.div
      className="overflow-hidden h-[20rem] rounded-xl relative bg-white border shadow"
      data-category={_.category}
      role="button"
      ref={ref}
    >
      <motion.header className="absolute h-auto w-full">
        <img src={_.image} className="h-full w-full object-cover object-center" />
      </motion.header>
      <motion.div className="text-center" role="button">
        <motion.h3 className="text-[#2C2738] font-semibold text-base mt-2">{_.name}</motion.h3>
      </motion.div>
    </motion.div>
  );
};
