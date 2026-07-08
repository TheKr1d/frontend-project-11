import { snapshot } from 'valtio/vanilla';
import { stateUI } from './state';
import { domElements } from './domELements.js';
import { Modal } from 'bootstrap';
import i18n from './locales/index.js';
import DOMPurify from 'dompurify';

const renderErrorsUrl = (errors) => {
    const { input, invalidFeedback } = domElements();

    input.classList.add('is-invalid')
    const errorMessages = errors.map(error => i18n.t(`errorMessages.validator.${error}`))
    invalidFeedback.textContent = errorMessages.join(', ')
    invalidFeedback.classList = 'invalid-feedback'
    invalidFeedback.style.display = 'block'
}

const renderSetErrorsUrl = () => {
    const { input, invalidFeedback } = domElements();
    input.classList.remove('is-invalid')
    invalidFeedback.textContent = ''
    invalidFeedback.classList = ''
    invalidFeedback.style.display = 'none'
    input.value = ''
    input.focus()
}

const renderSucces = () => {
    const { input, invalidFeedback } = domElements();
    input.classList.add('is-valid')
    input.classList.remove('is-invalid')
    invalidFeedback.textContent = i18n.t('button.rssSucces')
    invalidFeedback.style.display = 'block'
    invalidFeedback.classList = 'valid-feedback'
    input.value = ''
    input.focus()
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

    posts.forEach(({ link, title, description }) => {
        const div = document.createElement('div');
        div.className = 'bg-light p-2 px-3 d-flex align-items-center justify-content-between fw-bold';

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

        button.dataset.href = link;

        button.addEventListener('click', (e) => {
            e.preventDefault()
            div.classList.replace('fw-bold', 'fw-normal')
            const { exampleModal, modalTitle, modalDescription, modalReed } = domElements();
            const modal = new Modal(exampleModal);

            modalTitle.textContent = title
            modalDescription.innerHTML = DOMPurify.sanitize(description);

            modalReed.addEventListener('click', (e2) => {
                e2.preventDefault()

                window.open(link, '_blank', 'noopener');
            })
            
            
            modal.show()
        });

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

    const divContent = document.createElement('div');
    divContent.className = 'row g-0'

    const postsElements = createPostsElement(posts)
    divContent.appendChild(postsElements)

    const feedElements = createFeedElement(feeds)
    divContent.appendChild(feedElements)

    const container = document.createElement('div');
    container.className = 'container-fluid px-0'

    container.appendChild(divContent)

    content.replaceChildren(container);
}

const setButtonLoading = (isLoading = true) => {
    const { btnSpinner, btnText, submitBtn } = domElements()
    if (isLoading) {
        btnSpinner.classList.remove('d-none');
        btnText.textContent = 'Загрузка...';
        submitBtn.disabled = true;
    } else {
        btnSpinner.classList.add('d-none');
        btnText.textContent = 'Добавить';
        submitBtn.disabled = false;
    }
}

export const renderUi = () => {
    const {
        state,
        errors,
        content
    } = snapshot(stateUI)

    switch (state) {
        case 'loading': {
            setButtonLoading(true)
            break;
        }

        case 'failed': {
            setButtonLoading(false)
            renderErrorsUrl(errors)
            break;
        }

        case 'processed': {
            setButtonLoading(true)
            break;
        }

        case 'uploaded': {
            const { feeds, posts } = content
            setButtonLoading(false)
            renderSetErrorsUrl()
            renderSucces()
            renderContent(feeds, posts)

            break;
        }

    }
}