const renderError = (elements, textError) => {
  const feedbackCopy = elements.feedback;
  elements.input.classList.add('is-invalid');
  feedbackCopy.textContent = textError;
  elements.feedback.classList.remove('text-success');
  elements.feedback.classList.add('text-danger');
};
export default renderError;
