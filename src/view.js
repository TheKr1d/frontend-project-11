import { snapshot } from 'valtio/vanilla';
import { stateUI } from './state';
import { domElements } from './domELements';
import i18n from './locales/index.js';

const renderErrorsUrl = () => {
    const { input, invalidFeedback } = domElements();

    const obj = snapshot(stateUI)

    if (obj.errors.length > 0) {
        input.classList.add('is-invalid')
        const errorMessages = obj.errors.map(error => i18n.t(`errorMessages.validator.${error}`))
        invalidFeedback.textContent = errorMessages.join(', ')
        invalidFeedback.style.display = 'block'
    } else {
        input.classList.remove('is-invalid')
        invalidFeedback.textContent = ''
        invalidFeedback.style.display = 'none'
        input.value = ''
        input.focus()
    }
}

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
        p.textContent = description
        blockquote.appendChild(p)

        const figcaption = document.createElement('figcaption')
        figcaption.className = 'blockquote-footer'
        figcaption.textContent = title

        figure.appendChild(blockquote)
        figure.appendChild(figcaption)
        div.appendChild(figure)


    })
    container.appendChild(titleFeeds)
    container.appendChild(div)
    return container
}

const createPostsElement = (posts) => {

    const titlePost = createTitle(i18n.t(`ui.posts`))

    const container = document.createElement('div');
    container.className = 'col-9';

    container.appendChild(titlePost);

    posts.forEach(({ link, title }) => {
        const div = document.createElement('div');
        div.className = 'bg-light p-2 px-3 d-flex align-items-center justify-content-between';

        const span = document.createElement('span');
        span.className = 'small';

        const a = document.createElement('a')
        a.href = link
        a.className = 'text-decoration-none text-primary'
        a.textContent = title

        span.appendChild(a)

        const button = document.createElement('button');
        button.className = 'btn btn-secondary btn-sm px-3';
        button.textContent = i18n.t(`button.view`);

        div.appendChild(span)
        div.appendChild(button)

        container.appendChild(div);
    })

    return container;
}

const createTitle = (text) => {
    const h3 = document.createElement('h3')
    h3.className = 'p-2 px-3'
    h3.textContent = text
    return h3
}

const renderContent = (feeds, posts) => {
    const { content } = domElements();
    const { input, invalidFeedback } = domElements();

    const divContent = document.createElement('div');
    divContent.className = 'row g-0'

    const postsElements = createPostsElement(posts)
    divContent.appendChild(postsElements)

    const feedElements = createFeedElement(feeds)
    divContent.appendChild(feedElements)

    const container = document.createElement('div');
    container.className = 'container-fluid px-0'

    container.appendChild(divContent)

    content.textContent = ''
    content.appendChild(container)
}

export const render = () => {
    renderErrorsUrl()

    const { content: { feeds, posts } } = snapshot(stateUI)
    if (posts.length > 0) {
        renderContent(feeds, posts)
    }
};