import onChange from 'on-change';

const renderError = (elements, textError) => {
  const feedbackCopy = elements.feedback;
  elements.input.classList.add('is-invalid');
  feedbackCopy.textContent = textError;
  elements.feedback.classList.remove('text-success');
  elements.feedback.classList.add('text-danger');
};
const renderSuccessfulDonwload = (elements, textValid) => {
  const feedbackCopy = elements.feedback;
  elements.input.classList.remove('is-invalid');
  feedbackCopy.textContent = textValid;
  elements.feedback.classList.remove('text-danger');
  elements.feedback.classList.add('text-success');
  elements.form.reset();
  elements.input.focus();
};
const renderFeeds = (elements, arrFeeds) => {
  const copyFeeds = elements.feeds;
  copyFeeds.textContent = '';
  const divCard = document.createElement('div');
  const cardBody = document.createElement('div');
  const h2 = document.createElement('h2');
  const ul = document.createElement('ul');

  divCard.classList.add('card', 'border-0');
  cardBody.classList.add('card-body');
  h2.classList.add('card-title', 'h4');
  h2.textContent = 'Фиды';
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  arrFeeds.forEach((el) => {
    const h3 = document.createElement('h3');
    const li = document.createElement('li');
    const p = document.createElement('p');

    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    h3.classList.add('h6', 'm-0');
    h3.textContent = el.title;
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = el.description;
    li.append(h3, p);
    ul.append(li);
  });
  cardBody.append(h2);
  divCard.append(cardBody);
  elements.feeds.append(divCard, ul);
};
const renderContens = (elements, arrContents) => {
  const copyPosts = elements.posts;
  copyPosts.textContent = '';
  const divPost = document.createElement('div');
  const divCardPost = document.createElement('div');
  const h2CardBody = document.createElement('h2');
  const ulPost = document.createElement('ul');

  divPost.classList.add('card', 'border-0');
  divCardPost.classList.add('card-body');
  h2CardBody.classList.add('card-title', 'h4');
  ulPost.classList.add('list-group', 'border-0', 'rounded-0');
  h2CardBody.textContent = 'Посты';
  arrContents.forEach(({ items }) => {
    items.forEach((el) => {
      const liCardBody = document.createElement('li');
      const a = document.createElement('a');
      const button = document.createElement('button');
      liCardBody.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.setAttribute('type', 'buttom');
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#modal');
      button.textContent = 'Просмотр';
      a.classList.add('fw-bold');
      a.setAttribute('href', el.querySelector('link').textContent);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.textContent = el.querySelector('title').textContent;
      button.addEventListener('click', (e) => {
        e.preventDefault();
        elements.body.classList.add('modal-open');
        elements.body.setAttribute('style', 'overflow: hidden; padding-right: 0px;');
        elements.modal.classList.add('show');
        elements.modal.setAttribute('style', 'display: block;');
        elements.modal.removeAttribute('aria-hidden');
        elements.modal.setAttribute('aria-modal', 'true');
        elements.modal.setAttribute('role', 'dialog');
        const copyModalTitle = elements.modalTitle;
        const copyModalBody = elements.modalBody;
        copyModalTitle.textContent = el.querySelector('title').textContent;
        copyModalBody.textContent = el.querySelector('description').textContent;
        elements.btnPrimary.setAttribute('href', el.querySelector('link').textContent);
      });
      elements.btnClose.addEventListener('click', (e) => {
        e.preventDefault();
        elements.body.classList.remove('modal-open');
        elements.body.removeAttribute('style');
        elements.modal.classList.remove('show');
        elements.modal.setAttribute('style', 'display: none;');
        elements.modal.removeAttribute('aria-modal');
        elements.modal.setAttribute('aria-hidden', 'true');
        elements.modal.removeAttribute('role');
      });
      elements.btnSecondary.addEventListener('click', (e) => {
        e.preventDefault();
        elements.body.classList.remove('modal-open');
        elements.body.removeAttribute('style');
        elements.modal.classList.remove('show');
        elements.modal.setAttribute('style', 'display: none;');
        elements.modal.removeAttribute('aria-modal');
        elements.modal.setAttribute('aria-hidden', 'true');
        elements.modal.removeAttribute('role');
      });
      liCardBody.append(a, button);
      ulPost.append(liCardBody);
    });
  });
  divCardPost.append(h2CardBody);
  divPost.append(divCardPost, ulPost);
  elements.posts.append(divPost);
};
const render = (state, elements, i18n) => onChange(state, (path, newValue) => {
  switch (path) {
    case 'error':
      renderError(elements, newValue);
      return;
    case 'urlsList':
      renderSuccessfulDonwload(elements, i18n.t('validRSS'));
      return;
    case 'dataRSS.feeds':
      renderFeeds(elements, newValue);
      return;
    case 'dataRSS.contents':
      renderContens(elements, newValue);
      return;
    default:
      console.log(new Error(`Error state: ${path}`));
  }
});
export default render;
