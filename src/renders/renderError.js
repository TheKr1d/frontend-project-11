const renderError = (elements, textError, i18n) => {
  const feedbackCopy = elements.feedback;
  feedbackCopy.textContent = i18n.t(textError);
  if (!textError) {
    elements.input.classList.remove('is-invalid', 'is-valid');
  } else {
    elements.input.classList.add('is-invalid');
    elements.feedback.classList.remove('text-success');
    elements.feedback.classList.add('text-danger');
  }
};
export default renderError;
