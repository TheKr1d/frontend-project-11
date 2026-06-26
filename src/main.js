import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { stateUI, addUrl, setErrors } from './state';
import { render } from './view';
import { subscribe } from 'valtio/vanilla';
import { validatorURL } from './validator';
import { domElements } from './domELements';

export const app = () => {
  const {form, input} = domElements();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const value = input.value.trim();

    validatorURL(stateUI.urls)
      .validate(value, { abortEarly: false })
      .then(url => {
        addUrl(url)
      })
      .catch(err => {
        const errors = err.errors || [err.message || 'Неизвестная ошибка'];
        setErrors(errors)
      });
  });

  subscribe(stateUI, render)
}

app()