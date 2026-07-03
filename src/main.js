import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { stateUI, addUrl, setErrors, addContent } from './state';
import { render } from './view';
import { subscribe } from 'valtio/vanilla';
import { validatorURL } from './validator';
import { domElements } from './domELements';
import rssParser from './rssParser';
import axios from 'axios';

export const app = () => {
  const { form, input } = domElements();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const value = input.value.trim();

    validatorURL(stateUI.urls)
      .validate(value, { abortEarly: false })
      .then(url => {
        addUrl(url)
        return url
      })
      .catch(err => {
        const errors = err.errors || [err.message || 'unknownError'];
        setErrors(errors)
        throw err
      })
      .then(url => {
        const response = axios.get('/api/get', {
          params: {
            url: url,
            disableCache: true
          }
        });

        return response
      })
      .then(response => {
        const parse = rssParser(response.data.contents)
        addContent(parse)
      })
      .catch(err => {
        const errors = err.errors || [err.message || 'unknownError'];
        setErrors(errors)
      })


  });

  subscribe(stateUI, render)
}