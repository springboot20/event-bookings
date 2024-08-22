import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const AuthLayout = () => {
  return (
    <div className="flex items-stretch flex-col lg:justify-between lg:flex-row flex-shrink-0 overflow-hidden">
      <motion.nav
        className="lg:max-w-lg h-72 lg:h-screen relative bg-auth-nav-bg-sm lg:bg-auth-nav-bg-lg bg-no-repeat bg-cover"
      >
        <motion.div className="p-4 relative">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quibusdam excepturi
          dolore illo earum voluptatum porro totam quod. Doloribus, cupiditate obcaecati praesentium
          corporis sequi esse non ipsa delectus! Suscipit, id.
        </motion.div>
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
        className="lg:w-[calc(100%-32rem] flex-1 flex-shrink-0 p-2 xl:p-0"
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default AuthLayout;
