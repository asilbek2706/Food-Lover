function getTimeRemaining(endtime) {
    let days;
    let hours;
    let minutes;
    let seconds;

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
    }

    return number;
}

export function initTimer(selector, endtime) {
    const timer = document.querySelector(selector);

    if (!timer) {
        return;
    }

    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');

    if (!days || !hours || !minutes || !seconds) {
        return;
    }

    const timeInterval = setInterval(updateClock, 1000);

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
