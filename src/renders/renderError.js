const renderError = (elements, textError) => {
  const feedbackCopy = elements.feedback;
  feedbackCopy.textContent = textError;
  if (!textError) {
    elements.input.classList.remove('is-invalid', 'is-valid');
  } else {
    elements.input.classList.add('is-invalid');
    elements.containerSubmit.removeAttribute('disabled');
    elements.input.removeAttribute('disabled');
    elements.feedback.classList.remove('text-success');
    elements.feedback.classList.add('text-danger');
  }
};
export default renderError;
