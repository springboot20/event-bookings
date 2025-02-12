import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { classNames } from "../../app/util";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { CustomErrorMessage } from "../../components/Error";
import { Link } from "react-router-dom";
import { registerValidation } from "../../schema/register";
import { useRegisterMutation } from "../../features/auth/auth.slice";

type InitialValues = {
  username: string;
  email: string;
  password: string;
};

const initialValues: InitialValues = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [show, setShow] = useState<boolean>(false);
  const [register] = useRegisterMutation();

  async function onSubmit(values: InitialValues, { resetForm }: FormikHelpers<InitialValues>) {
    await register(values)
      .unwrap()
      .then((response) => {
        const { email_url } = response.data;

        const verificationWindow = window.open(email_url);
        console.log(email_url);
        if (verificationWindow) {
          const interval = setInterval(() => {
            if (verificationWindow.closed) {
              clearInterval(interval);
            }
          }, 1000);
        } else {
          console.error("Failed to open payment window.");
        }
        resetForm();
      })
      .catch((error) => {
        throw error;
      });
  }

  return (
    <div className="flex flex-col items-center justify-center lg:h-screen relative -top-32 lg:top-0">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={registerValidation}
      >
        {({ errors, touched, isSubmitting, isValid }) => (
          <Form className="mt-4 w-full bg-white rounded-lg p-6 max-w-lg border">
            <div className="mx-auto max-w-md mb-2">
              <UserCircleIcon className="mx-auto h-12 w-auto text-indigo-600" />
              <h2 className="mt-2 text-xl sm:text-2xl text-center font-semibold text-gray-700">
                Sign up for an account
              </h2>
            </div>
            <fieldset className="mt-2">
              <label
                htmlFor="username"
                className="capitalize text-sm font-semibold text-gray-700 sm:text-base"
              >
                username <span className="text-red-600 text-base font-bold">*</span>
              </label>

              <div className="mt-2 relative">
                <Field
                  name="username"
                  type="text"
                  id="username"
                  placeholder="enter username ...."
                  className={classNames(
                    "block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none",
                    errors.username && touched.username ? "ring-red-600" : "focus:ring-indigo-600"
                  )}
                />
                <ErrorMessage name="username">
                  {(msg) => (
                    <CustomErrorMessage className="text-sm mt-0.5 block text-red-600">
                      {msg}
                    </CustomErrorMessage>
                  )}
                </ErrorMessage>
              </div>
            </fieldset>

            <fieldset className="mt-2">
              <label
                htmlFor="email"
                className="capitalize text-sm font-semibold text-gray-700 sm:text-base"
              >
                email <span className="text-red-600 text-base font-bold">*</span>
              </label>

              <div className="mt-2 relative">
                <Field
                  name="email"
                  type="email"
                  id="email"
                  placeholder="enter email address.."
                  className={classNames(
                    "block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none",
                    errors.email && touched.email ? "ring-red-600" : "focus:ring-indigo-600"
                  )}
                />
                <ErrorMessage name="email">
                  {(msg) => (
                    <CustomErrorMessage className="text-sm mt-0.5 block text-red-600">
                      {msg}
                    </CustomErrorMessage>
                  )}
                </ErrorMessage>
              </div>
            </fieldset>

            <fieldset className="mt-2">
              <label
                htmlFor="password"
                className="capitalize text-sm font-semibold text-gray-700 sm:text-base"
              >
                password <span className="text-red-600 text-base font-bold">*</span>
              </label>

              <div className="mt-2">
                <div className=" relative ">
                  <Field
                    name="password"
                    id="password"
                    type={show ? "text" : "password"}
                    placeholder="enter password .."
                    className={classNames(
                      "block w-full px-3 rounded-md border-0 py-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none",
                      errors.password && touched.password ? "ring-red-600" : "focus:ring-indigo-600"
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
                <ErrorMessage name="password">
                  {(msg) => (
                    <CustomErrorMessage className="text-sm mt-0.5 block text-red-600">
                      {msg}
                    </CustomErrorMessage>
                  )}
                </ErrorMessage>
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={!isValid}
              className="disabled:bg-indigo-300 disabled:cursor-not-allowed block py-2.5 w-full mt-5 bg-indigo-500 rounded-md uppercase  shadow-md"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="h-7 w-7 animate-spin" viewBox="3 3 18 18">
                    <path
                      className="fill-white"
                      d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                    ></path>
                    <path
                      className="fill-[#4632A8]"
                      d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <span className="text-white text-sm font-medium uppercase tracking-wider">
                  sign up
                </span>
              )}
            </button>
          </Form>
        )}
      </Formik>
      <div className="mx-auto mt-3">
        <p className="text-center text-sm font-normal text-gray-800">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
