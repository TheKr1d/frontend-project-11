const getElementText = (parent, tagName) => {
    const element = parent.querySelector(tagName);
    return element ? element.textContent.trim() : '';
};

export default (data) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");

    const channel = xmlDoc.querySelector('channel');
    if (!channel) {
        throw new Error('Не найден элемент channel в RSS');
    }

    const feed = {
        title: getElementText(channel, 'title'),
        description: getElementText(channel, 'description'),
        link: getElementText(channel, 'link'),
        language: getElementText(channel, 'language'),
        lastBuildDate: getElementText(channel, 'lastBuildDate'),
        items: []
    };

    const items = xmlDoc.querySelectorAll('item');
    items.forEach(item => {
        feed.items.push({
            title: getElementText(item, 'title'),
            link: getElementText(item, 'link'),
            description: getElementText(item, 'description'),
            pubDate: getElementText(item, 'pubDate'),
            author: getElementText(item, 'author'),
            guid: getElementText(item, 'guid'),
            category: getElementText(item, 'category')
        });
    });

   return feed
}