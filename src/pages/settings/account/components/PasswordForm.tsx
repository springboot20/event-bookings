import { ErrorMessage, Field, Form, Formik } from "formik";
import { useChangeCurrentPasswordMutation } from "../../../../features/user/user.slice";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import * as yup from "yup";
import { CustomErrorMessage } from "../../../../components/Error";
import { classNames } from "../../../../app/util";

interface PasswordInitialValues {
  existingPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialValues: PasswordInitialValues = {
  confirmPassword: "",
  newPassword: "",
  existingPassword: "",
};

// const phoneRule = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/;
const passwordRegValidation = /^(?=.*[a-z])(?=.*[A-Z]*)(?=.*\d)(?=.*[-.+@_&]).{6,}$/;
const validation = yup.object().shape({
  existingPassword: yup
    .string()
    .required("existing password is required")
    .matches(
      passwordRegValidation,
      "password must be at least 6 long in length and it is expected to contain digits, letter"
    ),

  newPassword: yup
    .string()
    .required("new password is required")
    .matches(
      passwordRegValidation,
      "password must be at least 6 long in length and it is expected to contain digits, letter"
    ),

  confirmPassword: yup
    .string()
    .required("confirm password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export const PasswordForm = () => {
  const [changeeCurrentPassword] = useChangeCurrentPasswordMutation();
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={async (values) => {
        const { existingPassword, newPassword } = values;
        await changeeCurrentPassword({
          existingPassword,
          newPassword,
        }).unwrap();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="flex items-center justify-between border-b py-3">
            <h3 className="text-lg font-medium capitalize">password</h3>
            <button
              type="button"
              className="text-base font-normal px-3 rounded py-1 border bg-white"
              onClick={() => setShowForm((prev) => !prev)}
            >
              {showForm ? "hide" : "Change password"}
            </button>
          </div>

          {showForm && (
            <div className="md:max-w-md mt-4">
              <fieldset>
                <label htmlFor="existingPassword" className="font-normal text-gray-700 text-base">
                  old Password
                </label>
                <div className="mt-2 relative">
                  <Field
                    type={show ? "text" : "password"}
                    id="existingPassword"
                    name="existingPassword"
                    className={classNames(
                      "block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                      errors.existingPassword && touched.existingPassword
                        ? "focus:ring-red-600 ring-red-600 ring-2"
                        : "focus:ring-indigo-600"
                    )}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 -translate-y-1/2 right-4"
                    onClick={() => setShow(!show)}
                  >
                    {show ? (
                      <EyeSlashIcon className="h-6 w-6 cursor-pointer text-gray-800" />
                    ) : (
                      <EyeIcon className="h-6 w-6 cursor-pointer text-gray-800 " />
                    )}
                  </button>
                </div>
                <ErrorMessage name="existingPassword">
                  {(msg) => (
                    <CustomErrorMessage className="text-sm mt-0.5 block text-red-600">
                      {msg}
                    </CustomErrorMessage>
                  )}
                </ErrorMessage>
              </fieldset>

              <fieldset className="mt-3">
                <label htmlFor="newPassword" className="font-normal text-gray-700 text-base">
                  new Password
                </label>

                <div className="mt-2 relative">
                  <Field
                    type={show ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    className={classNames(
                      "block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                      errors.newPassword && touched.newPassword
                        ? "focus:ring-red-600 ring-red-600 ring-2"
                        : "focus:ring-indigo-600"
                    )}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 -translate-y-1/2 right-4"
                    onClick={() => setShow(!show)}
                  >
                    {show ? (
                      <EyeSlashIcon className="h-6 w-6 cursor-pointer text-gray-800" />
                    ) : (
                      <EyeIcon className="h-6 w-6 cursor-pointer text-gray-800 " />
                    )}
                  </button>
                </div>
                <ErrorMessage name="newPassword">
                  {(msg) => (
                    <CustomErrorMessage className="text-sm mt-0.5 block text-red-600">
                      {msg}
                    </CustomErrorMessage>
                  )}
                </ErrorMessage>
              </fieldset>

              <fieldset className="mt-3">
                <label htmlFor="confirmPassword" className="font-normal text-gray-700 text-base">
                  confirm Password
                </label>
                <div className="relative mt-2">
                  <Field
                    type={show ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={classNames(
                      "block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                      errors.confirmPassword && touched.confirmPassword
                        ? "focus:ring-red-600 ring-red-600 ring-2"
                        : "focus:ring-indigo-600"
                    )}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 -translate-y-1/2 right-4"
                    onClick={() => setShow(!show)}
                  >
                    {show ? (
                      <EyeSlashIcon className="h-6 w-6 cursor-pointer text-gray-800" />
                    ) : (
                      <EyeIcon className="h-6 w-6 cursor-pointer text-gray-800 " />
                    )}
                  </button>
                </div>
                <ErrorMessage name="confirmPassword">
                  {(msg) => (
                    <CustomErrorMessage className="text-sm mt-0.5 block text-red-600">
                      {msg}
                    </CustomErrorMessage>
                  )}
                </ErrorMessage>
              </fieldset>

              <button
                // disabled={!isLoading}
                className=" bg-green-600 transition-colors hover:bg-green-500 text-white text-base font-normal px-3 py-2 rounded mt-4 disabled:bg-green-400 disabled:cursor-not-allowed"
              >
                update password
              </button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};
