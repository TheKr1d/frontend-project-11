import { snapshot } from 'valtio/vanilla';
import { stateUI } from './state';
import { domElements } from './domELements';
import i18n from './locales/index.js';


export const render = () => {
    const {input, invalidFeedback} = domElements();

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
};