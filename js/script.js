'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabContents = document.querySelectorAll('.tab_content'),
        tabParents = document.querySelector('.tabheader__items');

    function hideTabContents() {
        tabContents.forEach((tabContent) => {
            tabContent.classList.add('hide');
            tabContent.classList.remove('show');
        });

        tabs.forEach((tab) => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(index = 0) {
        tabContents[index].classList.add('show', 'fade');
        tabContents[index].classList.remove('hide');
        tabs[index].classList.add('tabheader__item_active');
    }

    hideTabContents();
    showTabContent();

    tabParents.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, index) => {
                if (target === tab) {
                    hideTabContents();
                    showTabContent(index);
                }
            });
        }
    });

    // Loader
    const loaderWrapper = document.querySelector('.loader-wrapper');

    setTimeout(() => {
        loaderWrapper.style.display = 'none';
    }, 1500);

    // Timer
    const deadline = '2026-04-01';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const time = Date.parse(endtime) - Date.parse(new Date());

        if (time <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(time / (1000 * 60 * 60 * 24));
            hours = Math.floor((time / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((time / (1000 * 60)) % 60);
            seconds = Math.floor((time / 1000) % 60);
        }

        return {
            totalTime: time,
            days,
            hours,
            minutes,
            seconds,
        };
    }

    function formatNumber(number) {
        if (number >= 0 && number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const time = getTimeRemaining(endtime);

            days.textContent = formatNumber(time.days);
            hours.textContent = formatNumber(time.hours);
            minutes.textContent = formatNumber(time.minutes);
            seconds.textContent = formatNumber(time.seconds);

            if (time.totalTime <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal
    const modalOpenBtns = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalContent = document.querySelector('.modal__content');

    function openModal() {
        modalContent.classList.add('modal_fade');
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
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

    const modalTimerId = setTimeout(openModal, 50000);

    // Class
    class OfferMenu {
        constructor(src, alt, title, descr, discount, sale, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.discount = discount;
            this.sale = sale;
            this.parent = document.querySelector(parentSelector);
            this.formatToUSD();
        }

        formatToUSD() {
            this.discount = this.discount.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            this.sale = this.sale.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <img src='${this.src}' alt="${this.alt}">
                <div>
                  <h3>${this.title}</h3>
                  <p>${this.descr}</p>
                  <p><del>${this.discount}</del> <span class="primary-text">${this.sale}</span></p>
                </div>
            `;

            this.parent.append(element);
        }
    }

    fetch('http://localhost:3000/offers', {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    })
        .then((response) => response.json())
        .then((data) => {
            data.forEach((offer) => {
                const { src, alt, title, descr, discount, sale } = offer;
                new OfferMenu(src, alt, title, descr, discount, sale, '.offers-items').render();
            });
        });

    // const offers = [
    //     {
    //         src: './img/offer1.png',
    //         alt: 'Quattro Pasta',
    //         title: 'Quattro Pasta',
    //         descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
    //         discount: 55,
    //         sale: 20,
    //     },
    //     {
    //         src: './img/offer2.png',
    //         alt: 'Vegertarian Pasta',
    //         title: 'Vegertarian Pasta',
    //         descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
    //         discount: 65,
    //         sale: 22,
    //     },
    //     {
    //         src: './img/offer3.png',
    //         alt: 'Gluten-Free Pasta',
    //         title: 'Gluten-Free Pasta',
    //         descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
    //         discount: 57,
    //         sale: 25,
    //     },
    // ];

    class DayTime {
        constructor(src, alt, title, start, end, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.start = start;
            this.end = end;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement('div');

            let timeDisplay;
            if (this.start === 'All' && this.end === 'day') {
                timeDisplay = 'All day';
            } else {
                timeDisplay = `${this.start} to ${this.end}`;
            }

            element.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3>${this.title}</h3>
                <p>${timeDisplay}</p>
            `;
            this.parent.append(element);
        }
    }

    const items = [
        {
            src: './img/breckfastIcon.png',
            alt: 'Breakfast',
            title: 'Breakfast',
            start: '4 am',
            end: '8 am',
        },
        {
            src: './img/lunchIcon.png',
            alt: 'Lunch',
            title: 'Lunch',
            start: '4 pm',
            end: '7 pm',
        },
        {
            src: './img/dinnerIcon.png',
            alt: 'Dinner',
            title: 'Dinner',
            start: '9 pm',
            end: '1 am',
        },
        {
            src: './img/dessertIcon.png',
            alt: 'dessert',
            title: 'Dessert',
            start: 'All',
            end: 'day',
        },
    ];

    items.forEach((item) => {
        const { src, alt, title, start, end } = item;
        new DayTime(src, alt, title, start, end, '.daytime-items').render();
    });

    // Form
    const form = document.querySelector('form'),
        telegramTokenBot = '8240386744:AAG8x4A-0lQMH5Rb8eMqS3zwSqz3HrOBPKM',
        chatId = '6666505902';

    const message = {
        loading: 'Loading...',
        success: 'Thanks for contacting with us!',
        failure: 'Something went wrong',
    };

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

    function showStatusMessage(message) {
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide');
        openModal();

        const statusModal = document.createElement('div');
        statusModal.classList.add('modal__dialog');
        statusModal.innerHTML = `
            <div class="modal__content">
                <div data-modal-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(statusModal);

        setTimeout(() => {
            statusModal.remove();
            modalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
});
