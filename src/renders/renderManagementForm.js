const renderManagementForm = (elements, state) => {
  switch (state) {
    case 'edit':
      elements.containerSubmit.removeAttribute('disabled');
      elements.input.removeAttribute('disabled');
      return;
    case 'send':
      elements.containerSubmit.setAttribute('disabled', 'true');
      elements.input.setAttribute('disabled', 'true');
      return;
    default:
      throw Error(`Unknown state: ${state}`);
  }
};
export default renderManagementForm;
