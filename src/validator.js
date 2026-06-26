import * as yup from 'yup';

export const validatorURL = (urls) => {
    return yup
        .string()
        .required('required')
        .url('url')
        .notOneOf(urls, 'notOneOf')
}