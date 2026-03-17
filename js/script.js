import { initTabs } from './modules/tabs';
import { initLoader } from './modules/loader';
import { initTimer } from './modules/timer';
import { initModal } from './modules/modal';
import { initOffers } from './modules/offers';
import { initDaytime } from './modules/daytime';
import { initForm } from './modules/form';
import { initSlider } from './modules/slider';

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initLoader();
    initTimer('.timer', '2026-04-01');

    const { openModal, closeModal } = initModal();

    initOffers();
    initDaytime();
    initForm({ openModal, closeModal });
    initSlider();
});
