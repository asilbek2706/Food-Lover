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
        if (!this.parent) {
            return;
        }

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

const fallbackOffers = [
    {
        src: './img/offer1.png',
        alt: 'Quattro Pasta',
        title: 'Quattro Pasta',
        descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
        discount: 55,
        sale: 20,
    },
    {
        src: './img/offer2.png',
        alt: 'Vegertarian Pasta',
        title: 'Vegertarian Pasta',
        descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
        discount: 65,
        sale: 22,
    },
    {
        src: './img/offer3.png',
        alt: 'Gluten-Free Pasta',
        title: 'Gluten-Free Pasta',
        descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
        discount: 57,
        sale: 25,
    },
];

function renderOffers(data) {
    data.forEach((offer) => {
        const { src, alt, title, descr, discount, sale } = offer;
        new OfferMenu(src, alt, title, descr, discount, sale, '.offers-items').render();
    });
}

async function fetchLocalOffers(url, timeoutMs = 4000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(`Offers request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error('Offers response is not an array');
        }

        return data;
    } finally {
        clearTimeout(timeoutId);
    }
}

export async function initOffers() {
    const isLocalEnv =
        window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    // On hosted environments (e.g. Vercel), use fallback data unless a backend API is added.
    if (!isLocalEnv) {
        renderOffers(fallbackOffers);
        return;
    }

    try {
        const data = await fetchLocalOffers('http://localhost:3000/offers');
        renderOffers(data);
    } catch {
        renderOffers(fallbackOffers);
    }
}
