import {
  useCurrentUserQuery,
  useUpdateUserAvatarMutation,
} from '../../../features/user/user.slice';
// import { classNames } from '../../../util';
// import { PhotoIcon } from '@heroicons/react/24/outline';
import { useFile } from '../../../hooks/useFile';

import { useState } from 'react';
import { UserInterface } from '../../../types/user';
import { ProfileForm } from './components/ProfileForm';
import { ProfileDetails } from './components/ProfileDetails';
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from '../../../features/profile/profile.slice';
import { toast } from 'react-toastify';

interface AvatarInterface {
  url: string;
  public_id: string;
}

interface InitialValues {
  username: string;
  avatar: File | AvatarInterface | null;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
}

export default function Profile() {
  const { selectedFile } = useFile();
  const { data, isLoading } = useCurrentUserQuery();
  const { data: profileData } = useGetUserProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [updateUserAvatar] = useUpdateUserAvatarMutation();

  const [editProfile, setEditProfile] = useState(false);

  const user: UserInterface = data?.data;
  const profile = profileData?.data?.profile;

  const initialValues: InitialValues = {
    username: user?.username ?? '',
    email: user?.email ?? '',
    avatar: user?.avatar || selectedFile,
    firstname: profile?.firstname || '',
    lastname: profile?.lastname || '',
    phoneNumber: profile?.phoneNumber || '',
  };

  async function onSubmit(values: InitialValues) {
    const { avatar, username, email, ...rest } = values;
    try {
      const response = await updateProfile(rest).unwrap();

      const { data } = response;

      if (response.statusCode.toString().startsWith('2')) {
        toast.success(response?.message);
        setEditProfile(false);
      }

      console.log(data);
    } catch (error: any) {
      toast.success(error?.data?.message);
    }
    console.log(avatar, username, email);
  }

  return isLoading ? (
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
      <span className='text-sm font-medium text-gray-500'>loading profile</span>
    </div>
  ) : editProfile ? (
    <ProfileForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      setEditProfile={setEditProfile}
    />
  ) : (
    <ProfileDetails setEditProfile={setEditProfile} />
  );
}
