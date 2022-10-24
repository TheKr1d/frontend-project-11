const renderSuccessfulDonwload = (elements, textValid, i18n) => {
  const feedbackCopy = elements.feedback;
  elements.input.classList.remove('is-invalid');
  feedbackCopy.textContent = i18n.t(textValid);
  elements.feedback.classList.remove('text-danger');
  elements.feedback.classList.add('text-success');
  elements.form.reset();
  elements.input.focus();
};

export default renderSuccessfulDonwload;
