import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { setState, stateUI, setPosts } from './state';
import { renderUi } from './view';
import { subscribe, snapshot } from 'valtio/vanilla';
import { validatorURL } from './validator';
import { domElements } from './domELements';
import { normalizeFeedContent } from './state';
import rssParser from './rssParser';
import axios from 'axios';

const URL = 'https://allorigins.hexlet.app/get'
const timeoutIds = {}

function runUpdate(feedId) {
  const { url } = snapshot(stateUI).content.urls.find(a => a.feedId === feedId)

  axios
    .get(URL, {
      params: {
        url: url,
        disableCache: true
      }
    })
    .then((response) => {
      const content = rssParser(response.data.contents)
      const { postsWithIds } = normalizeFeedContent(content, url, feedId)

      const postsFilter = stateUI.content.posts.filter(a => a.feedId === feedId)  
      const guidsPosts = postsFilter.map(post => post.guid)

      const newPosts = postsWithIds.filter(post => !guidsPosts.includes(post.guid))

      if (newPosts.length > 0) {
        setPosts(newPosts, feedId)
      }
    })
    .catch((error) => {
      console.error('AllOrigins reques filed:', error.message);
      throw error;
    })
    .finally(() => {
      if (timeoutIds[feedId]) {
        clearTimeout(timeoutIds[feedId])
      }
      startTimer(feedId)
    })
}

function startTimer(feedId,) {
  const timeoutId = setTimeout(() => {
    runUpdate(feedId)
  }, 5000);

  timeoutIds[feedId] = timeoutId
}

function handleValidation(value) {
  return validatorURL()
    .validate(value, { abortEarly: false })
    .then(url => {
      setState('processed')
      return url
    })
    .catch(err => {
      const errors = err.errors || [err.message || 'unknownError']
      setState('failed', { errors })
      return Promise.reject(err)
    })
}

function handleFetch(url) {
  return axios
    .get(URL, {
      params: {
        url: url,
        disableCache: true
      }
    })
    .then((response) => {
      return {
        ...response,
        originalUrl: url
      };
    })
    .catch((error) => {
      console.error('AllOrigins reques filed:', error.message);
      throw error;
    })
}

function handleParsing(response) {
  const content = rssParser(response.data.contents)
  const originalUrl = response.originalUrl

  const feedId = setState('uploaded', { content, originalUrl })


  startTimer(feedId);

  return feedId
}

function handleError(err) {
  const errors = err.errors || [err.message || 'unknownError'];
  setState('failed', { errors })
}

export const app = () => {
  const { form, input } = domElements();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    setState('loading')

    const value = input.value.trim();

    handleValidation(value)
      .then(handleFetch)
      .then(handleParsing)
      .catch(handleError)
  });



  subscribe(stateUI, renderUi)
}