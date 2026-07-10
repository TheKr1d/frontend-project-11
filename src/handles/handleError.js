import { setFormState } from "../state";

export const handleError = (err) => {
  const errorMessage = err.message || 'unknownError';
  setFormState('failed', { errorMessage })
}