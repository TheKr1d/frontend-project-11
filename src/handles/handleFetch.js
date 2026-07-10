import { fetchViaProxy } from '../services/api';
import { setFormState, addContentState } from '../state';
import rssParser from '../services/rssParser';
import { getNormaliseContent } from '../utils/normalizeContent';
import { createTimerManager } from '.';

export const handleFetch = (url) => {
  
  return fetchViaProxy(url)
    .then((response) => {
      const content = rssParser(response.data.contents)
      const normaliseContent = getNormaliseContent(content, url)
      
      setFormState('uploaded', normaliseContent);
      addContentState(normaliseContent);
      const feedId = normaliseContent.feed.id;
      const timerManager = createTimerManager()
      timerManager.startTimer(feedId);

      return url;
    })
    .catch((error) => {
      console.error('Proxy request failed:', error.message);
      throw new Error('request');
    });
}