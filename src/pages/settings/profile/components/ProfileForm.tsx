import { useFile } from '../../../../hooks/useFile';
import { Form, Formik, Field } from 'formik';
import { classNames } from '../../../../util';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

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

export const ProfileForm: React.FC<{
  initialValues: InitialValues;
  onSubmit: (values: InitialValues) => Promise<void>;
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ initialValues, onSubmit, setEditProfile }) => {
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

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => {
        return (
          <Form>
            <div className='grid grid-cols-1 xl:grid-cols-3 xl:gap-4 mt-4'>
              <div className='col-span-full xl:col-span-2'>
                <div className='flex flex-col sm:flex-row gap-3'>
                  <fieldset className='w-full'>
                    <label
                      htmlFor='firstname'
                      className='capitalize font-normal text-gray-700 text-base'>
                      first name
                    </label>
                    <Field
                      name='firstname'
                      id='firstname'
                      className='block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none'
                    />
                  </fieldset>

                  <fieldset className='w-full'>
                    <label
                      htmlFor='lastname'
                      className='capitalize font-normal text-gray-700 text-base'>
                      last name
                    </label>
                    <Field
                      name='lastname'
                      id='lastname'
                      className='block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none'
                    />
                  </fieldset>
                </div>
                <fieldset className='mt-4'>
                  <label htmlFor='username' className='font-normal text-gray-700 text-base'>
                    Public username
                  </label>
                  <Field
                    name='username'
                    id='username'
                    className='block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none'
                  />
                </fieldset>

                <fieldset className='mt-4'>
                  <label htmlFor='email' className='font-normal capitalize text-gray-700 text-base'>
                    email address
                  </label>
                  <Field
                    name='email'
                    id='email'
                    type='email'
                    className='block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none'
                  />
                </fieldset>

                <fieldset className='mt-4'>
                  <label htmlFor='phoneNumber' className='font-normal capitalize text-gray-700 text-base'>
                    phone number
                  </label>
                  <Field
                    name='phoneNumber'
                    id='phoneNumber'
                    className='block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none'
                  />
                </fieldset>
              </div>
              <div className='col-span-full xl:col-span-1 mt-2'>
                <fieldset className='mt-3'>
                  <label
                    htmlFor='avatar'
                    className='text-sm font-normal text-gray-800 dark:text-gray-50'>
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
                          className='relative cursor-pointer rounded-md font-normal text-indigo-600 hover:text-indigo-500 '>
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
                      className='rounded bg-white px-2.5 py-2 text-sm font-normal text-gray-900 shadow ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                      Change profile image
                    </button>
                  </fieldset>
                )}
              </div>
              <div className='flex items-center justify-between mt-8 col-span-2'>
                <button
                  type='button'
                  className='flex items-center gap-1 bg-indigo-600 transition-colors  hover:bg-indigo-500 text-white px-3 py-2 rounded'
                  onClick={() => setEditProfile(false)}>
                  <XMarkIcon className='size-5' />
                  <span className='text-base font-normal'>cancel edit</span>
                </button>
                <button
                  type='submit'
                  className='flex items-center gap-1 bg-green-600 transition-colors  hover:bg-green-500 text-white text-base font-normal px-3 py-2 rounded'>
                  <span className='text-base font-medium'>update profile</span>
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
