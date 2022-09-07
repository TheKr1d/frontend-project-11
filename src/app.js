import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
import _ from 'lodash';
import render from './view.js';
import resources from './locales/index.js';

const getQueryUrl = (url) => `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;
const parserXML = (xml) => {
  const newDomParser = new DOMParser();
  const domXML = newDomParser.parseFromString(xml, 'text/xml');
  const feed = {
    title: domXML.querySelector('channel > title').textContent,
    description: domXML.querySelector('channel > description').textContent,
  };
  const items = domXML.querySelectorAll('item');
  const contents = [];
  items.forEach((item) => {
    contents.push({
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
    });
  });
  return { feed, contents };
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

const watchedState = render(state, elements, i18n);

const app = () => {
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const collections = [];
    const formData = new FormData(e.target);
    const enteredByUrl = formData.get('url');
    const schema = yup.string().url('notValidUrls').notOneOf(state.urlsList, 'workedRSS');
    schema.validate(enteredByUrl)
      .then((url) => {
        axios(getQueryUrl(url))
          .then((response) => {
            const { feed, contents } = parserXML(response.data.contents);
            contents.forEach((item) => {
              collections.push(item);
            });
            watchedState.dataRSS.contents = [...state.dataRSS.contents, ...collections];
            watchedState.dataRSS.feeds.push(feed);
            watchedState.urlsList.push(url);
          })
          .catch(() => {
            watchedState.error = i18n.t('errors.notValidRSS');
          });
      })
      .catch((err) => {
        watchedState.error = i18n.t(`errors.${err.message}`);
      });
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
            const newPost = !state.dataRSS.contents.find((item2) => _.isEqual(item2, item));
            if (newPost) {
              watchedState.dataRSS.contents.push(item);
            }
          });
        });
      });
      return setTimeout(timer, 5000);
    };
    timer();
  });
};
export default app;
//  http://lorem-rss.herokuapp.com/feed?unit=second&interval=4
