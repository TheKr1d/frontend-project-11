import { fetchViaProxy } from '../services/api';
import { setFormState, addContentState } from '../state';
import rssParser from '../services/rssParser';
import { getNormaliseContent } from '../utils/normalizeContent';
import { createTimerManager } from '.';

export const handleFetch = (url) => {
  console.log(12)
  return fetchViaProxy(url)
    .then((response) => {
      let content;
      console.log(1)
      try {
        content = rssParser(response.data.contents);
      } catch (parseError) {
        throw new Error('invalidRss', { cause: parseError });
      }
      console.log(2)
      const normaliseContent = getNormaliseContent(content, url);
      console.log(3)
      setFormState('uploaded', normaliseContent);
      console.log(4)
      addContentState(normaliseContent);
      console.log(5)
      const feedId = normaliseContent.feed.id;
      console.log(6)
      const timerManager = createTimerManager();
      console.log(7)
      timerManager.startTimer(feedId);
      console.log(8)
      
      return normaliseContent;
    })
    .catch((error) => {
      console.error('Error:', error.message);
      
      if (error.message === 'invalidRss') {
        throw error;
      }
      
      throw new Error('network');
    });
};