import { formState, contentState, addPosts } from "../state";
import { fetchViaProxy } from "../services/api";
import rssParser from "../services/rssParser";
import { normalisePosts } from "../utils/normalizeContent";
import { snapshot } from 'valtio/vanilla';

export const createTimerManager = () => {
  const timeoutIds = new Map();

  const startTimer = (feedId) => {
    stopTimer(feedId);

    const timeoutId = setTimeout(() => {
      runUpdate(feedId);
    }, 5000);

    timeoutIds.set(feedId, timeoutId);
  };

  const stopTimer = (feedId) => {
    const timeoutId = timeoutIds.get(feedId);
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutIds.delete(feedId);
    }
  };

  const stopAllTimers = () => {
    for (const timeoutId of timeoutIds.values()) {
      clearTimeout(timeoutId);
    }
    timeoutIds.clear();
  };

  const runUpdate = (feedId) => {
    const feed = snapshot(formState).urls.find((a) => a.feedId === feedId);
    if (!feed) return;

    fetchViaProxy(feed.url)
      .then((response) => {
        const content = rssParser(response.data.contents);
        const posts = normalisePosts(content, feedId);

        const postsFilter = snapshot(contentState).posts.filter((a) => a.feedId === feedId);
        const guidsPosts = postsFilter.map((post) => post.guid);
        const newPosts = posts.filter((post) => !guidsPosts.includes(post.guid));

        if (newPosts.length > 0) {
          addPosts(newPosts);
        }
      })
      .catch((error) => {
        console.error('Timer update error:', error);
      })
      .finally(() => {
        startTimer(feedId);
      });
  };

  return {
    startTimer,
    stopTimer,
    stopAllTimers,
    runUpdate,
  };
};