const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const normaliseUrl = (originalUrl, feedId) => {
    const dataUrl = {
        feedId,
        id: generateId(),
        url: originalUrl
    }

    return dataUrl
}

const normaliseFeed = (content) => {
    const { title, description, link } = content
    const feedId = generateId()
    const feed = {
        id: feedId,
        title,
        description,
        link
    }

    return feed
}

export const normalisePosts = (content, feedId) => {
    const postsWithIds = content.items.map(item => ({
        feedId: feedId,
        id: generateId(),
        ...item
    }));
    return postsWithIds;
}

export const getNormaliseContent = (content, url) => {
    const feed = normaliseFeed(content)
    return {
        feed,
        posts: normalisePosts(content, feed.id),
        url: normaliseUrl(url, feed.id)
    }
}