export const getDomELements = () => {
    return {
        form: document.querySelector('#rss-form'),
        input: document.querySelector('#rss-url'),
        content: document.querySelector('#content'),
        feedbackMessage: document.querySelector('#feedbackMessage'),
        submitBtn: document.getElementById('submit-btn'),
        btnSpinner: document.getElementById('btn-spinner'),
        btnText: document.getElementById('btn-text'),
        exampleModal: document.getElementById('modal'),
        modalTitle: document.getElementById('exampleModalLabel'),
        modalDescription: document.getElementById('modalDescription'),
        modalRead: document.getElementById('modal-read-all'),
    }
}