import onChange from 'on-change';

const change = (state, elements) => onChange(state, (path, newValue) => {
  if (path === 'error') {
    const feedbackCopy = elements.feedback;
    if (newValue === '') {
      elements.input.classList.remove('is-invalid');
      feedbackCopy.textContent = 'RSS успешно загружен';
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
