import { useState } from "react";
import { EventCard } from "../../components/events/CategoryCard";
import { EventSkeletonLoading } from "../../components/loaders/SkeletonLoader";
import { CategoryInteface } from "../../types/events";
import { motion } from "framer-motion";

const Events = () => {
  const uniqueId = new Date().getTime().toString(16) + Math.floor(Math.random() * 10).toString(2);
  const [isLoading, setIsLoading] = useState(true);

  const categories: CategoryInteface[] = [
    {
      _id: uniqueId,
      image: "../../assets/event-1.webp",
      name: "sport",
      category: "sport",
    },
    {
      _id: uniqueId,
      image: "../../assets/event-2.webp",
      name: "concert",
      category: "concert",
    },
    {
      _id: uniqueId,
      image: "../../assets/event-3.webp",
      name: "music",
      category: "music",
    },
    {
      _id: uniqueId,
      image: "../../assets/event-4.webp",
      name: "concert",
      category: "concert",
    },
  ];

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      layout
      initial="hidden"
      animate="visible"
      variants={gridVariants}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 gap-5"
    >
      {isLoading ? (
        <EventSkeletonLoading cardsNumber={8} />
      ) : (
        categories.map((c, ind) => <EventCard key={ind} {...c} />)
      )}
    </motion.div>
  );
};

export default Events;
