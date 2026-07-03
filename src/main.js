import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { setState, stateUI } from './state';
import { renderUi } from './view';
import { subscribe } from 'valtio/vanilla';
import { validatorURL } from './validator';
import { domElements } from './domELements';
import rssParser from './rssParser';
import axios from 'axios';

function handleValidation(value) {
  return validatorURL()
    .validate(value, { abortEarly: false })
    .then(url => {
      setState('processed', { url })
      return url
    })
    .catch(err => {
      const errors = err.errors || [err.message || 'unknownError']
      setState('failed', { errors })
      return Promise.reject(err)
    })
}

function handleFetch(url) {
  return axios.get('/api/get', {
    params: {
      url: url,
      disableCache: true
    }
  });
}

function handleParsing(response) {
  const content = rssParser(response.data.contents)
  setState('uploaded', { content })
}

function handleError(err) {
  const errors = err.errors || [err.message || 'unknownError'];
  setState('failed', { errors })
}

export const app = () => {
  const { form, input } = domElements();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    setState('loading')

    const value = input.value.trim();

    handleValidation(value)
      .then(handleFetch)
      .then(handleParsing)
      .catch(handleError)
  });



  subscribe(stateUI, renderUi)
}