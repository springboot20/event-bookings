import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";

export const EventSkeletonLoading = ({ cardsNumber }: { cardsNumber: number }) => {
  return Array(cardsNumber)
    .fill(0)
    .map((_, ind) => {
      return (
        <motion.div
          layout
          className="h-[18rem] bg-white overflow-hidden relative rounded-xl border"
          key={ind}
        >
          <motion.header className="h-1/2">
            <Skeleton
              height={"50%"}
              style={{ marginTop: "-10px", position: "absolute" }}
              borderRadius={0}
            />
          </motion.header>
          <motion.div className="relative p-3 flex flex-col gap-1.5">
            <motion.div className="grid grid-cols-2 gap-9">
              <motion.h1>
                <Skeleton className="h-6" containerClassName="flex-1" />
              </motion.h1>
              <motion.h1>
                <Skeleton className="h-6" containerClassName="flex-1" />
              </motion.h1>
            </motion.div>
            <motion.p>
              <Skeleton count={1.5} />
            </motion.p>
            <motion.div className="grid grid-cols-2 gap-4">
              <motion.button>
                <Skeleton className="rounded-3xl px-4 py-2" />
              </motion.button>
              <motion.button>
                <Skeleton className="rounded-3xl px-4 py-2" />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      );
    });
};
