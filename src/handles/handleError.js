import { setFormState } from "../state";
import {getDomELements} from '../utils/getDomELements';

export const handleError = (err) => {
  const errorMessage = err.message || 'unknownError';
  const { content } = getDomELements();
  if (content) content.textContent = JSON.stringify({
          message: err.message,
          stack: err.stack,
        });
        throw err;
  
  setFormState('failed', { errorMessage })
}