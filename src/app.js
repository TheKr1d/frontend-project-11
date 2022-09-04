import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
import render from './view.js';
import resources from './locales/index.js';

const parserXML = (xml) => {
  const newDomParser = new DOMParser();
  const domXML = newDomParser.parseFromString(xml, 'text/xml');
  const feed = {
    title: domXML.querySelector('channel > title').textContent,
    description: domXML.querySelector('channel > description').textContent,
  };
  const contents = { items: domXML.querySelectorAll('item') };
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
    const formData = new FormData(e.target);
    const enteredByUrl = formData.get('url');
    const schema = yup.string().url('notValidUrls').notOneOf(state.urlsList, 'workedRSS');
    schema.validate(enteredByUrl)
      .then((url) => {
        axios({
          method: 'get',
          url: `https://allorigins.hexlet.app/get?url=${enteredByUrl}`,
          disableCashe: true,
        })
          .then((response) => {
            const { feed, contents } = parserXML(response.data.contents);
            contents.items.forEach((item) => {
              watchedState.dataRSS.contents.push(item);
            })
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
  });

  setInterval(() => {
    if (state.urlsList.length === 0) {
      return;
    }
    const promises = state.urlsList.map((url) => axios({
        method: 'get',
        url: `https://allorigins.hexlet.app/get?url=${url}`,
        disableCashe: true,
      })
    );
    const promiseAll = Promise.all(promises);
    const posts = [];
    promiseAll.then((collection) => {
      collection.forEach((responce) => {
        const { contents } = parserXML(responce.data.contents);
        contents.items.forEach((item) => {
          posts.push(item);
        })
      })
    })
    watchedState.dataRSS.contents = posts;
  }, 5000)
};
export default app;
//  http://lorem-rss.herokuapp.com/feed?unit=second&interval=4