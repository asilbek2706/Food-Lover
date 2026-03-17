export function initForm({ openModal, closeModal }) {
    const form = document.querySelector('form');
    const telegramTokenBot = '8240386744:AAG8x4A-0lQMH5Rb8eMqS3zwSqz3HrOBPKM';
    const chatId = '6666505902';

    const message = {
        success: 'Thanks for contacting with us!',
        failure: 'Something went wrong',
    };

    if (!form) {
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const loader = document.createElement('div');
        loader.classList.add('loader', 'loader_center');
        form.append(loader);

        const formData = new FormData(form);

        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });

        fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: `Name: ${object.name}, Phone: ${object.phone}`,
            }),
        })
            .then(() => {
                showStatusMessage(message.success);
                form.reset();
            })
            .catch(() => showStatusMessage(message.failure))
            .finally(() => loader.remove());
    });

    function showStatusMessage(statusText) {
        const modalDialog = document.querySelector('.modal__dialog');

        if (!modalDialog) {
            return;
        }

        modalDialog.classList.add('hide');
        openModal();

        const statusModal = document.createElement('div');
        statusModal.classList.add('modal__dialog');
        statusModal.innerHTML = `
            <div class="modal__content">
                <div data-modal-close class="modal__close">&times;</div>
                <div class="modal__title">${statusText}</div>
            </div>
        `;

        const modal = document.querySelector('.modal');
        if (!modal) {
            return;
        }
        modal.append(statusModal);

        setTimeout(() => {
            statusModal.remove();
            modalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
}
