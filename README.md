# 🍽️ Food Lover — Premium Restaurant Landing Page

### A Modular, Performance-Optimised Web Application for Modern Food Businesses

> **Food Lover** is a feature-rich, fully responsive restaurant landing page built with vanilla HTML5, CSS3, and modular ES-module JavaScript, bundled with Webpack 5 and deployable to Vercel in minutes. It delivers a compelling digital presence for restaurants — complete with live countdowns, dynamic offer cards powered by a REST API, a Telegram-integrated contact form, an auto-playing image slider, and context-aware day-part scheduling — all without a single front-end framework dependency.

---

## 📋 Table of Contents

1. [Introduction of Project](#introduction-of-project)
2. [Technology Used](#technology-used)
3. [Minimum Hardware and Software Requirements](#minimum-hardware-and-software-requirements)
4. [Design and Coding](#design-and-coding)
5. [Output](#output)
6. [Future Work](#future-work)
7. [Conclusion](#conclusion)
8. [Setup and Run](#setup-and-run)

---

## Introduction of Project

The modern hospitality industry is increasingly dependent on a strong digital presence. Customers discover restaurants, browse menus, and make booking decisions almost entirely online before ever stepping through the door. Despite this reality, many small-to-medium food businesses lack the budget for bespoke web development agencies, while off-the-shelf website builders offer little control over performance, branding, or integrations.

**Food Lover** was created to bridge this gap. It is a fully handcrafted restaurant landing page that prioritises performance, clarity, and extensibility. The primary objective of the project is to demonstrate that a professional, interactive web experience can be constructed using only native web technologies — HTML, CSS, and JavaScript — without the overhead of heavyweight front-end frameworks like React or Angular.

The application solves several concrete problems for a restaurant business:

- **Discoverability**: A visually appealing, SEO-friendly static page that loads quickly and scores well in Core Web Vitals.
- **Offer promotion**: Dynamic offer cards fetched from a local REST API (`json-server`), with a graceful fallback mechanism ensuring the page never shows empty content even if the API is unavailable.
- **Customer engagement**: An urgency-driving countdown timer that directs visitors toward a promotional deadline, combined with a modal system for capturing attention at the right moment.
- **Lead generation**: A contact form that routes enquiries directly to a Telegram channel via the Bot API, providing instant notifications without a dedicated backend.
- **Content freshness**: A daytime-scheduling feature that highlights the correct meal period (Breakfast, Lunch, Dinner, or Dessert) based on the time of day.

The overall vision of the project is to serve as both a production-ready restaurant website template and a pedagogical reference implementation of clean, modular JavaScript architecture — demonstrating separation of concerns, reusable module exports, and a thoughtful build pipeline.

---

## Technology Used

Food Lover is built on a deliberately lean yet powerful technology stack. Every tool was chosen for a specific reason, and each integrates cleanly with the others.

**HTML5** forms the semantic backbone of the application. Semantic elements such as `<header>`, `<section>`, `<nav>`, `<article>`, and `<footer>` are used throughout `index.html`, improving both accessibility and search-engine indexing. Data attributes (`data-modal`, `data-tab`) are used as CSS-selector-safe hooks for JavaScript behaviour, keeping markup and logic cleanly decoupled.

**CSS3** handles all visual presentation in a single `style.css` file. CSS custom properties (variables), Flexbox, and CSS Grid are used to create a responsive layout that adapts gracefully from mobile to ultra-wide screens. CSS transitions and `transform`-based animations provide smooth user-interface feedback without JavaScript overhead. The single-file approach, combined with Webpack's `CopyWebpackPlugin`, ensures the stylesheet is served with optimal cache behaviour in production.

**JavaScript (ES Modules)** drives all interactive behaviour. The codebase is structured as a collection of self-contained feature modules, each exporting one or more pure initialisation functions. This architecture makes individual features independently testable and replaceable. `js/script.js` acts as a thin orchestration layer that imports every module and calls its initialiser in a deterministic sequence inside a `DOMContentLoaded` listener.

**Webpack 5** is the module bundler and development server. It resolves ES-module imports, tree-shakes dead code in production mode, and injects a content-hash fingerprint into the output bundle filename (`bundle.[contenthash:8].js`) for optimal long-term HTTP caching. `HtmlWebpackPlugin` automatically injects the hashed script tag into the output `index.html`, and `CopyWebpackPlugin` copies static assets (images, icons, stylesheet, favicon) to the `dist/` directory.

**json-server 0.17** provides a zero-configuration REST API backed by `db.json` during local development. This allows the offers module to fetch real JSON data over HTTP, simulating a production API contract without requiring a dedicated backend service.

**ESLint (flat config, `@eslint/js`)** enforces code quality. Two separate lint contexts are configured: browser globals and ES-module source type for frontend files, and Node.js globals with CommonJS source type for `webpack.config.js`. This prevents accidental misuse of environment-specific globals.

**Vercel** is used as the production deployment platform. A `vercel.json` configuration file specifies the build command (`npm run build`), the output directory (`dist`), and security response headers including `X-Content-Type-Options` and `Referrer-Policy`.

---

## Minimum Hardware and Software Requirements

### Development Environment

| Requirement | Minimum Specification |
|---|---|
| **Operating System** | Windows 10 (64-bit), macOS 11 Big Sur, or Ubuntu 20.04 LTS |
| **Processor** | Dual-core CPU at 1.6 GHz or faster |
| **RAM** | 4 GB (8 GB recommended for comfortable multi-terminal workflow) |
| **Disk Space** | 500 MB free (for `node_modules`, build artefacts, and assets) |
| **Node.js** | `>=18.0.0` and `<23.0.0` (enforced via `engines` field in `package.json`) |
| **npm** | `>=10.0.0` (managed via `packageManager: npm@10` field) |
| **Browser** | Any modern evergreen browser: Chrome 110+, Firefox 110+, Edge 110+, or Safari 16+ |
| **Code Editor** | Visual Studio Code (recommended) with ESLint and Prettier extensions |
| **Terminal** | Two concurrent terminal sessions required (one for `npm run dev`, one for `npm run api`) |
| **Internet** | Required for initial `npm install`; local development afterwards is fully offline-capable |

### Deployment / Production Environment

| Requirement | Specification |
|---|---|
| **Hosting Platform** | Vercel (free tier sufficient), or any static web host (Netlify, GitHub Pages, S3 + CloudFront) |
| **Build Runtime** | Node.js 18–22 on the CI/CD host (Vercel provisions this automatically) |
| **Telegram Bot** | A valid Telegram Bot Token and target Chat ID for the contact form integration |
| **Network** | HTTPS-capable domain; Vercel provisions TLS certificates automatically |
| **Client Browser** | ES2017+ support required (`async/await`, `fetch`, `const/let`, ES modules) |

No database server, application server, or container runtime is required for production deployment. The application is a fully static bundle served directly from a CDN edge network.

---

## Design and Coding

### Architectural Pattern

Food Lover follows a **modular procedural architecture** — a deliberately simple pattern appropriate for a single-page application of this scale. Rather than adopting a full MVC framework, the codebase is organised around the **Single Responsibility Principle**: each JavaScript file in `js/modules/` is responsible for exactly one feature, and each exports a single `init*()` function as its public interface.

The entry point `js/script.js` acts as a **composition root**: it imports all modules, wires any inter-module dependencies (for example, passing `openModal` and `closeModal` callbacks from `modal.js` into `form.js`), and triggers initialisation in a predictable order after the DOM is ready.

```
DOMContentLoaded
  └── initTabs()
  └── initLoader()
  └── initTimer('.timer', '2026-04-01')
  └── initModal()   ──→ returns { openModal, closeModal }
  └── initOffers()
  └── initDaytime()
  └── initForm({ openModal, closeModal })
  └── initSlider()
```

This sequential, dependency-injected boot sequence makes the startup flow trivially readable and debuggable.

### Module Descriptions

- **`tabs.js`** — Manages the About section tab switcher. A single click listener on the tab container uses event delegation to activate the clicked tab and show its corresponding content panel, minimising DOM queries.
- **`loader.js`** — Hides the splash-screen loader overlay after a 1 500 ms timeout, providing a polished first-paint experience.
- **`timer.js`** — Calculates the remaining time to a configurable target date using `Date` arithmetic and updates the countdown display every second via `setInterval`. The interval is automatically cleared when the target is reached.
- **`modal.js`** — Implements open/close modal behaviour through CSS class toggling. Supports three dismissal methods: overlay click, `Escape` key, and programmatic `closeModal()` calls. Returns references to both control functions for dependency injection.
- **`offers.js`** — Attempts to `fetch()` offer data from `http://localhost:3000/offers`. In non-localhost environments (detected via `window.location.hostname`), or when the fetch fails, it falls back to inline data, guaranteeing that offer cards are always rendered.
- **`daytime.js`** — Maps a hardcoded schedule dataset to DOM cards for Breakfast, Lunch, Dinner, and Dessert using `Array.prototype.forEach` and direct DOM mutation.
- **`form.js`** — Intercepts the contact form's `submit` event, constructs a URL-encoded payload, and dispatches a `GET` request to the Telegram Bot API. Displays a success or failure modal based on the response status.
- **`slider.js`** — Controls a CSS `translateX`-driven image gallery. Tracks the current index, clamps it within bounds, and updates a `currentSlide / totalSlides` counter on each navigation event.

### UI/UX Design Philosophy

The visual design prioritises **content hierarchy** and **call-to-action clarity**. A full-viewport hero section with a prominent CTA button draws the user's eye immediately. Sections are visually separated with alternating background tones. Interactive elements (tabs, buttons, modal triggers) use clear hover states and transitions defined entirely in CSS to maintain a 60 fps animation budget. The slider uses hardware-accelerated `transform` rather than `left`/`top` positioning to avoid layout recalculation.

---

## Output

The compiled production output of Food Lover is a self-contained static website located in the `dist/` directory. It consists of a single `index.html`, a fingerprinted JavaScript bundle, a CSS stylesheet, all image assets, SVG icons, and a favicon.

**User Interface Experience:**

When a visitor lands on the page, a branded splash-screen loader is displayed for 1.5 seconds, creating a premium first impression. The loader fades away to reveal a full-width hero section with a high-quality restaurant image, a tagline, and a reservation CTA button. Below the hero, a live countdown timer creates urgency around an ongoing promotion.

The **Offers** section dynamically renders product cards — each showing a dish image, name, description, struck-through original price, and discounted sale price — fetched in real time from the `json-server` API during development, or from inline fallback data in production.

The **About** section uses a tab interface to organise restaurant information (story, team, philosophy) without overwhelming the visitor with scrollable content. The **Daytime** section displays relevant meal-period cards that help visitors quickly understand the restaurant's operational hours and specialities.

The **Contact** section presents a minimal two-field form (name and phone number). Upon submission, the data is dispatched to a Telegram bot, and the visitor receives immediate modal feedback — a success message on delivery, or a friendly error prompt if the network request fails.

The **Gallery** section features a smooth, horizontally-scrolling image slider with left/right navigation arrows and a live slide-position counter. A modal overlay is used for reservations and promotional announcements, which can be triggered by buttons or auto-opened after a configured delay to maximise conversion.

**Data Processing:** All API communication is handled client-side using the native `fetch` API with async/await. No cookies, sessions, or server-side state are involved, keeping the application stateless, fast, and trivially scalable.

---

## Future Work

Food Lover is a solid foundation with numerous natural pathways for growth:

1. **Backend API Migration**: Replace `json-server` with a production Node.js/Express or Python/FastAPI backend. Move Telegram credentials and any other secrets to server-side environment variables, eliminating the current client-side token exposure.

2. **Online Reservation System**: Integrate a full booking form with date/time pickers, party-size selection, and email confirmation. Connect to a database (PostgreSQL or MongoDB) to persist reservations.

3. **CMS Integration**: Connect the offers, daytime schedules, and gallery to a headless CMS (Contentful, Sanity, or Strapi), enabling non-technical restaurant staff to update content without touching code.

4. **Progressive Web App (PWA)**: Add a `manifest.json` and a Service Worker to enable offline access, home-screen installation on mobile devices, and background sync for form submissions made while offline.

5. **Internationalisation (i18n)**: Introduce a lightweight i18n layer to support multiple languages, making the template accessible to restaurants in non-English-speaking markets.

6. **Automated Testing**: Add unit tests for each module using Vitest or Jest, and end-to-end tests with Playwright to validate critical user journeys (page load, form submission, slider navigation).

7. **Performance Monitoring**: Integrate Web Vitals reporting and a Real User Monitoring (RUM) tool to track LCP, CLS, and FID scores in production, informing future optimisation work.

8. **Accessibility Audit**: Conduct a full WCAG 2.1 AA audit, adding ARIA attributes, keyboard focus management for the modal and slider, and sufficient colour contrast ratios throughout the design.

9. **Analytics**: Integrate a privacy-respecting analytics platform (Plausible or Fathom) to track visitor behaviour, conversion rates on the CTA buttons, and form submission rates.

10. **CI/CD Pipeline**: Add a GitHub Actions workflow that runs ESLint, executes the test suite, builds the project, and deploys automatically to Vercel on every push to `main`.

---

## Conclusion

Food Lover demonstrates that a professional, feature-rich web application does not require heavyweight frameworks or complex infrastructure. By combining the fundamentals — semantic HTML, expressive CSS, and modular JavaScript — with a thoughtful Webpack build pipeline and a zero-config deployment target (Vercel), the project achieves a production-quality result that is easy to understand, maintain, and extend.

The development process reinforced several important engineering principles. **Separation of concerns** — enforced through the module architecture — made it straightforward to develop, debug, and iterate on individual features in isolation. **Graceful degradation** — exemplified by the offers fallback mechanism — ensures a resilient user experience regardless of backend availability. **Security consciousness** — acknowledged in the Telegram token handling and the Vercel security headers — reflects the reality that even static sites have an attack surface worth thinking about.

From a pedagogical perspective, this project serves as a practical reference for developers learning how to structure a mid-complexity vanilla JavaScript application without reaching for a framework. The deliberate avoidance of React, Vue, or Angular forces engagement with the raw DOM API, the module system, and the event loop — knowledge that underpins all higher-level abstractions.

The project is actively maintained and welcomes contributions. Whether the next step is connecting a real CMS, migrating to a full-stack architecture, or converting to a PWA, Food Lover provides a clean, well-documented starting point that respects the developer's time and the end-user's experience.

---

## Setup and Run

### Prerequisites

- Node.js `>=18 <23`
- npm `>=10`

### Installation

```bash
npm install
```

### Development

Start the Webpack dev server and the local JSON API in separate terminals:

```bash
# Terminal 1 – frontend dev server at http://localhost:8080
npm run dev

# Terminal 2 – json-server API at http://localhost:3000
npm run api
```

Open `http://localhost:8080` in your browser.

### Production Build

```bash
npm run build
# Output: dist/
```

### Linting

```bash
npx eslint js/
```

---

## Vercel Deployment

1. Push the project to GitHub.
2. Import the repository in the [Vercel dashboard](https://vercel.com/new).
3. Set framework preset to **Other**.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy**.

`vercel.json` automatically configures security headers and clean URLs.

---

## Data Contract (`db.json`)

Each object in the `offers` array uses the following schema:

| Field | Type | Description |
|---|---|---|
| `src` | `string` | Relative path to the offer image |
| `alt` | `string` | Accessible alt text for the image |
| `title` | `string` | Offer display name |
| `descr` | `string` | Short description of the dish |
| `discount` | `number` | Original price (shown struck-through) |
| `sale` | `number` | Discounted sale price |

---

## Security Note

> ⚠️ The Telegram bot token and chat ID are currently embedded in the frontend JavaScript bundle. For any real production deployment, these credentials **must** be moved to a server-side environment (e.g., a Vercel Serverless Function) so they are never exposed to the browser.

---

## License

ISC © [Asilbek Karomatov](https://github.com/asilbek2706)
