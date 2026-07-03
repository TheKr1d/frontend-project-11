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

const normalizeFeedContent = (content) => {
    const { title, description, link, items } = content

    const feed = {
        id: crypto.randomUUID(),
        title,
        description,
        link
    }

    const postsWithIds = items.map(item => ({
        feedId: feed.id,
        id: crypto.randomUUID(),
        ...item
    }));

    return {
        feed,
        postsWithIds: postsWithIds
    }
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
            const { url } = data

            Object.assign(stateUI, {
                state: newProcess,
                content: {
                    ...stateUI.content,
                    urls: [...stateUI.content.urls, url]
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
            const { content } = data
            const { feed, postsWithIds } = normalizeFeedContent(content)
            Object.assign(stateUI, {
                state: newProcess,
                content: {
                    ...stateUI.content,
                    feeds: [...stateUI.content.feeds, feed],
                    posts: [...stateUI.content.posts, ...postsWithIds]
                },
                errors: []
            });
            break;
        }

        default: {
            break
        }

    }

    stateUI.state = newProcess;
};