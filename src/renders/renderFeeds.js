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

export default renderFeeds;
