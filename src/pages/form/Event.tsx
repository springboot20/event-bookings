import { Field, Form, Formik } from "formik";
import { classNames } from "../../util";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  CameraIcon,
  CurrencyDollarIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

interface InitialValues {
  title: string;
  description: string;
  price: number;
  location: string;
  eventDate: string;
  category: string;
  from: string;
  to: string;
  capacity: number;
  "ticket-type": string;
}

const iniitialValues: InitialValues = {
  capacity: 0,
  category: "",
  location: "",
  eventDate: "",
  from: "",
  to: "",
  description: "",
  price: 20,
  title: "",
  "ticket-type": "",
};

const handleLocationChecker = (
  locationCoords: { lat: number; long: number },
  setLocationCoords: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      long: number;
    }>
  >,
) => {
  // if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((p) => {
    let coords = {
      lat: p.coords.latitude,
      long: p.coords.longitude,
    };

    setLocationCoords({ ...coords });
    console.log(locationCoords);
    console.log(p.timestamp);
  });
  // }
};
const EventForm = () => {
  const navigate = useNavigate();
  const [locationCoords, setLocationCoords] = useState({
    lat: 0,
    long: 0,
  });

  async function onSubmit(values: InitialValues) {}

  return (
    <div className="max-w-xl mx-auto">
      <header className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/events")}
          className="group flex py-3 gap-2 items-center text-indigo-500 text-sm sm:text-base font-semibold rounded-md transition focus:outline-none focus:ring-"
        >
          <ArrowLeftIcon className="h-5" />
          Events
        </button>
        <h2 className="text-indigo-500 font-semibold text-base sm:text-lg capitalize">
          create event
        </h2>
      </header>

      <Formik initialValues={iniitialValues} onSubmit={onSubmit}>
        {({ errors, touched, dirty, resetForm }) => (
          <Form className="mt-4 w-full bg-white rounded-lg p-6 max-w-xl border">
            <fieldset className="mt-2">
              <label
                htmlFor="title"
                className="capitalize text-sm font-semibold text-gray-700 sm:text-base"
              >
                event title<span className="text-red-600 text-base font-bold">*</span>
              </label>

              <div className="mt-2 relative">
                <Field
                  name="title"
                  placeholder="Event title.."
                  className={classNames(
                    "block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none",
                    errors.title && touched.title ? "ring-red-600" : "focus:ring-indigo-600",
                  )}
                />
              </div>
            </fieldset>

            <fieldset className="mt-2">
              <label
                htmlFor="event-date"
                className="capitalize text-sm font-semibold text-gray-700 sm:text-base"
              >
                event date<span className="text-red-600 text-base font-bold">*</span>
              </label>

              <div className="mt-2 relative">
                <Field
                  name="eventDate"
                  type="date"
                  placeholder="Event Date.."
                  className={classNames(
                    "block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none",
                    errors.eventDate && touched.eventDate
                      ? "ring-red-600"
                      : "focus:ring-indigo-600",
                  )}
                />
              </div>
            </fieldset>

            <fieldset className="mt-2">
              <label
                htmlFor="event-time"
                className="capitalize text-sm font-semibold text-gray-700 sm:text-base"
              >
                event Time<span className="text-red-600 text-base font-bold">*</span>
              </label>

              <div className="mt-2 relative grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  name="from"
                  type="time"
                  className={classNames(
                    "block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none",
                    errors.from && touched.from ? "ring-red-600" : "focus:ring-indigo-600",
                  )}
                />

                <Field
                  name="to"
                  type="time"
                  className={classNames(
                    "block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none",
                    errors.to && touched.to ? "ring-red-600" : "focus:ring-indigo-600",
                  )}
                />
              </div>
            </fieldset>

            <fieldset className="mt-2">
              <label
                htmlFor="event-time"
                className="capitalize text-sm font-semibold text-gray-700 sm:text-base"
              >
                Category<span className="text-red-600 text-base font-bold">*</span>
              </label>
              <div className="relative mt-2">
                <Field
                  as="select"
                  name="category"
                  id="category"
                  className={classNames(
                    "border-0 rounded-md w-full bg-white text-gray-700 first:text-gray-400  py-3 pl-3 pr-8 leading-tight focus:outline-none ring-1 ring-inset focus:ring-2 focus:ring-inset ring-gray-300  focus:ring-indigo-600",
                    errors.category && touched.category ? "ring-red-600" : "focus:ring-indigo-600",
                  )}
                >
                  <option value="">select a category</option>
                </Field>
              </div>
            </fieldset>

            <fieldset className="mt-2">
              <label
                htmlFor="location"
                className="capitalize text-sm font-semibold text-gray-700 sm:text-base"
              >
                location<span className="text-red-600 text-base font-bold">*</span>
              </label>

              <div className="mt-2 relative flex items-center w-full">
                <Field
                  name="location"
                  type="location"
                  placeholder="Enter location"
                  className={classNames(
                    "block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none",
                    errors.location && touched.location ? "ring-red-600" : "focus:ring-indigo-600",
                  )}
                />
                <button
                  type="button"
                  onClick={() => handleLocationChecker(locationCoords, setLocationCoords)}
                  className="flex items-center justify-center"
                >
                  <svg
                    width="34"
                    height="32"
                    viewBox="0 0 34 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.26514 13.1169C8.26514 17.4958 13.944 27.0327 16.9415 27.0327C19.939 27.0327 25.6179 17.4958 25.6179 13.1169C25.6179 8.58886 21.739 4.90894 16.9415 4.90894C12.1441 4.90894 8.26514 8.58886 8.26514 13.1169ZM20.6044 20.5776C19.0827 23.1332 17.3744 25.0215 16.9415 25.0215C16.5086 25.0215 14.8004 23.1332 13.2786 20.5776C11.5877 17.738 10.4342 14.7634 10.4342 13.1169C10.4342 9.68948 13.3533 6.92019 16.9415 6.92019C20.5298 6.92019 23.4488 9.68948 23.4488 13.1169C23.4488 14.7634 22.2953 17.738 20.6044 20.5776ZM16.9415 16.9765C14.5456 16.9765 12.6033 15.1755 12.6033 12.954C12.6033 10.7324 14.5456 8.93144 16.9415 8.93144C19.3374 8.93144 21.2797 10.7324 21.2797 12.954C21.2797 15.1755 19.3374 16.9765 16.9415 16.9765ZM19.1106 12.954C19.1106 14.0647 18.1395 14.9652 16.9415 14.9652C15.7436 14.9652 14.7724 14.0647 14.7724 12.954C14.7724 11.8432 15.7436 10.9427 16.9415 10.9427C18.1395 10.9427 19.1106 11.8432 19.1106 12.954Z"
                      fill="black"
                    />
                    <mask
                      id="mask0_240_10521"
                      maskUnits="userSpaceOnUse"
                      x="8"
                      y="4"
                      width="18"
                      height="24"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.26514 13.1169C8.26514 17.4958 13.944 27.0327 16.9415 27.0327C19.939 27.0327 25.6179 17.4958 25.6179 13.1169C25.6179 8.58886 21.739 4.90894 16.9415 4.90894C12.1441 4.90894 8.26514 8.58886 8.26514 13.1169ZM20.6044 20.5776C19.0827 23.1332 17.3744 25.0215 16.9415 25.0215C16.5086 25.0215 14.8004 23.1332 13.2786 20.5776C11.5877 17.738 10.4342 14.7634 10.4342 13.1169C10.4342 9.68948 13.3533 6.92019 16.9415 6.92019C20.5298 6.92019 23.4488 9.68948 23.4488 13.1169C23.4488 14.7634 22.2953 17.738 20.6044 20.5776ZM16.9415 16.9765C14.5456 16.9765 12.6033 15.1755 12.6033 12.954C12.6033 10.7324 14.5456 8.93144 16.9415 8.93144C19.3374 8.93144 21.2797 10.7324 21.2797 12.954C21.2797 15.1755 19.3374 16.9765 16.9415 16.9765ZM19.1106 12.954C19.1106 14.0647 18.1395 14.9652 16.9415 14.9652C15.7436 14.9652 14.7724 14.0647 14.7724 12.954C14.7724 11.8432 15.7436 10.9427 16.9415 10.9427C18.1395 10.9427 19.1106 11.8432 19.1106 12.954Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_240_10521)">
                      <rect
                        x="0.67334"
                        y="0.886414"
                        width="32.5364"
                        height="30.1688"
                        fill="#0880AE"
                      />
                    </g>
                  </svg>
                </button>
              </div>
            </fieldset>

            <fieldset className="mt-2">
              <label
                htmlFor="description"
                className="capitalize text-sm font-semibold text-gray-700 sm:text-base"
              >
                event description<span className="text-red-600 text-base font-bold">*</span>
              </label>

              <div className="mt-2 relative">
                <Field
                  name="description"
                  as="textarea"
                  placeholder="Enter event description.."
                  className={classNames(
                    "block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none",
                    errors.description && touched.description
                      ? "ring-red-600"
                      : "focus:ring-indigo-600",
                  )}
                />
              </div>
            </fieldset>

            <fieldset className="mt-2">
              <label
                htmlFor="price"
                className="capitalize text-sm font-semibold text-gray-700 sm:text-base"
              >
                ticket price<span className="text-red-600 text-base font-bold">*</span>
              </label>
              <div
                className={classNames(
                  errors.price && touched.price ? "ring-red-600" : "focus:ring-indigo-600",
                  "flex items-stretch border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-indigo-600F focus-within:border-transparent h-12",
                )}
              >
                <span className="relative flex items-center justify-center self-center w-12 border-r h-full bg-gray-100">
                  <CurrencyDollarIcon className="text-gray-700 h-7" />
                </span>
                <Field
                  name="price"
                  type="number"
                  placeholder="Enter event description.."
                  className={classNames(
                    "block w-full h-full px-4 flex-1 py-3 border-none focus:outline-none focus:ring-0 placeholder:text-gray-400 text-gray-700",
                  )}
                />
              </div>
            </fieldset>

            <fieldset className="mt-2 relative">
              <label
                htmlFor="uploads"
                className="capitalize text-sm font-semibold text-gray-700 sm:text-base"
              >
                upload media
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="flex items-center justify-center bg-white border h-20 rounded-xl">
                  <input type="file" hidden id="image-upload" />
                  <label
                    htmlFor="image-upload"
                    className="text-sm flex items-center flex-col font-semibold text-indigo-500 capitalize cursor-pointer"
                  >
                    <span>
                      <CameraIcon className="text-indigo-500 h-7" />
                    </span>
                    photo
                  </label>
                </div>

                <div className="flex items-center justify-center bg-white border h-20 rounded-xl">
                  <input type="file" hidden id="video-upload" />
                  <label
                    htmlFor="video-upload"
                    className="text-sm flex items-center flex-col font-semibold text-indigo-500 capitalize"
                  >
                    <span>
                      <VideoCameraIcon className="text-indigo-500 h-7" />
                    </span>
                    video
                  </label>
                </div>
              </div>
            </fieldset>

            <div className="flex items-center gap-4 mt-4">
              <button
                type="submit"
                disabled={!dirty}
                className="disabled:ring-gray-200 disabled:pointer-events-none disabled:text-indigo-300 disabled:bg-[#FAFAFA] disabled:ring-1 text-base capitalize font-semibold border-none ring-2 w-full ring-gray-200 rounded-md py-2.5 px-6 text-white bg-indigo-500"
              >
                create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventForm;
