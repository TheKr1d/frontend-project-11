import { validatorURL } from '../services/validator';

export const handleValidation = (value) => {
  return validatorURL()
    .validate(value)
    .catch((error) => {
      error.type = 'validation';
      throw error;
    });
}