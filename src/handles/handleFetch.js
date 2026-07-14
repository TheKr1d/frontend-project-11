import { fetchViaProxy } from '../services/api';
import { setFormState, addContentState } from '../state';
import rssParser from '../services/rssParser';
import { getNormaliseContent } from '../utils/normalizeContent';
import { createTimerManager } from '.';
import {getDomELements} from '../utils/getDomELements';

export const handleFetch = (url) => {

  return fetchViaProxy(url)
    .then((response) => {
      let content;
      try {
        content = rssParser(response.data.contents);
      } catch (parseError) {
        const { content } = getDomELements();
        if (content) content.textContent = JSON.stringify({
          message: error.message,
          stack: error.stack,
        });
        throw error;
        throw new Error('invalidRss', { cause: parseError });
      }

      const normaliseContent = getNormaliseContent(content, url);
      setFormState('uploaded', normaliseContent);
      addContentState(normaliseContent);
      const feedId = normaliseContent.feed.id;
      const timerManager = createTimerManager();
      timerManager.startTimer(feedId);
      
      return normaliseContent;
    })
    .catch((error) => {
      const { content } = getDomELements();
      if (content) content.textContent = JSON.stringify({
        message: error.message,
        stack: error.stack,
      });
      throw error;
      console.error('Error:', error.message);
      
      if (error.message === 'invalidRss') {
        throw error;
      }
      
      throw new Error('network');
    });
};