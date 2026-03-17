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

export function initOffers() {
    fetch('http://localhost:3000/offers', {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Offers request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then((data) => renderOffers(data))
        .catch(() => {
            renderOffers(fallbackOffers);
        });
}
