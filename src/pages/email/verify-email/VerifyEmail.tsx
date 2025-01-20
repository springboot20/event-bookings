import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyEmailMutation } from "../../../features/auth/auth.slice";

export default function VerifiyEmail() {
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const token = urlParams.get("token");

    const verify = async () => {
      const response = await verifyEmail({ id, token }).unwrap();
      const { data } = response;

      console.log(data);

      if (response.statusCode.toString().startsWith("2")) {
        setSuccess(response?.success);
      }
    };
    verify();
  }, [verifyEmail]);

  return isLoading ? (
    <div className="flex items-center justify-center space-x-3 h-[calc(100vh-5rem)]">
      <div aria-label="Loading..." role="status">
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
      <span className="text-sm font-medium text-gray-500">verify email please wait...</span>
    </div>
  ) : success ? (
    <EmailVerificationSuccessMessage />
  ) : undefined;
}

export const EmailVerificationSuccessMessage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-center flex-col max-w-xl text-center bg-white p-6 shadow-sm rounded-2xl border">
        <h1 className="text-xl font-semibold text-gray-800 capitalize">account verified</h1>

        <div>
          <span className="flex items-center justify-center">
            <EnvelopeIcon className="h-20 fill-green-600 stroke-white" aria-hidden={true} />
          </span>
        </div>

        <div className="space-y-5">
          <p className="text-gray-700 text-xl">
            Thank you, your email has been verified. Your account is now active, Please use the link
            below to login to your account
          </p>

          <button
            onClick={async () => {
              await Promise.resolve(setTimeout(() => navigate("/login"), 2000));
            }}
            className="py-2.5 px-4 rounded-md capitalize bg-gray-800 focus:outline-none text-white mt-2"
          >
            login in to your account
          </button>
        </div>
      </div>
    </div>
  );
};
