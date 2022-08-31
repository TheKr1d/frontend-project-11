import * as yup from 'yup';
import i18next from 'i18next';
import render from './view.js';
import resources from './locales/index.js';
import axios from 'axios';

let id = 0;
const generateId = () => id += 1;

const parserXML = (xml) => {
  const newDomParser = new DOMParser();
  const domXML = newDomParser.parseFromString(xml, 'text/xml');
  generateId();
  const feed = {
    title: domXML.querySelector('channel > title').textContent,
    description: domXML.querySelector('channel > description').textContent
  };
  const contents = { items: domXML.querySelectorAll('item'), id };
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
  posts: document.querySelector('.posts')
};

const state = {
  error: null,
  urlsList: [],
  dataRSS: {
    feeds: [],
    contents: []
  }
};
const watchedState = render(state, elements, i18n);

const app = () => {
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const enteredByUrl = formData.get('url');
    const schema = yup.string().url('notValidUrls').notOneOf(state.urlsList, 'workedRSS');
    schema.validate(enteredByUrl)
      .then((url) => {
        axios({
          method: 'get',
          url: `https://allorigins.hexlet.app/get?url=${enteredByUrl}`,
          disableCashe: true
        })
          .then((response) => {
            const { feed, contents } = parserXML(response.data.contents);
            watchedState.dataRSS.feeds.push(feed);
            watchedState.dataRSS.contents.push(contents);
            watchedState.urlsList.push(url);
          })
          .catch((err) => {
            watchedState.error = i18n.t(`errors.notValidRSS`);
          })
      })
      .catch((err) => {
        watchedState.error = i18n.t(`errors.${err.message}`);
      });
  });
};
export default app;
