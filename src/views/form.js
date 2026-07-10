import { snapshot } from 'valtio/vanilla';
import { formState } from '../state';
import i18n from '../locales/index';
import { getDomELements } from '../utils/getDomELements';

const clearFeedback = () => {
    const { input, feedbackMessage } = getDomELements();
    input.classList.remove('is-invalid', 'is-valid')
    feedbackMessage.textContent = ''
    feedbackMessage.classList = ''
    feedbackMessage.style.display = 'none'
}

const renderErrorsUrl = (error) => {
    clearFeedback()
    const { input, feedbackMessage } = getDomELements();
    input.classList.add('is-invalid')
    const errorMessage = i18n.t(`errorMessages.validator.${error}`)
    feedbackMessage.textContent = errorMessage
    feedbackMessage.classList = 'invalid-feedback'
    feedbackMessage.style.display = 'block'
}

const renderValidFeedback = () => {
    clearFeedback()
    const { input, feedbackMessage } = getDomELements();
    input.classList.add('is-valid')
    input.classList.remove('is-invalid')
    feedbackMessage.textContent = i18n.t('button.rssSucces')
    feedbackMessage.style.display = 'block'
    feedbackMessage.classList = 'valid-feedback'
    input.value = ''
    input.focus()
}

const setButtonLoading = (isLoading) => {
    const { btnSpinner, btnText, submitBtn } = getDomELements()
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

export const renderForm = () => {
    const { state, error } = snapshot(formState)
    switch (state) {
        case 'failed': {
            setButtonLoading(false)
            renderErrorsUrl(error)
            break;
        }
        case 'uploaded': {
            setButtonLoading(false)
            renderValidFeedback()
            break;
        }
        case 'loaded': {
            setButtonLoading(true)
            break;
        }
        default:
            return;
    }
}