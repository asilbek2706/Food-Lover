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
        if (!this.parent) {
            return;
        }

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

export function initDaytime() {
    items.forEach((item) => {
        const { src, alt, title, start, end } = item;
        new DayTime(src, alt, title, start, end, '.daytime-items').render();
    });
}
