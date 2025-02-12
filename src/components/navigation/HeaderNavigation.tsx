import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Link, Navigate, NavLink } from "react-router-dom";
import { classNames } from "../../app/util";
import { Fragment } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useLogoutMutation } from "../../features/auth/auth.slice";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import UserAvatar from "../../assets/user-avatar.png";

interface Routes {
  title: string;
  to: string;
  current: boolean;
}

export const HeaderNavigation: React.FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpen }) => {
  const routes: Routes[] = [
    {
      current: true,
      title: "home",
      to: "/",
    },
    {
      current: true,
      title: "events",
      to: "/events",
    },
    {
      current: true,
      title: "bookings",
      to: "/bookings",
    },
  ];

  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);
  const { bookmark } = useAppSelector((state: RootState) => state.bookmark);
  const [logout] = useLogoutMutation();

  return (
    <Disclosure as="nav" className="fixed top-0 left-0 z-20 right-0 bg-white shadow-sm">
      {({ open }) => {
        return (
          <>
            <motion.div className="mx-auto max-w-7xl px-2 md:px-4 xl:px-0">
              <motion.div className="relative flex h-16 items-center justify-between w-full">
                <motion.div className="flex items-center md:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="h-8 w-8" aria-hidden="true" strokeWidth={0.7} />
                    ) : (
                      <Bars3Icon strokeWidth={0.7} className="h-8 w-8" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </motion.div>

                <motion.div className="flex flex-1 items-center justify-center md:justify-start md:flex-grow-0">
                  <motion.div className="flex flex-shrink-0 items-center">
                    <motion.p className="text-xl font-bold sm:text-lg uppercase">
                      <motion.span>book</motion.span>
                      <motion.span className="text-indigo-600">ings</motion.span>
                    </motion.p>
                  </motion.div>
                </motion.div>

                {isAuthenticated && (
                  <motion.div className="hidden md:ml-4 md:flex items-center gap-10">
                    <motion.div className="flex items-center gap-7">
                      {routes.map((item) => (
                        <NavLink
                          key={item.title}
                          to={item.to}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "text-gray-800 after:bg-indigo-600 after:scale-100"
                                : "text-gray-600",
                              "text-base capitalize font-medium relative after:absolute after:scale-0 hover:after:scale-100 after:content-[''] after:w-full after:bg-indigo-400 after:h-[0.2rem] after:-bottom-1 after:transition-all after:left-0 after:right-0"
                            )
                          }
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.title}
                        </NavLink>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    replace={true}
                    className="rounded px-5 hover:bg-indigo-400 transition-colors py-1.5 bg-indigo-500 text-white font-normal text-sm"
                  >
                    Login
                  </Link>
                ) : (
                  <div className="flex items-center gap-3">
                    {user?.role === "USER" && (
                      <button
                        className={classNames(
                          "h-12 w-12 bg-gray-100 flex relative items-center justify-center rounded-full"
                        )}
                        onClick={() => setOpen(true)}
                      >
                        <span className="sr-only">cart button</span>
                        <svg
                          width="20"
                          height="23"
                          viewBox="0 0 20 23"
                          fill="none"
                          className="h-8"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.996 21.3401L18.324 5.41707C18.3069 5.25626 18.231 5.10744 18.1108 4.99925C17.9907 4.89106 17.8347 4.83116 17.673 4.83107H14.53V4.11407C14.5065 3.05553 14.0694 2.04826 13.3125 1.30794C12.5555 0.567616 11.5388 0.153076 10.48 0.153076C9.42118 0.153076 8.40445 0.567616 7.6475 1.30794C6.89054 2.04826 6.45351 3.05553 6.42998 4.11407V4.83107H3.28498C3.12328 4.83116 2.96731 4.89106 2.84713 4.99925C2.72694 5.10744 2.65102 5.25626 2.63398 5.41707L0.958984 21.3401C0.949436 21.4315 0.959257 21.524 0.987807 21.6114C1.01636 21.6988 1.063 21.7793 1.12469 21.8475C1.18638 21.9157 1.26175 21.9701 1.34588 22.0073C1.43001 22.0444 1.52102 22.0634 1.61298 22.0631H19.345C19.4367 22.063 19.5274 22.0437 19.6111 22.0063C19.6949 21.969 19.7699 21.9145 19.8313 21.8464C19.8926 21.7782 19.939 21.6979 19.9674 21.6107C19.9958 21.5235 20.0055 21.4313 19.996 21.3401ZM7.73798 4.11407C7.73798 3.38698 8.02682 2.68967 8.54095 2.17554C9.05508 1.66141 9.75239 1.37257 10.4795 1.37257C11.2066 1.37257 11.9039 1.66141 12.418 2.17554C12.9321 2.68967 13.221 3.38698 13.221 4.11407V4.83107H7.73798V4.11407ZM2.33798 20.7541L3.87498 6.14007H6.42798V7.58307C6.42798 7.75679 6.49699 7.92339 6.61983 8.04623C6.74267 8.16906 6.90927 8.23807 7.08298 8.23807C7.2567 8.23807 7.4233 8.16906 7.54614 8.04623C7.66898 7.92339 7.73798 7.75679 7.73798 7.58307V6.14007H13.221V7.58307C13.221 7.75679 13.29 7.92339 13.4128 8.04623C13.5357 8.16906 13.7023 8.23807 13.876 8.23807C14.0497 8.23807 14.2163 8.16906 14.3391 8.04623C14.462 7.92339 14.531 7.75679 14.531 7.58307V6.14007H17.084L18.619 20.7541H2.33798Z"
                            fill="#222222"
                          />
                        </svg>
                        <span className="absolute text-sm top-1 -right-2 text-white bg-gray-600 h-5 w-5 flex items-center justify-center rounded-full">
                          {bookmark?.bookmarkItems?.length ?? 0}
                        </span>
                      </button>
                    )}
                    <Menu as="div" className="relative">
                      <motion.div>
                        <MenuButton className="flex dark:text-white text-gray-900">
                          <span className="sr-only">Open auth menu</span>
                          {!user?.avatar?.url ? (
                            <span className="size-10 rounded-full block bg-red-300 border border-white">
                              <img
                                src={UserAvatar}
                                className="h-full w-full object-cover object-center"
                                alt={user?.username}
                              />
                            </span>
                          ) : (
                            <span className="size-10 rounded-full overflow-hidden">
                              <img
                                src={user?.avatar?.url}
                                alt={`${user?.username} avatar`}
                                className="h-full w-full object-cover object-center"
                              />
                            </span>
                          )}
                        </MenuButton>
                      </motion.div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute right-0 z-10 mt-5 py-0.5 border border-gray-400 w-40 origin-top-right rounded-md bg-white focus:outline-none focus:ring-0">
                          <MenuItem>
                            {({ active }) => (
                              <NavLink
                                to="/settings/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "flex items-center gap-2 px-4 py-2 text-sm text-gray-800 font-medium"
                                )}
                              >
                                <motion.span className="flex items-center">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M9.99997 9.07169C8.15903 9.07169 6.66664 7.65997 6.66664 5.91853C6.66664 4.1771 8.15903 2.76538 9.99997 2.76538C11.8409 2.76538 13.3333 4.1771 13.3333 5.91853C13.3333 7.65997 11.8409 9.07169 9.99997 9.07169ZM10 7.81C11.1046 7.81 12 6.96297 12 5.9181C12 4.87324 11.1046 4.02621 10 4.02621C8.89545 4.02621 8.00002 4.87324 8.00002 5.9181C8.00002 6.96297 8.89545 7.81 10 7.81ZM4.65178 16.0087C5.01988 16.0164 5.32495 15.7405 5.33317 15.3923C5.41484 11.9333 6.91842 10.9638 9.99997 10.9638C13.2536 10.9638 14.7449 11.9212 14.6636 15.3641C14.6554 15.7123 14.9471 16.0009 15.3152 16.0087C15.6833 16.0164 15.9884 15.7405 15.9966 15.3923C16.094 11.2677 14.0319 9.70252 9.99997 9.70252C6.14913 9.70252 4.09718 11.2556 4.00017 15.3641C3.99195 15.7123 4.28369 16.0009 4.65178 16.0087Z"
                                      fill="black"
                                    />
                                    <mask
                                      id="mask0_329_12026"
                                      maskUnits="userSpaceOnUse"
                                      x="4"
                                      y="2"
                                      width="12"
                                      height="15"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M9.99997 9.07169C8.15903 9.07169 6.66664 7.65997 6.66664 5.91853C6.66664 4.1771 8.15903 2.76538 9.99997 2.76538C11.8409 2.76538 13.3333 4.1771 13.3333 5.91853C13.3333 7.65997 11.8409 9.07169 9.99997 9.07169ZM10 7.81C11.1046 7.81 12 6.96297 12 5.9181C12 4.87324 11.1046 4.02621 10 4.02621C8.89545 4.02621 8.00002 4.87324 8.00002 5.9181C8.00002 6.96297 8.89545 7.81 10 7.81ZM4.65178 16.0087C5.01988 16.0164 5.32495 15.7405 5.33317 15.3923C5.41484 11.9333 6.91842 10.9638 9.99997 10.9638C13.2536 10.9638 14.7449 11.9212 14.6636 15.3641C14.6554 15.7123 14.9471 16.0009 15.3152 16.0087C15.6833 16.0164 15.9884 15.7405 15.9966 15.3923C16.094 11.2677 14.0319 9.70252 9.99997 9.70252C6.14913 9.70252 4.09718 11.2556 4.00017 15.3641C3.99195 15.7123 4.28369 16.0009 4.65178 16.0087Z"
                                        fill="white"
                                      />
                                    </mask>
                                    <g mask="url(#mask0_329_12026)">
                                      <rect
                                        x="0.0561523"
                                        y="0.243164"
                                        width="19.6923"
                                        height="15.7658"
                                        fill="#2C2738"
                                      />
                                    </g>
                                  </svg>
                                </motion.span>
                                <motion.span>Profile</motion.span>
                              </NavLink>
                            )}
                          </MenuItem>

                          <MenuItem>
                            {({ active }) => (
                              <NavLink
                                to="/settings/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "flex items-center gap-2 px-4 py-2 text-sm text-gray-800 font-medium"
                                )}
                              >
                                <motion.svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3.08068 6.65342C2.95174 6.9196 2.83822 7.19324 2.7408 7.47311C2.52691 8.08756 2.78771 8.76665 3.35789 9.07997C3.69208 9.26361 3.90308 9.61278 3.90308 10.0003C3.90308 10.3877 3.69208 10.7369 3.35789 10.9206C2.78771 11.2339 2.52691 11.913 2.7408 12.5274C2.83822 12.8073 2.95174 13.0809 3.08068 13.3471C3.36415 13.9323 4.02834 14.2276 4.6527 14.0462C5.01883 13.9398 5.41487 14.0375 5.68883 14.3114C5.9628 14.5854 6.0605 14.9815 5.9541 15.3476C5.77267 15.9719 6.06803 16.6361 6.65318 16.9196C6.91936 17.0485 7.193 17.1621 7.47287 17.2595C8.08731 17.4734 8.7664 17.2126 9.07973 16.6424C9.26337 16.3082 9.61253 16.0972 10 16.0972C10.3875 16.0972 10.7367 16.3082 10.9203 16.6424C11.2336 17.2126 11.9127 17.4734 12.5272 17.2595C12.807 17.1621 13.0807 17.0485 13.3469 16.9196C13.932 16.6361 14.2274 15.9719 14.0459 15.3476C13.9395 14.9815 14.0372 14.5854 14.3112 14.3114C14.5852 14.0375 14.9812 13.9398 15.3473 14.0462C15.9717 14.2276 16.6359 13.9323 16.9194 13.3471C17.0483 13.0809 17.1618 12.8073 17.2592 12.5274C17.4731 11.913 17.2123 11.2339 16.6421 10.9206C16.308 10.7369 16.097 10.3877 16.097 10.0003C16.097 9.61278 16.308 9.26361 16.6421 9.07997C17.2123 8.76665 17.4731 8.08756 17.2592 7.47311C17.1618 7.19324 17.0483 6.9196 16.9194 6.65342C16.6359 6.06827 15.9717 5.77291 15.3473 5.95435C14.9812 6.06074 14.5852 5.96304 14.3112 5.68908C14.0372 5.41512 13.9395 5.01907 14.0459 4.65295C14.2274 4.02858 13.932 3.36439 13.3469 3.08093C13.0807 2.95198 12.807 2.83846 12.5272 2.74104C11.9127 2.52715 11.2336 2.78795 10.9203 3.35814C10.7367 3.69232 10.3875 3.90333 10 3.90333C9.61253 3.90333 9.26337 3.69232 9.07973 3.35814C8.7664 2.78795 8.08731 2.52715 7.47287 2.74104C7.193 2.83846 6.91936 2.95198 6.65318 3.08093C6.06803 3.36439 5.77267 4.02858 5.9541 4.65295C6.0605 5.01907 5.9628 5.41512 5.68883 5.68908C5.41487 5.96304 5.01883 6.06074 4.6527 5.95435C4.02834 5.77291 3.36415 6.06827 3.08068 6.65342ZM5.23642 10.0003C5.23642 9.10001 4.73696 8.31641 4.00002 7.91145C4.08078 7.67945 4.17461 7.45358 4.28063 7.23471C5.08801 7.46933 5.99514 7.26839 6.63164 6.63189C7.26815 5.99538 7.46909 5.08825 7.23447 4.28088C7.45334 4.17485 7.67921 4.08102 7.9112 4.00026C8.31616 4.7372 9.09976 5.23666 10 5.23666C10.9003 5.23666 11.6839 4.7372 12.0888 4.00026C12.3208 4.08102 12.5467 4.17485 12.7656 4.28088C12.5309 5.08825 12.7319 5.99538 13.3684 6.63189C14.0049 7.26839 14.912 7.46933 15.7194 7.23471C15.8254 7.45358 15.9193 7.67945 16 7.91145C15.2631 8.31641 14.7636 9.10001 14.7636 10.0003C14.7636 10.9005 15.2631 11.6841 16 12.0891C15.9193 12.3211 15.8254 12.5469 15.7194 12.7658C14.912 12.5312 14.0049 12.7321 13.3684 13.3686C12.7319 14.0051 12.5309 14.9123 12.7656 15.7196C12.5467 15.8257 12.3208 15.9195 12.0888 16.0003C11.6839 15.2633 10.9003 14.7639 10 14.7639C9.09976 14.7639 8.31616 15.2633 7.9112 16.0003C7.67921 15.9195 7.45334 15.8257 7.23447 15.7196C7.46909 14.9123 7.26815 14.0051 6.63164 13.3686C5.99514 12.7321 5.08801 12.5312 4.28063 12.7658C4.17461 12.5469 4.08078 12.3211 4.00002 12.0891C4.73696 11.6841 5.23642 10.9005 5.23642 10.0003ZM11.3334 10.0003C11.3334 10.7366 10.7364 11.3336 10 11.3336C9.26364 11.3336 8.66669 10.7366 8.66669 10.0003C8.66669 9.26388 9.26364 8.66693 10 8.66693C10.7364 8.66693 11.3334 9.26388 11.3334 10.0003Z"
                                    fill="black"
                                  />
                                  <mask
                                    id="mask0_329_12039"
                                    maskUnits="userSpaceOnUse"
                                    x="2"
                                    y="2"
                                    width="16"
                                    height="16"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M3.08068 6.65342C2.95174 6.9196 2.83822 7.19324 2.7408 7.47311C2.52691 8.08756 2.78771 8.76665 3.35789 9.07997C3.69208 9.26361 3.90308 9.61278 3.90308 10.0003C3.90308 10.3877 3.69208 10.7369 3.35789 10.9206C2.78771 11.2339 2.52691 11.913 2.7408 12.5274C2.83822 12.8073 2.95174 13.0809 3.08068 13.3471C3.36415 13.9323 4.02834 14.2276 4.6527 14.0462C5.01883 13.9398 5.41487 14.0375 5.68883 14.3114C5.9628 14.5854 6.0605 14.9815 5.9541 15.3476C5.77267 15.9719 6.06803 16.6361 6.65318 16.9196C6.91936 17.0485 7.193 17.1621 7.47287 17.2595C8.08731 17.4734 8.7664 17.2126 9.07973 16.6424C9.26337 16.3082 9.61253 16.0972 10 16.0972C10.3875 16.0972 10.7367 16.3082 10.9203 16.6424C11.2336 17.2126 11.9127 17.4734 12.5272 17.2595C12.807 17.1621 13.0807 17.0485 13.3469 16.9196C13.932 16.6361 14.2274 15.9719 14.0459 15.3476C13.9395 14.9815 14.0372 14.5854 14.3112 14.3114C14.5852 14.0375 14.9812 13.9398 15.3473 14.0462C15.9717 14.2276 16.6359 13.9323 16.9194 13.3471C17.0483 13.0809 17.1618 12.8073 17.2592 12.5274C17.4731 11.913 17.2123 11.2339 16.6421 10.9206C16.308 10.7369 16.097 10.3877 16.097 10.0003C16.097 9.61278 16.308 9.26361 16.6421 9.07997C17.2123 8.76665 17.4731 8.08756 17.2592 7.47311C17.1618 7.19324 17.0483 6.9196 16.9194 6.65342C16.6359 6.06827 15.9717 5.77291 15.3473 5.95435C14.9812 6.06074 14.5852 5.96304 14.3112 5.68908C14.0372 5.41512 13.9395 5.01907 14.0459 4.65295C14.2274 4.02858 13.932 3.36439 13.3469 3.08093C13.0807 2.95198 12.807 2.83846 12.5272 2.74104C11.9127 2.52715 11.2336 2.78795 10.9203 3.35814C10.7367 3.69232 10.3875 3.90333 10 3.90333C9.61253 3.90333 9.26337 3.69232 9.07973 3.35814C8.7664 2.78795 8.08731 2.52715 7.47287 2.74104C7.193 2.83846 6.91936 2.95198 6.65318 3.08093C6.06803 3.36439 5.77267 4.02858 5.9541 4.65295C6.0605 5.01907 5.9628 5.41512 5.68883 5.68908C5.41487 5.96304 5.01883 6.06074 4.6527 5.95435C4.02834 5.77291 3.36415 6.06827 3.08068 6.65342ZM5.23642 10.0003C5.23642 9.10001 4.73696 8.31641 4.00002 7.91145C4.08078 7.67945 4.17461 7.45358 4.28063 7.23471C5.08801 7.46933 5.99514 7.26839 6.63164 6.63189C7.26815 5.99538 7.46909 5.08825 7.23447 4.28088C7.45334 4.17485 7.67921 4.08102 7.9112 4.00026C8.31616 4.7372 9.09976 5.23666 10 5.23666C10.9003 5.23666 11.6839 4.7372 12.0888 4.00026C12.3208 4.08102 12.5467 4.17485 12.7656 4.28088C12.5309 5.08825 12.7319 5.99538 13.3684 6.63189C14.0049 7.26839 14.912 7.46933 15.7194 7.23471C15.8254 7.45358 15.9193 7.67945 16 7.91145C15.2631 8.31641 14.7636 9.10001 14.7636 10.0003C14.7636 10.9005 15.2631 11.6841 16 12.0891C15.9193 12.3211 15.8254 12.5469 15.7194 12.7658C14.912 12.5312 14.0049 12.7321 13.3684 13.3686C12.7319 14.0051 12.5309 14.9123 12.7656 15.7196C12.5467 15.8257 12.3208 15.9195 12.0888 16.0003C11.6839 15.2633 10.9003 14.7639 10 14.7639C9.09976 14.7639 8.31616 15.2633 7.9112 16.0003C7.67921 15.9195 7.45334 15.8257 7.23447 15.7196C7.46909 14.9123 7.26815 14.0051 6.63164 13.3686C5.99514 12.7321 5.08801 12.5312 4.28063 12.7658C4.17461 12.5469 4.08078 12.3211 4.00002 12.0891C4.73696 11.6841 5.23642 10.9005 5.23642 10.0003ZM11.3334 10.0003C11.3334 10.7366 10.7364 11.3336 10 11.3336C9.26364 11.3336 8.66669 10.7366 8.66669 10.0003C8.66669 9.26388 9.26364 8.66693 10 8.66693C10.7364 8.66693 11.3334 9.26388 11.3334 10.0003Z"
                                      fill="white"
                                    />
                                  </mask>
                                  <g mask="url(#mask0_329_12039)">
                                    <rect width="20" height="20" fill="#2C2738" />
                                  </g>
                                </motion.svg>

                                <motion.span>Settings</motion.span>
                              </NavLink>
                            )}
                          </MenuItem>

                          <MenuItem>
                            {({ active }) => (
                              <NavLink
                                to="/login"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "flex items-center gap-2 px-4 py-2 text-sm text-gray-800 font-medium"
                                )}
                              >
                                <motion.svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.6615 3.50893L15.3282 6.17559C16.2239 6.68745 16.2239 7.97905 15.3282 8.49091L15.0208 8.66658L15.3282 8.84226C16.2239 9.35412 16.2239 10.6457 15.3282 11.1576L15.0208 11.3333L15.3282 11.5089C16.2239 12.0208 16.2239 13.3124 15.3282 13.8242L10.6615 16.4909C10.2516 16.7251 9.74839 16.7251 9.33848 16.4909L4.67181 13.8242C3.77606 13.3124 3.77606 12.0208 4.67181 11.5089L4.97925 11.3333L4.67181 11.1576C3.77606 10.6457 3.77606 9.35412 4.67181 8.84226L4.97925 8.66658L4.67181 8.49091C3.77606 7.97905 3.77606 6.68745 4.67181 6.17559L9.33848 3.50893C9.74839 3.27469 10.2516 3.27469 10.6615 3.50893ZM10.6615 11.1576L13.677 9.43442L14.6667 9.99992L10 12.6666L5.33333 9.99992L6.32296 9.43442L9.33848 11.1576C9.74839 11.3918 10.2516 11.3918 10.6615 11.1576ZM13.677 12.1011L10.6615 13.8242C10.2516 14.0585 9.74839 14.0585 9.33848 13.8242L6.32296 12.1011L5.33333 12.6666L10 15.3333L14.6667 12.6666L13.677 12.1011ZM5.33333 7.33325L10 4.66658L14.6667 7.33325L10 9.99992L5.33333 7.33325Z"
                                    fill="black"
                                  />
                                  <mask
                                    id="mask0_329_12041"
                                    maskUnits="userSpaceOnUse"
                                    x="4"
                                    y="3"
                                    width="12"
                                    height="14"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M10.6615 3.50893L15.3282 6.17559C16.2239 6.68745 16.2239 7.97905 15.3282 8.49091L15.0208 8.66658L15.3282 8.84226C16.2239 9.35412 16.2239 10.6457 15.3282 11.1576L15.0208 11.3333L15.3282 11.5089C16.2239 12.0208 16.2239 13.3124 15.3282 13.8242L10.6615 16.4909C10.2516 16.7251 9.74839 16.7251 9.33848 16.4909L4.67181 13.8242C3.77606 13.3124 3.77606 12.0208 4.67181 11.5089L4.97925 11.3333L4.67181 11.1576C3.77606 10.6457 3.77606 9.35412 4.67181 8.84226L4.97925 8.66658L4.67181 8.49091C3.77606 7.97905 3.77606 6.68745 4.67181 6.17559L9.33848 3.50893C9.74839 3.27469 10.2516 3.27469 10.6615 3.50893ZM10.6615 11.1576L13.677 9.43442L14.6667 9.99992L10 12.6666L5.33333 9.99992L6.32296 9.43442L9.33848 11.1576C9.74839 11.3918 10.2516 11.3918 10.6615 11.1576ZM13.677 12.1011L10.6615 13.8242C10.2516 14.0585 9.74839 14.0585 9.33848 13.8242L6.32296 12.1011L5.33333 12.6666L10 15.3333L14.6667 12.6666L13.677 12.1011ZM5.33333 7.33325L10 4.66658L14.6667 7.33325L10 9.99992L5.33333 7.33325Z"
                                      fill="white"
                                    />
                                  </mask>
                                  <g mask="url(#mask0_329_12041)">
                                    <rect width="20" height="20" fill="#2C2738" />
                                  </g>
                                </motion.svg>

                                <motion.span>Help</motion.span>
                              </NavLink>
                            )}
                          </MenuItem>

                          <MenuItem>
                            {({ active }) => (
                              <button
                                type="button"
                                onClick={async () => {
                                  await logout()
                                    .unwrap()
                                    .then(() => {
                                      return <Navigate to="/logout" replace />;
                                    })
                                    .catch((error: any) => {
                                      throw error;
                                    });
                                }}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-800 font-semibold"
                                )}
                              >
                                <motion.svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.0002 3.33325C9.63198 3.33325 9.33351 3.63173 9.33351 3.99992V8.66658C9.33351 9.03477 9.63198 9.33325 10.0002 9.33325C10.3684 9.33325 10.6668 9.03477 10.6668 8.66658V3.99992C10.6668 3.63173 10.3684 3.33325 10.0002 3.33325ZM7.75481 5.15601C7.57736 4.83362 7.17313 4.71436 6.85193 4.88963C6.30381 5.18873 5.79855 5.56625 5.3492 6.0156C2.7632 8.6016 2.77739 12.8085 5.38089 15.412C7.98438 18.0155 12.1913 18.0297 14.7773 15.4437C17.3633 12.8577 17.3491 8.65079 14.7456 6.0473C14.3186 5.62027 13.8421 5.25686 13.3271 4.96269C13.0076 4.78016 12.6023 4.89024 12.4219 5.20858C12.2415 5.52691 12.3543 5.93294 12.6739 6.11548C13.0855 6.35062 13.4667 6.64134 13.8091 6.98377C15.8919 9.06656 15.9033 12.4321 13.8345 14.5009C11.7657 16.5697 8.40015 16.5583 6.31736 14.4755C4.23456 12.3927 4.22321 9.02721 6.292 6.95841C6.65231 6.5981 7.05643 6.29616 7.49451 6.0571C7.81571 5.88183 7.93225 5.4784 7.75481 5.15601Z"
                                    fill="black"
                                  />
                                  <mask
                                    id="mask0_329_12040"
                                    maskUnits="userSpaceOnUse"
                                    x="3"
                                    y="3"
                                    width="14"
                                    height="15"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M10.0002 3.33325C9.63198 3.33325 9.33351 3.63173 9.33351 3.99992V8.66658C9.33351 9.03477 9.63198 9.33325 10.0002 9.33325C10.3684 9.33325 10.6668 9.03477 10.6668 8.66658V3.99992C10.6668 3.63173 10.3684 3.33325 10.0002 3.33325ZM7.75481 5.15601C7.57736 4.83362 7.17313 4.71436 6.85193 4.88963C6.30381 5.18873 5.79855 5.56625 5.3492 6.0156C2.7632 8.6016 2.77739 12.8085 5.38089 15.412C7.98438 18.0155 12.1913 18.0297 14.7773 15.4437C17.3633 12.8577 17.3491 8.65079 14.7456 6.0473C14.3186 5.62027 13.8421 5.25686 13.3271 4.96269C13.0076 4.78016 12.6023 4.89024 12.4219 5.20858C12.2415 5.52691 12.3543 5.93294 12.6739 6.11548C13.0855 6.35062 13.4667 6.64134 13.8091 6.98377C15.8919 9.06656 15.9033 12.4321 13.8345 14.5009C11.7657 16.5697 8.40015 16.5583 6.31736 14.4755C4.23456 12.3927 4.22321 9.02721 6.292 6.95841C6.65231 6.5981 7.05643 6.29616 7.49451 6.0571C7.81571 5.88183 7.93225 5.4784 7.75481 5.15601Z"
                                      fill="white"
                                    />
                                  </mask>
                                  <g mask="url(#mask0_329_12040)">
                                    <rect width="20" height="20" fill="#2C2738" />
                                  </g>
                                </motion.svg>

                                <motion.span>Log Out</motion.span>
                              </button>
                            )}
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </motion.div>
            </motion.div>

            <DisclosurePanel className="md:hidden">
              <motion.div className="space-y-3 px-2 pb-3 pt-2">
                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    replace={true}
                    className="rounded px-5 hover:bg-indigo-400 transition-colors py-1.5 bg-indigo-500 text-white font-normal text-sm"
                  >
                    Login
                  </Link>
                ) : (
                  routes.map((item) => (
                    <NavLink
                      key={item.title}
                      to={item.to}
                      className={({ isActive }) =>
                        classNames(
                          isActive ? "bg-gray-100 text-gray-800" : "bg-transparent text-gray-600",
                          "block capitalize hover:bg-gray-100 transition-colors py-2 px-3 rounded-md"
                        )
                      }
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.title}
                    </NavLink>
                  ))
                )}
              </motion.div>
            </DisclosurePanel>
          </>
        );
      }}
    </Disclosure>
  );
};
