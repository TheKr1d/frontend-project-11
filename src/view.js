import onChange from 'on-change';

const render = (state, elements, i18n) => onChange(state, (path, newValue) => {
  const feedbackCopy = elements.feedback;
  switch(path) {
    case 'error':
      elements.input.classList.add('is-invalid');
      feedbackCopy.textContent = newValue;
      elements.feedback.classList.remove('text-success');
      elements.feedback.classList.add('text-danger');
      break;
    case 'urlsList':
      elements.input.classList.remove('is-invalid');
      feedbackCopy.textContent = i18n.t('validRSS');
      elements.feedback.classList.remove('text-danger');
      elements.feedback.classList.add('text-success');
      elements.form.reset();
      elements.input.focus();
      break;
    case 'dataRSS.feeds':
      elements.feeds.textContent = '';
      const divCard = document.createElement('div');
      const cardBody = document.createElement('div');
      const h2 = document.createElement('h2');
      const ul = document.createElement('ul');

      divCard.classList.add('card', 'border-0');
      cardBody.classList.add('card-body');
      h2.classList.add('card-title', 'h4');
      h2.textContent = 'Фиды';
      ul.classList.add('list-group', 'border-0', 'rounded-0');

      newValue.forEach((el) => {
        const h3 = document.createElement('h3');
        const li = document.createElement('li');
        const p = document.createElement('p')

        li.classList.add('list-group-item', 'border-0', 'border-end-0')
        h3.classList.add('h6', 'm-0');
        h3.textContent = el.title;
        p.classList.add('m-0', 'small', 'text-black-50');
        p.textContent = el.description;
        li.append(h3, p);
        ul.append(li);
      })
      cardBody.append(h2);
      divCard.append(cardBody);
      elements.feeds.append(divCard, ul);
      break;
    case 'dataRSS.contents':
      elements.posts.textContent = '';
      const divPost = document.createElement('div');
      const divCardPost = document.createElement('div');
      const h2CardBody = document.createElement('h2');
      const ulPost = document.createElement('ul');

      divPost.classList.add('card', 'border-0');
      divCardPost.classList.add('card-body');
      h2CardBody.classList.add('card-title', 'h4');
      ulPost.classList.add('list-group', 'border-0', 'rounded-0');
      h2CardBody.textContent = 'Посты';
      newValue.forEach(({ items }) => {
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
          liCardBody.append(a, button);
          ulPost.append(liCardBody);
        })
      })
      divCardPost.append(h2CardBody);
      divPost.append(divCardPost, ulPost);
      elements.posts.append(divPost);
      break;
  }
});
export default render;
