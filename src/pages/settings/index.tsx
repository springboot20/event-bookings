import { AnimatePresence, motion } from 'framer-motion';
import SettingSidebar from '../../components/navigation/SettingSideBar';
import { Outlet } from 'react-router-dom';

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
        type: 'just',
      },
    },
  };

  return (
    <motion.div className='relative flex items-stretch justify-between flex-shrink-0'>
      <AnimatePresence mode='popLayout'>
        <SettingSidebar />
        <motion.div
          variants={settings}
          initial='initial'
          animate='final'
          className=' absolute lg:left-[24rem] lg:w-[calc(100%-24rem] left-0 right-0 px-4 xl:px-0 xl:pl-4'>
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
