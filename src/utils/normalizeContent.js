const normaliseUrl = (originalUrl, feedId) => {
    const dataUrl = {
        feedId,
        id: crypto.randomUUID(),
        url: originalUrl
    }

    return dataUrl
}

const normaliseFeed = (content) => {
    const { title, description, link } = content
    const feedId = crypto.randomUUID()
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
        id: crypto.randomUUID(),
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