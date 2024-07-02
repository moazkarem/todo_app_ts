import * as yup from "yup"
export const registerSchema = yup
  .object({
    username: yup.string().required('username is required').min(6 , 'username must be at lest 6 characters long'),
    email: yup
    .string()
    .required('Email is required')
    .matches(/^.+@.+\..+$/ig , 'invalid email address'),
    password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters ')
  })
  .required()

  export const loinSchema = yup
  .object({
   
    identifier: yup
    .string()
    .required('Email is required')
    .matches(/^.+@.+\..+$/ig , 'invalid email address'),
    password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
  })
  .required()