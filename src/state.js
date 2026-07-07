import { proxy } from 'valtio/vanilla';

export const stateUI = proxy({
    state: 'default', // 'loading', 'processed', 'failed', 'uploaded'
    errors: [],
    content: {
        urls: [],
        feeds: [],
        posts: []
    }
});

export const normalizeFeedContent = (content, originalUrl, myFeedId = null) => {
    const { title, description, link, items } = content

    const feedId = myFeedId ?? crypto.randomUUID()

    const feed = {
        id: feedId,
        title,
        description,
        link
    }

    const url = {
        feedId,
        id: crypto.randomUUID(),
        url: originalUrl
    }

    const postsWithIds = items.map(item => ({
        feedId: feedId,
        id: crypto.randomUUID(),
        ...item
    }));

    return {
        feed,
        postsWithIds: postsWithIds,
        url
    }
}

export const setPosts = (newPosts, feedId) => {
    const normalisePosts = newPosts.map(item => ({ ...item, feedId }))
    Object.assign(stateUI, {
        content: {
            ...stateUI.content,
            posts: [...stateUI.content.posts, ...normalisePosts],
        }
    });
}

export const getUrls = () => stateUI.content.urls;

export const setState = (newProcess, data) => {
    switch (newProcess) {
        case 'loading': {
            Object.assign(stateUI, {
                state: newProcess
            });
            break;
        }

        case 'processed': {
            Object.assign(stateUI, {
                state: newProcess,
                content: {
                    ...stateUI.content
                },
                errors: []
            });
            break;
        }


        case 'failed': {
            const { errors } = data
            Object.assign(stateUI, {
                state: newProcess,
                errors: [...errors]
            });
            break;
        }


        case 'uploaded': {
            const { content, originalUrl } = data
            const { feed, postsWithIds, url } = normalizeFeedContent(content, originalUrl)
            Object.assign(stateUI, {
                state: newProcess,
                content: {
                    ...stateUI.content,
                    feeds: [...stateUI.content.feeds, feed],
                    posts: [...stateUI.content.posts, ...postsWithIds],
                    urls: [...stateUI.content.urls, url]
                },
                errors: []
            });
            return url.feedId;
        }

        default: {
            break
        }

    }

    stateUI.state = newProcess;
};