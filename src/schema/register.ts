import * as yup from "yup";

const passwordRegValidation = /^(?=.*[a-z])(?=.*[A-Z]*)(?=.*\d)(?=.*[-.+@_&]).{6,}$/;
// const usernameRegValidation = /^(?=.*[-.+@_&])(?=.*[a-zA-Z]*).{6}$/;

export const registerValidation = yup.object({
  username: yup.string().required("username is required"),
  // .matches(
  //   usernameRegValidation,
  //   'username should start with @ contain letters caps and lower, and a special character'
  // ),
  email: yup.string().required("email is required").email("invalid email format entered"),
  password: yup
    .string()
    .required("password is required")
    .matches(
      passwordRegValidation,
      "password must be at least 6 long in length and it is expected to contain digits, letter"
    ),
});
