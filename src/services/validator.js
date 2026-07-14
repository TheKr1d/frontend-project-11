import * as yup from 'yup';
import { getUrls } from '../state';

export const validatorURL = () => {
  return yup
    .string()
    .required('required')
    .url('url')
    .test('unique-url', 'notOneOf', (value) => {
      if (!value) {
        return true;
      }

      return !getUrls().includes(value);
    });
};