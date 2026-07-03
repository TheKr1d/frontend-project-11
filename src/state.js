import { proxy } from 'valtio/vanilla';

export const stateUI = proxy({
    process: 'default',
    urls: [],
    errors: [],
    content: {
        feeds: [],
        posts: []
    }
});

export const addUrl = (url) => {
    stateUI.urls = [...stateUI.urls, url];
    stateUI.errors = [];
};

export const setErrors = (errors) => {
    stateUI.errors = [...errors];
};

export const setProcess = (errors) => {
    stateUI.process = '';
};

const generateId = () => {
    return crypto.randomUUID();
}

export const addContent = (content) => {
    const { title, description, link, items } = content

    const feed = {
        id: generateId(),
        title,
        description,
        link
    }

    const postsWithIds = items.map(item => ({
        feedId: feed.id,
        id: generateId(),
        ...item
    }));

    stateUI.content.feeds = [...stateUI.content.feeds, feed];
    stateUI.content.posts = [...stateUI.content.posts, ...postsWithIds];
}