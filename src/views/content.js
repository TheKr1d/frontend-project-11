import { snapshot } from 'valtio/vanilla';
import { contentState } from '../state';
import { getDomELements } from '../utils/getDomELements';
import { handlePost } from '../handles/handlePost';
import i18n from '../locales/index';

const createTitle = (text) => {
  const h3 = document.createElement('h3');
  h3.className = 'p-2 px-3';
  h3.textContent = text;
  return h3;
};

const createFeedElement = (feeds) => {
  const container = document.createElement('div');
  container.className = 'col-3';

  container.appendChild(createTitle(i18n.t('ui.feeds')));

  feeds.forEach(({ title, description }) => {
    const item = document.createElement('figure');
    item.className = 'p-2 px-3 mb-3';

    const feedTitle = document.createElement('p');
    feedTitle.className = 'mb-1 fw-bold';
    feedTitle.textContent = title;

    const figcaption = document.createElement('figcaption');
    figcaption.className = 'blockquote-footer mt-1';
    figcaption.textContent = description;

    item.append(feedTitle, figcaption);
    container.appendChild(item);
  });

  return container;
};

const createPostsElement = (posts, readPostIds) => {
  const container = document.createElement('div');
  container.className = 'col-9';

  container.appendChild(createTitle(i18n.t('ui.posts')));

  const list = document.createElement('ul');
  list.className = 'list-group';

  posts.forEach(({ link, title, id }) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center justify-content-between';

    const span = document.createElement('span');
    span.className = 'small';

    const a = document.createElement('a');
    a.href = link;
    a.className = `text-decoration-none text-primary ${readPostIds.includes(id) ? 'fw-normal' : 'fw-bold'}`;
    a.textContent = title;

    span.appendChild(a);

    const button = document.createElement('button');
    button.className = 'btn btn-secondary btn-sm px-3';
    button.textContent = i18n.t('button.view');
    button.dataset.id = id;
    button.dataset.href = link;

    li.append(span, button);
    list.appendChild(li);
  });

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    e.preventDefault();
    handlePost(btn.dataset.id);
  });

  container.appendChild(list);
  return container;
};

export const renderContent = () => {
  const { content } = getDomELements();
  const { feeds, posts, readPostIds } = snapshot(contentState);

  const wrapper = document.createElement('div');
  wrapper.className = 'container-fluid px-0';

  const row = document.createElement('div');
  row.className = 'row g-0';

  row.append(
    createPostsElement(posts, readPostIds),
    createFeedElement(feeds),
  );

  wrapper.appendChild(row);
  content.replaceChildren(wrapper);
};