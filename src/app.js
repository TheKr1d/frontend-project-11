import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
import render from './view.js';
import resources from './locales/index.js';
import parserXML from './parserXML.js';

const getQueryUrl = (url) => {
  const responce = new URL('get', 'https://allorigins.hexlet.app');
  responce.searchParams.set('disableCache', 'true');
  responce.searchParams.set('url', url);
  return responce.toString();
};
const i18n = i18next.createInstance();
i18n.init({
  lng: 'ru',
  debug: false,
  resources,
});

const elements = {
  form: document.querySelector('.rss-form'),
  input: document.querySelector('input'),
  containerSubmit: document.getElementById('submit-button'),
  feedback: document.querySelector('.feedback'),
  feeds: document.querySelector('.feeds'),
  posts: document.querySelector('.posts'),
  modal: document.getElementById('modal'),
  body: document.querySelector('body'),
  modalTitle: document.querySelector('.modal-title'),
  modalBody: document.querySelector('.modal-body'),
  btnPrimary: document.querySelector('.btn-primary'),
  btnClose: document.querySelector('.btn-close'),
  btnSecondary: document.querySelector('.btn-secondary'),
};

const state = {
  error: null,
  urlsList: [],
  dataRSS: {
    feeds: [],
    contents: [],
  },
};
const view = render(state, elements, i18n);
const timer = () => {
  if (state.urlsList.length === 0) {
    return setTimeout(timer, 5000);
  }
  const promises = state.urlsList.map((url) => {
    const queryUrl = getQueryUrl(url);
    return axios(queryUrl);
  });
  const promiseAll = Promise.all(promises);
  promiseAll.then((responses) => {
    responses.forEach((response) => {
      const { contents } = parserXML(response.data.contents);
      contents.forEach((item) => {
        const newPost = !state.dataRSS.contents.find((item2) => item.title === item2.title);
        if (newPost) {
          view.dataRSS.contents.push(item);
        }
      });
    });
    setTimeout(timer, 5000);
  });
  return null;
};
timer();

const app = () => {
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    view.error = null;
    elements.containerSubmit.setAttribute('disabled', 'true');
    const formData = new FormData(e.target);
    elements.input.setAttribute('disabled', 'true');
    const enteredByUrl = formData.get('url');
    const schema = yup.string().url('notValidUrls').notOneOf(state.urlsList, 'workedRSS');
    schema.validate(enteredByUrl)
      .then((url) => {
        axios(getQueryUrl(url))
          .then((response) => {
            const { feed, contents } = parserXML(response.data.contents);
            contents.forEach((item) => {
              view.dataRSS.contents.push(item);
            });
            view.dataRSS.feeds.push(feed);
            view.urlsList.push(url);
          })
          .catch((err) => {
            if (err.request) {
              view.error = i18n.t('errors.disconnect');
            } else {
              view.error = i18n.t('errors.notValidRSS');
            }
          });
      })
      .catch((err) => {
        view.error = i18n.t(`errors.${err.message}`);
      });
  });
};
export default app;
//  http://lorem-rss.herokuapp.com/feed?unit=second&interval=4
