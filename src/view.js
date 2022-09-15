import onChange from 'on-change';
import renderError from './renders/renderError.js';
import renderSuccessfulDonwload from './renders/renderValid.js';
import renderFeeds from './renders/renderFeeds.js';
import renderContens from './renders/renderContents.js';

const render = (state, elements, i18n) => onChange(state, (path, newValue) => {
  switch (path) {
    case 'error':
      renderError(elements, newValue);
      return;
    case 'urlsList':
      renderSuccessfulDonwload(elements, i18n.t('validRSS'));
      return;
    case 'dataRSS.feeds':
      renderFeeds(elements, newValue);
      return;
    case 'dataRSS.contents':
      renderContens(elements, newValue);
      return;
    default:
      console.log(new Error(`Error state: ${path}`));
  }
});
export default render;
