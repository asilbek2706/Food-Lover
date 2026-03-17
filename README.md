# Food Lover

A restaurant landing page project built with HTML, CSS, and vanilla JavaScript, bundled with Webpack.

## Features

- Responsive single-page restaurant layout.
- Tabs in the About section (Paris, London, Dubai, Moscow, Tashkent).
- Loader screen on initial page load.
- Countdown timer (currently set to `2026-04-01`).
- Modal window with open/close interactions:
    - Open via buttons with `data-modal`
    - Close via backdrop click
    - Close via `Esc`
    - Auto-open after timeout
- Dynamic offers rendering:
    - Fetches from `http://localhost:3000/offers` (json-server)
    - Falls back to local `fallbackOffers` if API is unavailable
- Daytime cards rendered from JavaScript data.
- Contact form submission to Telegram Bot API.
- Gallery slider with previous/next controls and counter.
- Webpack dev server with HMR.
- ESLint flat config for browser code + Node/CommonJS override for `webpack.config.js`.

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- Webpack 5
- Webpack Dev Server
- ESLint
- json-server

## Project Structure

```text
Loyiha-1/
  .git/
  .gitignore
  README.md
  db.json
  dist/                         # Build output (generated)
  eslint.config.mjs
  favicon.ico
  icons/
    left.svg
    right.svg
  img/
    about_img.png
    breckfastIcon.png
    contact.jpeg
    daytime_bg.jpeg
    dessertIcon.png
    dinnerIcon.png
    food1.png
    food2.png
    food3.png
    food4.png
    food5.png
    food6.png
    food7.jpeg
    food8.jpeg
    food9.jpeg
    food10.jpeg
    food11.jpeg
    food12.jpeg
    gallery1.jpeg
    gallery2.jpeg
    gallery3.jpeg
    gallery4.jpeg
    gallery5.jpeg
    gallery6.jpeg
    home_bg.jpeg
    logo.png
    lunchIcon.png
    offer-background.jpg
    offer1.png
    offer2.png
    offer3.png
  index.html
  js/
    script.js
  node_modules/                 # Dependencies (generated)
  package-lock.json
  package.json
  style.css
  webpack.config.js
```

## Scripts

Defined in `package.json`:

- `npm run dev`: Start Webpack dev server (`http://localhost:8080`).
- `npm run build`: Production build into `dist/`.
- `npm run watch`: Rebuild on file changes (without dev server).
- `npm run api`: Run json-server on port `3000` using `db.json`.

## Installation

```bash
npm install
```

## Run (Recommended)

Use two terminals:

1. Start frontend:

```bash
npm run dev
```

2. Start local API for offers:

```bash
npm run api
```

Then open `http://localhost:8080`.

## Data Source

- `db.json` currently provides:
    - `offers[]` with `src`, `alt`, `title`, `descr`, `discount`, `sale`.

## Build Output

Webpack outputs to `dist/`:

- `index.html` (generated from template)
- `js/bundle.[contenthash:8].js`
- copied static assets:
    - `style.css`
    - `img/`
    - `icons/`
    - `favicon.ico`

## Configuration Files

- `webpack.config.js`
    - Entry: `./js/script.js`
    - Output: `dist/js/bundle.[contenthash:8].js`
    - Plugins:
        - `HtmlWebpackPlugin`
        - `CopyWebpackPlugin`
    - Dev server:
        - Port `8080`
        - `open: true`
        - `hot: true`

- `eslint.config.mjs`
    - Base JS recommended rules
    - Browser globals for frontend files
    - Node globals + CommonJS source type for `webpack.config.js`

## Notes

- If `json-server` is not running, offers still render from fallback data in `js/script.js`.
- The contact form uses Telegram API credentials directly in frontend code. For production, move secrets to a backend service.
- Large images may trigger Webpack performance warnings; this does not stop build execution.

## Quick Troubleshooting

- If `npm run dev` fails, run:

```bash
npm install
```

- If offers are empty, run:

```bash
npm run api
```

- If port conflicts occur:
    - change `devServer.port` in `webpack.config.js`
    - or stop process using the same port.
