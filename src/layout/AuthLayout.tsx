import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileImage from '../assets/bg-sidebar-mobile.svg';
import DesktopImage from '../assets/bg-sidebar-desktop.svg';

const AuthLayout = () => {
  return (
    <div className='flex items-stretch flex-col lg:justify-between lg:flex-row flex-shrink-0 overflow-hidden'>
      <motion.nav className='lg:max-w-lg h-72 lg:h-screen relative'>
        <img
          src={MobileImage}
          className='absolute inset-0 object-cover h-full w-full lg:hidden'
          alt='mobile background'
        />

        <div className='relative z-10'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, consequatur
          distinctio! Architecto tempora dignissimos laudantium veniam nostrum mollitia provident.
          Incidunt?
        </div>
        <img
          src={DesktopImage}
          className='absolute inset-0 object-cover !h-full w-full hidden lg:block'
          alt='desktop background'
        />
      </motion.nav>
      <motion.div
        initial={{
          scale: 0.3,
          rotate: 45,
        }}
        animate={{
          scale: 1,
          rotate: 0,
        }}
        className='lg:w-[calc(100%-32rem] flex-1 flex-shrink-0 z-20 px-2 xl:px-0'>
        <Outlet />
      </motion.div>
    </div>
  );
};

export default AuthLayout;
