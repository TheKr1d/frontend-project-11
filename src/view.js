import onChange from 'on-change';

const change = (state, elements, i18n) => onChange(state, (path, newValue) => {
  const feedbackCopy = elements.feedback;
  if (path === 'error') {
    if (newValue === '') {
      elements.input.classList.remove('is-invalid');
      feedbackCopy.textContent = i18n.t('validRSS');
      elements.feedback.classList.remove('text-danger');
      elements.feedback.classList.add('text-success');
    } else {
      elements.input.classList.add('is-invalid');
      feedbackCopy.textContent = newValue;
      elements.feedback.classList.remove('text-success');
      elements.feedback.classList.add('text-danger');
    }
  }
});
export default change;
