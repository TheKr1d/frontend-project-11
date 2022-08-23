import * as yup from 'yup';
import change from './view.js';

const app = () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('input'),
    feedback: document.querySelector('.feedback'),
  };
  const state = {
    error: null,
    urlsList: [],
  };
  const watchedState = change(state, elements);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const enteredByUrl = formData.get('url');
    const schema = yup.string().url('invalidUrl').notOneOf(state.urlsList, 'err');
    schema.validate(enteredByUrl)
      .then((url) => {
        watchedState.urlsList.push(url);
        watchedState.error = '';
      })
      .catch((err) => {
        if (err.message === 'invalidUrl') {
          watchedState.error = 'Ссылка должна быть валидным URL';
        }
        if (err.message === 'err') {
          watchedState.error = 'RSS уже существует';
        }
      });
  });
};
export default app;
