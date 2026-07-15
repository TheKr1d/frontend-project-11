import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import { modalState, contentState, formState } from './state/index';
import { renderForm, renderContent, renderModal } from './views/index';
import { setFormState } from './state/index';
import { getDomELements } from './utils/getDomELements';
import { handleValidation, handleError, handleFetch } from './handles/index'
import { subscribe } from 'valtio/vanilla';


export const app = () => {
  const { form, input } = getDomELements();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    setFormState('loaded')
    
    const value = input.value.trim();

    handleValidation(value)
      .then(() => handleFetch(value))
      .catch(handleError)
  });

  subscribe(formState, renderForm)
  subscribe(contentState, renderContent)
  subscribe(modalState, renderModal)
}
