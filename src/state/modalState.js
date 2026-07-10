import { proxy } from 'valtio/vanilla';

export const modalState = proxy({
  isOpen: false,
  title: '',
  description: '',
  link: '',
  postId: null,
});

export const openPreviewModal = (post) => {
  Object.assign(modalState, {
    isOpen: true,
    title: post.title,
    description: post.description,
    link: post.link,
    postId: post.id,
  });
};

export const closePreviewModal = () => {
  Object.assign(modalState, {
    isOpen: false,
    title: '',
    description: '',
    link: '',
    postId: null,
  });
};