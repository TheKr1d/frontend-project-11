import { snapshot } from 'valtio/vanilla';
import { contentState } from '../state';
import { getDomELements } from '../utils/getDomELements';
import { handlePost } from '../handles/handlePost';
import i18n from '../locales/index';

const createFeedElement = (feeds) => {

    const titleFeeds = createTitle(i18n.t(`ui.feeds`))

    const container = document.createElement('div');
    container.className = 'col-3'

    const div = document.createElement('div');
    div.className = 'p-2 px-3 align-items-center'
    feeds.forEach(({ description, title }) => {
        const figure = document.createElement('figure');

        const blockquote = document.createElement('blockquote')
        blockquote.className = 'blockquote'

        const p = document.createElement('p')
        p.textContent = title
        blockquote.appendChild(p)

        const figcaption = document.createElement('figcaption')
        figcaption.className = 'blockquote-footer'
        figcaption.textContent = description

        figure.appendChild(blockquote)
        figure.appendChild(figcaption)
        div.appendChild(figure)


    })
    container.appendChild(titleFeeds)
    container.appendChild(div)
    return container
}

const createPostsElement = (posts, readPostIds) => {

    const titlePost = createTitle(i18n.t(`ui.posts`))

    const container = document.createElement('div');
    container.className = 'col-9';

    container.appendChild(titlePost);

    posts.forEach(({ link, title, id }) => {
        const div = document.createElement('div');
        div.className = 'bg-light p-2 px-3 d-flex align-items-center justify-content-between';
        

        const span = document.createElement('span');
        span.className = 'small';

        const a = document.createElement('a')
        a.href = link
        a.className = 'text-decoration-none text-primary'
        a.classList.add(readPostIds.includes(id) ? 'fw-normal' : 'fw-bold')
        a.textContent = title

        span.appendChild(a)

        const button = document.createElement('button');
        button.className = 'btn btn-secondary btn-sm px-3';
        button.textContent = i18n.t(`button.view`);
        button.dataset.id = id;

        button.dataset.href = link;

        div.appendChild(span)
        div.appendChild(button)

        container.appendChild(div);
    })

    container.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        e.preventDefault();
        handlePost(btn.dataset.id);
    });

    return container;
}

const createTitle = (text) => {
    const h3 = document.createElement('h3')
    h3.className = 'p-2 px-3'
    h3.textContent = text
    return h3
}

export const renderContent = () => {
    const { content } = getDomELements();
    const { feeds, posts, readPostIds } = snapshot(contentState)

    const divContent = document.createElement('div');
    divContent.className = 'row g-0'

    const postsElements = createPostsElement(posts, readPostIds)
    divContent.appendChild(postsElements)

    const feedElements = createFeedElement(feeds)
    divContent.appendChild(feedElements)

    const container = document.createElement('div');
    container.className = 'container-fluid px-0'

    container.appendChild(divContent)

    content.replaceChildren(container);
}