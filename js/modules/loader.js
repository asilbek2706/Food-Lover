export function initLoader(delay = 1500) {
    const loaderWrapper = document.querySelector('.loader-wrapper');

    if (!loaderWrapper) {
        return;
    }

    setTimeout(() => {
        loaderWrapper.style.display = 'none';
    }, delay);
}
