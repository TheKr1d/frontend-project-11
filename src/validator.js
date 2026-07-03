import * as yup from 'yup';
import { getUrls } from './state';

export const validatorURL = () => {
    return yup
        .string()
        .required('required')
        .url('url')
        .notOneOf(getUrls(), 'notOneOf')
}