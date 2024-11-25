import { AnimatePresence, motion } from "framer-motion";
import SettingSidebar from "../../components/navigation/SettingSideBar";

export default function Settings() {
  const settings = {
    initial: {
      x: 200,
      opacity: 0,
    },

    final: {
      x: 0,
      opacity: 1,
      transition: {
        type: "just",
      },
    },
  };

  return (
    <motion.div className="relative flex items-stretch justify-between flex-shrink-0 max-w-7xl mx-auto">
      <AnimatePresence mode="popLayout">
        <motion.div>
          <SettingSidebar />
        </motion.div>
        <motion.div
          variants={settings}
          initial="initial"
          animate="final"
          className="w-full relative bg-red-50 left-0 right-0 lg:left-[24rem] px-4"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, obcaecati iste, dolore,
          eos officia quibusdam sed vitae deleniti soluta ullam iusto cum illum perspiciatis
          repellat repellendus cupiditate. Tenetur, quas dolor.
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
