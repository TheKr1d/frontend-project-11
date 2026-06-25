import { snapshot } from 'valtio/vanilla';
import { stateUI } from './state';
import { domElements } from './domELements';

export const render = () => {
    const {input, invalidFeedback} = domElements();

    const obj = snapshot(stateUI)
    
    if (obj.errors.length > 0) {
        input.classList.add('is-invalid')
        invalidFeedback.textContent = obj.errors.join(', ')
        invalidFeedback.style.display = 'block'
    } else {
        input.classList.remove('is-invalid')
        invalidFeedback.textContent = ''
        invalidFeedback.style.display = 'none'
        input.value = ''
        input.focus()
    }
};