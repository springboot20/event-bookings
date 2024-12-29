import React, { useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CameraIcon,
  CurrencyDollarIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

import { classNames } from '../../../util';
import { useUpdateEventMutation, useGetEventByIdQuery } from '../../../features/event/event.slice';
import { useGetAllCategoriesQuery } from '../../../features/category/category.slice';
import { CategoryInterface, EventInterface } from '../../../types/events';

type ImageType = {
  url: string;
  public_id: string;
};

interface InitialValues {
  title: string;
  description: string;
  price: number;
  location: string;
  eventDate: string;
  category: string;
  image: File | ImageType | null;
  from: string;
  to: string;
  capacity: number;
  featured: boolean;
  'ticket-type': string;
}

const handleLocationChecker = (
  locationCoords: { lat: number; long: number },
  setLocationCoords: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      long: number;
    }>
  >
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((p) => {
      const coords = {
        lat: p.coords.latitude,
        long: p.coords.longitude,
      };

      setLocationCoords({ ...coords });
      console.log(locationCoords);
      console.log(p.timestamp);
    });
  }
};

const EditEvent = () => {
  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const { data } = useGetAllCategoriesQuery();
  const { eventId } = useParams();
  const { data: eventData, isLoading: eventLoading } = useGetEventByIdQuery(eventId!);
  const navigate = useNavigate();
  const [locationCoords, setLocationCoords] = useState({
    lat: 0,
    long: 0,
  });

  const categories = data?.data?.categories as CategoryInterface[];
  const event: EventInterface = typeof eventData?.data === 'object' && eventData?.data;

  const event_date = new Date(event?.eventDate);
  const concatenatedDate = `${event_date.getFullYear()}-${event_date.getMonth()}-${(
    event_date.getDate() % 100
  )
    .toString()
    .padStart(2, '0')}`;

  const from_time = new Date(event?.time?.from);
  const concatenatedFromTime = `${from_time.getHours()}:${from_time.getMinutes()}`;

  const to_time = new Date(event?.time?.to);
  const concatenatedToTime = `${to_time.getHours()}:${to_time.getMinutes()}`;

  const initialValues: InitialValues = {
    capacity: event?.capacity ?? 0,
    category: event?.category?.name ?? '',
    location: event?.location ?? '',
    eventDate: (event?.eventDate && concatenatedDate) ?? '',
    from: (event?.time && concatenatedFromTime) ?? '',
    to: (event?.time && concatenatedToTime) ?? '',
    description: event?.description ?? '',
    price: event?.price ?? 20,
    title: event?.title ?? '',
    image: event?.image ?? null,
    featured: false,
    'ticket-type': '',
  };

  console.log(initialValues);

  async function onSubmit(values: InitialValues, { resetForm }: FormikHelpers<InitialValues>) {
    await updateEvent({ _id: eventId, ...values })
      .unwrap()
      .then((response) => {
        console.log(response);
        toast.success(response?.message);
        setTimeout(() => navigate('/events'), 1200);
        resetForm();
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error?.message || error?.data?.message);
      });
  }

  return (
    <div className='max-w-xl mx-auto'>
      <header className='flex items-center justify-between'>
        <button
          type='button'
          onClick={() => navigate('/events')}
          className='group flex py-3 gap-2 items-center text-indigo-500 text-sm sm:text-base font-semibold rounded-md transition focus:outline-none focus:ring-'>
          <ArrowLeftIcon className='h-5' />
          Events
        </button>
        <h2 className='text-indigo-500 font-semibold text-base sm:text-lg capitalize'>
          edit event
        </h2>
      </header>

      {eventLoading ? (
        <div className='flex items-center justify-center space-x-3 h-[calc(100vh-5rem)]'>
          <div aria-label='Loading...' role='status'>
            <svg className='h-7 w-7 animate-spin' viewBox='3 3 18 18'>
              <path
                className='fill-white'
                d='M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z'></path>
              <path
                className='fill-[#4632A8]'
                d='M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z'></path>
            </svg>
          </div>
          <span className='text-sm font-medium text-gray-500'>loading event form</span>
        </div>
      ) : (
        <Formik initialValues={event && initialValues} onSubmit={onSubmit}>
          {({ errors, touched, values, setFieldValue }) => (
            <Form className='mt-4 w-full bg-white rounded-lg p-6 max-w-xl border'>
              <fieldset className='mt-2'>
                <label htmlFor='title' className='capitalize text-sm font-medium text-gray-600'>
                  event title<span className='text-red-600 text-base font-medium'>*</span>
                </label>

                <div className='mt-2 relative'>
                  <Field
                    name='title'
                    placeholder='Event title..'
                    className={classNames(
                      'block w-full px-3 rounded border-0 py-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none',
                      errors.title && touched.title ? 'ring-red-600' : 'focus:ring-indigo-600'
                    )}
                  />
                </div>
              </fieldset>

              <fieldset className='mt-2'>
                <label
                  htmlFor='event-date'
                  className='capitalize text-sm font-medium text-gray-600'>
                  event date<span className='text-red-600 text-base font-medium'>*</span>
                </label>

                <div className='mt-2 relative'>
                  <Field
                    name='eventDate'
                    type='date'
                    placeholder='Event Date..'
                    className={classNames(
                      'block w-full px-3 rounded border-0 py-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none',
                      errors.eventDate && touched.eventDate
                        ? 'ring-red-600'
                        : 'focus:ring-indigo-600'
                    )}
                  />
                </div>
              </fieldset>

              <fieldset className='mt-2'>
                <label
                  htmlFor='event-time'
                  className='capitalize text-sm font-medium text-gray-600'>
                  event Time<span className='text-red-600 text-base font-medium'>*</span>
                </label>

                <div className='mt-2 relative grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <Field
                    name='from'
                    type='time'
                    className={classNames(
                      'block w-full px-3 rounded border-0 py-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none',
                      errors.from && touched.from ? 'ring-red-600' : 'focus:ring-indigo-600'
                    )}
                  />

                  <Field
                    name='to'
                    type='time'
                    className={classNames(
                      'block w-full px-3 rounded border-0 py-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none',
                      errors.to && touched.to ? 'ring-red-600' : 'focus:ring-indigo-600'
                    )}
                  />
                </div>
              </fieldset>

              <div className='flex items-center gap-2'>
                <fieldset className='mt-2 flex-1'>
                  <label
                    htmlFor='event-time'
                    className='capitalize text-sm font-medium text-gray-600'>
                    Category<span className='text-red-600 text-base font-medium'>*</span>
                  </label>
                  <div className='relative mt-2'>
                    <Field
                      as='select'
                      name='category'
                      id='category'
                      value={values.category}
                      onChange={(e: any) => {
                        const selectedCategory = categories?.find((c) => c.name === e.target.value);

                        setFieldValue('category', selectedCategory?.name);
                      }}
                      className={classNames(
                        'border-0 rounded-md w-full bg-white text-gray-800 first:text-gray-600 py-3 pl-3 pr-8 leading-tight focus:outline-none ring-1 ring-inset focus:ring-2 focus:ring-inset ring-gray-300  focus:ring-indigo-600',
                        errors.category && touched.category
                          ? 'ring-red-600'
                          : 'focus:ring-indigo-600'
                      )}>
                      <option>select a category</option>
                      {(categories ?? [])?.map((c) => (
                        <option key={c._id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                </fieldset>
                <fieldset className='flex items-start flex-col gap-2 mt-2'>
                  <label
                    htmlFor='featured'
                    className='capitalize text-sm font-medium text-gray-600'>
                    featured
                  </label>
                  <Field
                    name='featured'
                    type='checkbox'
                    className={classNames(
                      'h-7 w-7 border focus:outline-none focus:ring-0 rounded placeholder:text-gray-400'
                    )}
                  />
                </fieldset>
              </div>

              <fieldset className='mt-2'>
                <label htmlFor='location' className='capitalize text-sm font-medium text-gray-600'>
                  location<span className='text-red-600 text-base font-medium'>*</span>
                </label>

                <div className='mt-2 relative flex items-center w-full'>
                  <Field
                    name='location'
                    type='location'
                    placeholder='Enter location'
                    className={classNames(
                      'block w-full px-3 rounded border-0 py-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none',
                      errors.location && touched.location ? 'ring-red-600' : 'focus:ring-indigo-600'
                    )}
                  />
                  <button
                    type='button'
                    onClick={() => handleLocationChecker(locationCoords, setLocationCoords)}
                    className='flex items-center justify-center'>
                    <svg
                      width='34'
                      height='32'
                      viewBox='0 0 34 32'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M8.26514 13.1169C8.26514 17.4958 13.944 27.0327 16.9415 27.0327C19.939 27.0327 25.6179 17.4958 25.6179 13.1169C25.6179 8.58886 21.739 4.90894 16.9415 4.90894C12.1441 4.90894 8.26514 8.58886 8.26514 13.1169ZM20.6044 20.5776C19.0827 23.1332 17.3744 25.0215 16.9415 25.0215C16.5086 25.0215 14.8004 23.1332 13.2786 20.5776C11.5877 17.738 10.4342 14.7634 10.4342 13.1169C10.4342 9.68948 13.3533 6.92019 16.9415 6.92019C20.5298 6.92019 23.4488 9.68948 23.4488 13.1169C23.4488 14.7634 22.2953 17.738 20.6044 20.5776ZM16.9415 16.9765C14.5456 16.9765 12.6033 15.1755 12.6033 12.954C12.6033 10.7324 14.5456 8.93144 16.9415 8.93144C19.3374 8.93144 21.2797 10.7324 21.2797 12.954C21.2797 15.1755 19.3374 16.9765 16.9415 16.9765ZM19.1106 12.954C19.1106 14.0647 18.1395 14.9652 16.9415 14.9652C15.7436 14.9652 14.7724 14.0647 14.7724 12.954C14.7724 11.8432 15.7436 10.9427 16.9415 10.9427C18.1395 10.9427 19.1106 11.8432 19.1106 12.954Z'
                        fill='black'
                      />
                      <mask
                        id='mask0_240_10521'
                        maskUnits='userSpaceOnUse'
                        x='8'
                        y='4'
                        width='18'
                        height='24'>
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M8.26514 13.1169C8.26514 17.4958 13.944 27.0327 16.9415 27.0327C19.939 27.0327 25.6179 17.4958 25.6179 13.1169C25.6179 8.58886 21.739 4.90894 16.9415 4.90894C12.1441 4.90894 8.26514 8.58886 8.26514 13.1169ZM20.6044 20.5776C19.0827 23.1332 17.3744 25.0215 16.9415 25.0215C16.5086 25.0215 14.8004 23.1332 13.2786 20.5776C11.5877 17.738 10.4342 14.7634 10.4342 13.1169C10.4342 9.68948 13.3533 6.92019 16.9415 6.92019C20.5298 6.92019 23.4488 9.68948 23.4488 13.1169C23.4488 14.7634 22.2953 17.738 20.6044 20.5776ZM16.9415 16.9765C14.5456 16.9765 12.6033 15.1755 12.6033 12.954C12.6033 10.7324 14.5456 8.93144 16.9415 8.93144C19.3374 8.93144 21.2797 10.7324 21.2797 12.954C21.2797 15.1755 19.3374 16.9765 16.9415 16.9765ZM19.1106 12.954C19.1106 14.0647 18.1395 14.9652 16.9415 14.9652C15.7436 14.9652 14.7724 14.0647 14.7724 12.954C14.7724 11.8432 15.7436 10.9427 16.9415 10.9427C18.1395 10.9427 19.1106 11.8432 19.1106 12.954Z'
                          fill='white'
                        />
                      </mask>
                      <g mask='url(#mask0_240_10521)'>
                        <rect
                          x='0.67334'
                          y='0.886414'
                          width='32.5364'
                          height='30.1688'
                          fill='#6366f1'
                        />
                      </g>
                    </svg>
                  </button>
                </div>
              </fieldset>

              <fieldset className='mt-2'>
                <label
                  htmlFor='description'
                  className='capitalize text-sm font-medium text-gray-600'>
                  event description<span className='text-red-600 text-base font-medium'>*</span>
                </label>

                <div className='mt-2 relative'>
                  <Field
                    name='description'
                    as='textarea'
                    rows={3}
                    placeholder='Enter event description..'
                    className={classNames(
                      'block w-full px-3 rounded border-0 py-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none',
                      errors.description && touched.description
                        ? 'ring-red-600'
                        : 'focus:ring-indigo-600'
                    )}
                  />
                </div>
              </fieldset>

              <fieldset className='mt-2'>
                <label htmlFor='price' className='capitalize text-sm font-medium text-gray-600'>
                  ticket price<span className='text-red-600 text-base font-medium'>*</span>
                </label>
                <div
                  className={classNames(
                    errors.price && touched.price ? 'ring-red-600' : 'focus:ring-indigo-600',
                    'flex items-stretch border rounded-md overflow-hidden focus-within:ring-2 mt-2 focus-within:ring-indigo-600 focus-within:border-transparent h-12'
                  )}>
                  <span className='relative flex items-center justify-center self-center w-12 border-r h-full bg-gray-100'>
                    <CurrencyDollarIcon className='text-gray-700 h-7' />
                  </span>
                  <Field
                    name='price'
                    type='number'
                    placeholder='Enter event description..'
                    className={classNames(
                      'block w-full h-full px-4 flex-1 py-3 border-none focus:outline-none focus:ring-0 placeholder:text-gray-400 text-gray-700'
                    )}
                  />
                </div>
              </fieldset>

              <fieldset className='mt-2'>
                <label htmlFor='capacity' className='capitalize text-sm font-medium text-gray-600'>
                  event capacity<span className='text-red-600 text-base font-medium'>*</span>
                </label>
                <Field
                  name='capacity'
                  type='number'
                  placeholder='Enter event capacity..'
                  className={classNames(
                    'block w-full px-3 rounded border-0 py-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none'
                  )}
                />
              </fieldset>

              <fieldset className='mt-2 relative'>
                <label htmlFor='uploads' className='capitalize text-sm font-medium text-gray-600'>
                  upload media
                </label>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2'>
                  <div className='flex items-center justify-center bg-white border h-20 rounded-md'>
                    <input
                      type='file'
                      hidden
                      id='image-upload'
                      accept='image/*'
                      onChange={(e) => {
                        const files = e?.currentTarget?.files;

                        if (files && files.length > 0) {
                          setFieldValue('image', files[0]);
                        }
                      }}
                    />
                    <label
                      htmlFor='image-upload'
                      className='text-sm flex items-center flex-col font-semibold text-indigo-500 capitalize cursor-pointer'>
                      <span>
                        <CameraIcon className='text-indigo-500 h-7' />
                      </span>
                      photo
                    </label>
                  </div>

                  <div className='flex items-center justify-center bg-white border h-20 rounded-md'>
                    <input type='file' hidden id='video-upload' />
                    <label
                      htmlFor='video-upload'
                      className='text-sm flex items-center flex-col font-semibold text-indigo-500 capitalize'>
                      <span>
                        <VideoCameraIcon className='text-indigo-500 h-7' />
                      </span>
                      video
                    </label>
                  </div>
                </div>
              </fieldset>

              <div className='flex items-center gap-4 mt-4'>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='disabled:ring-gray-200 disabled:pointer-events-none disabled:text-indigo-300 disabled:bg-[#FAFAFA] disabled:ring-1 capitalize font-medium border-none ring-2 w-full ring-gray-200 rounded-md py-2.5 px-6 text-white bg-indigo-500 text-sm'>
                  edit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default EditEvent;
