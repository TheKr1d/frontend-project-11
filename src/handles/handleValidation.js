import { validatorURL } from '../services/validator';

export const handleValidation = (value) => {
  return validatorURL()
    .validate(value)
    .catch(err => {
      return Promise.reject(err)
    })
}