export const domElements = () => {
    return {
        form: document.querySelector('#rss-form'),
        input: document.querySelector('#rss-url'),
        content: document.querySelector('#content'),
        invalidFeedback: document.querySelector('#invalid-feedback')
    }
}