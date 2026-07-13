// src/handles/handleFetch.js
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
      } catch (parseError) {
        // Пробрасываем ошибку парсинга дальше
        throw new Error('invalidRss');
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
      console.error('Error:', error.message);
      
      // Если это ошибка от rssParser или уже известная ошибка
      if (error.message === 'invalidRss' || error.message === 'notOneOf') {
        throw error;
      }
      
      // Остальные ошибки - сетевые
      throw new Error('network');
    });
};