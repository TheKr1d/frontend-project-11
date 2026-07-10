import { snapshot } from 'valtio/vanilla';
import { modalState } from '../state';
import { getDomELements } from '../utils/getDomELements';
import { Modal } from 'bootstrap';
import i18n from '../locales/index';

export const renderModal = () => {
    const { isOpen, title, link } = snapshot(modalState)
    if (!isOpen) return
    const { exampleModal, modalTitle, modalDescription, modalRead } = getDomELements();

    const modal = new Modal(exampleModal);

    modalTitle.textContent = title
    modalDescription.innerHTML = i18n.t('modal.description');

    modalRead.addEventListener('click', (e2) => {
        e2.preventDefault()

        window.open(link, '_blank', 'noopener');
    })

    modal.show()
}