import { PhotoIcon } from '@heroicons/react/24/outline';
import { useGetUserProfileQuery } from '../../../../features/profile/profile.slice';
import { useEffect } from 'react';

export const ProfileDetails: React.FC<{
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setEditProfile }) => {
  const { data, refetch } = useGetUserProfileQuery();

  const profile = data?.data?.profile;

  console.log(profile);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className='mt-4'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4'>
        <div className='col-span-full sm:col-span-2'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between max-w-md'>
            <div>
              <h3 className='text-lg font-medium capitalize text-gray-600'>first name</h3>
              <p className='text-gray-500 text-base font-normal capitalize'>{profile?.firstname}</p>
            </div>

            <div>
              <h3 className='text-lg font-medium capitalize text-gray-600'>last name</h3>
              <p className='text-gray-500 text-base font-normal capitalize'>{profile?.lastname}</p>
            </div>
          </div>

          <div className='mt-4 sm:mt-6'>
            <h3 className='text-lg font-medium capitalize text-gray-600'>username</h3>
            <p className='text-gray-500 text-base font-normal'>{profile?.user?.username}</p>
          </div>

          <div className='mt-4 sm:mt-6'>
            <h3 className='text-lg font-medium capitalize text-gray-600'>email address</h3>
            <p className='text-gray-500 text-base font-normal'>{profile?.user?.email}</p>
          </div>

          <div className='mt-4 sm:mt-6'>
            <h3 className='text-lg font-medium capitalize text-gray-600'>phone number</h3>
            <p className='text-gray-500 text-base font-normal'>{profile?.phoneNumber}</p>
          </div>
        </div>

        <div className='col-span-full sm:col-span-1 mt-2 flex items-center justify-center'>
          {profile?.user?.avatar === null ? (
            <div className='h-48 w-48 rounded-full border'>
              <img
                src={profile?.user?.avatar?.url}
                alt={`${profile?.user?.username}`}
                className='h-full w-full object-cover object-center'
              />
            </div>
          ) : (
            <div className='rounded-full border h-48 w-48 bg-white flex justify-center items-center'>
              <PhotoIcon className='size-8 text-gray-400' />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => setEditProfile(true)}
        type='button'
        className='px-2 py-1 mt-5 rounded bg-gray-600 text-white text-base font-medium'>
        edit profile
      </button>
    </div>
  );
};
