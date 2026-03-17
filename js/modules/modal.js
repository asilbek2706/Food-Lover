export function initModal(timeout = 50000) {
    const modalOpenBtns = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal__content');

    if (!modal) {
        return {
            openModal: () => {},
            closeModal: () => {},
        };
    }

    let modalTimerId;

    function openModal() {
        if (modalContent) {
            modalContent.classList.add('modal_fade');
        }
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalOpenBtns.forEach((btn) => {
        btn.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-modal-close') === '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    modalTimerId = setTimeout(openModal, timeout);

    return {
        openModal,
        closeModal,
    };
}
