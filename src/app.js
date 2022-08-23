import * as yup from 'yup';
import i18next from 'i18next';
import change from './view.js';
import resources from './locales/index.js';

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
};
const state = {
  error: null,
  urlsList: [],
};
const watchedState = change(state, elements, i18n);
const app = () => {
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const enteredByUrl = formData.get('url');
    const schema = yup.string().url('notValidUrls').notOneOf(state.urlsList, 'workedRSS');
    schema.validate(enteredByUrl)
      .then((url) => {
        watchedState.urlsList.push(url);
        watchedState.error = '';
      })
      .catch((err) => {
        watchedState.error = i18n.t(`errors.${err.message}`);
      });
  });
};
export default app;
