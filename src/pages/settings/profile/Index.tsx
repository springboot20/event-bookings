import { Form, Formik, Field } from 'formik';
import { useCurrentUserQuery } from '../../../features/user/user.slice';
import { UserInterface } from '../../../types/user';
import { useFile } from '../../../hooks/useFile';
import { classNames } from '../../../util';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface AvatarInterface {
  url: string;
  public_id: string;
}

interface InitialValues {
  username: string;
  avatar: File | AvatarInterface | null;
}

export default function Profile() {
  const {
    selectedFile,
    isDropping,
    setSelectedFile,
    fileInputRef,
    handleDragEnter,
    handleDrop,
    handleDragLeave,
    handleDragOver,
  } = useFile();
  const { data, isLoading } = useCurrentUserQuery();

  const user: UserInterface = data?.data;

  console.log(data);

  const initialValues: InitialValues = {
    username: user?.username ?? '',
    avatar: user?.avatar || selectedFile,
  };

  async function onSubmit(values: InitialValues) {
    console.log(values);
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
  ) : (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => {
        return (
          <Form className='grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4'>
            <div className='col-span-full xl:col-span-2'>
              <fieldset>
                <label
                  htmlFor='username'
                  className='capitalize font-medium text-gray-700 text-base'>
                  public username
                </label>
                <Field
                  name='username'
                  id='username'
                  className='block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none'
                />
              </fieldset>
            </div>
            <div className='col-span-full xl:col-span-1 mt-2'>
              <fieldset className='mt-3'>
                <label
                  htmlFor='avatar'
                  className='text-sm font-medium text-gray-800 dark:text-gray-50'>
                  Upload photo
                </label>
                <div
                  className={classNames(
                    'border-dashed px-6 py-9 mt-2 border-2 rounded-md flex justify-center',
                    isDropping ? 'border-indigo-400' : 'border-gray-400'
                  )}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}>
                  <div className='text-center'>
                    {selectedFile ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt='avatar'
                        className='h-32 w-32 object-cover shadow-lg mb-3 ring-2 ring-offset-2 ring-indigo-500 rounded-full mx-auto'
                      />
                    ) : (
                      <PhotoIcon className='mx-auto h-11 w-11 text-gray-500 dark:text-gray-50' />
                    )}
                    <div className='text-center'>
                      <label
                        htmlFor='avatar'
                        className='relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 '>
                        <input
                          type='file'
                          id='avatar'
                          name='avatar'
                          hidden
                          ref={fileInputRef}
                          onChange={(event) => {
                            if (event.target.files && event.target.files.length > 0) {
                              const files = event.target.files;

                              formik.setFieldValue('avatar', files[0]);
                              setSelectedFile(files[0]);
                            }
                          }}
                        />
                        <span>Upload photo</span>
                      </label>
                      <p className='pl-1 dark:text-gray-50'>or drag and drop</p>
                    </div>
                    <p className='text-xs leading-5 text-gray-500 dark:text-gray-200'>
                      PNG, JPEG, JPG, GIF and SVG up to 5mb
                    </p>
                  </div>
                </div>
              </fieldset>

              {selectedFile && (
                <fieldset className='mt-4'>
                  <button
                    type='button'
                    onClick={() => {
                      if (fileInputRef.current) fileInputRef.current.click();
                    }}
                    className='rounded bg-white px-2.5 py-2 text-sm font-medium text-gray-900 shadow ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                    Change profile image
                  </button>
                </fieldset>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
