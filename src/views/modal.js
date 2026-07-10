import { snapshot } from 'valtio/vanilla';
import { modalState } from '../state';
import { getDomELements } from '../utils/getDomELements';
import { Modal } from 'bootstrap';
import DOMPurify from 'dompurify';

export const renderModal = () => {
    const { isOpen, title, description, link } = snapshot(modalState)
    if (!isOpen) return
    const { exampleModal, modalTitle, modalDescription, modalReed } = getDomELements();

    const modal = new Modal(exampleModal);

    modalTitle.textContent = title
    modalDescription.innerHTML = DOMPurify.sanitize(description);

    modalReed.addEventListener('click', (e2) => {
        e2.preventDefault()

        window.open(link, '_blank', 'noopener');
    })

    modal.show()
}