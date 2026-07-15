import { fetchViaProxy } from '../services/api';
import { setFormState, addContentState } from '../state';
import rssParser from '../services/rssParser';
import { getNormaliseContent } from '../utils/normalizeContent';
import { createTimerManager } from '.';

export const handleFetch = (url) => {
  return fetchViaProxy(url)
    .then((response) => {
      let content;

      try {
        content = rssParser(response.data.contents);
      } catch (error) {
        const rssError = new Error('invalidRss');
        rssError.type = 'parse';
        rssError.cause = error;
        throw rssError;
      }

      let normalised;
      try {
        normalised = getNormaliseContent(content, url);
      } catch (error) {
        const normalizeError = new Error('normalize');
        normalizeError.type = 'normalize';
        normalizeError.cause = error;
        throw normalizeError;
      }

      setFormState('uploaded', normalised);
      addContentState(normalised);

      const timerManager = createTimerManager();
      timerManager.startTimer(normalised.feed.id);

      return normalised;
    })
    .catch((error) => {
      if (error.type === 'parse' || error.type === 'normalize') {
        throw error;
      }

      const networkError = new Error('network');
      networkError.type = 'network';
      throw networkError;
    });
};