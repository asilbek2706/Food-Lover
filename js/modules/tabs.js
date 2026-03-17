export function initTabs() {
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabContents = document.querySelectorAll('.tab_content');
    const tabParents = document.querySelector('.tabheader__items');

    if (!tabs.length || !tabContents.length || !tabParents) {
        return;
    }

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
        if (!tabContents[index] || !tabs[index]) {
            return;
        }

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
}
