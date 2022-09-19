const renderSuccessfulDonwload = (elements, textValid) => {
  const feedbackCopy = elements.feedback;
  elements.input.classList.remove('is-invalid');
  feedbackCopy.textContent = textValid;
  elements.feedback.classList.remove('text-danger');
  elements.feedback.classList.add('text-success');
  elements.containerInput.removeAttribute('disabled');
  elements.form.reset();
  elements.input.focus();
};

export default renderSuccessfulDonwload;
