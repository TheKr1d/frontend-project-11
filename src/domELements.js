export const domElements = () => {
    return {
        form: document.querySelector('#rss-form'),
        input: document.querySelector('#rss-url'),
        content: document.querySelector('#content'),
        invalidFeedback: document.querySelector('#invalid-feedback'),
        submitBtn: document.getElementById('submit-btn'),
        btnSpinner: document.getElementById('btn-spinner'),
        btnText: document.getElementById('btn-text'),
    }
}