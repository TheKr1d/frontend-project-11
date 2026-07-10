import { proxy } from 'valtio/vanilla';

export const contentState = proxy({
  feeds: [],
  posts: [],
  readPostIds: []
})

export const addContentState = (data) => {
  const { feed, posts } = data
  Object.assign(contentState, {
    feeds: [...contentState.feeds, feed],
    posts: [...contentState.posts, ...posts]
  });
}

export const addPosts = (newPosts) => {
  Object.assign(contentState, {
      posts: [...contentState.posts, ...newPosts],
  });
}

export const markPostAsRead = (postId) => {
  if (!contentState.readPostIds.includes(postId)) {
    contentState.readPostIds = [...contentState.readPostIds, postId];
  }
};