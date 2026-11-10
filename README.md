# laurenmaeespinar

Portfolio of Lauren Mae Espinar: web developer with full-stack, AI integration and QA experience.

Live site: https://superwowers.github.io/laurenmaeespinar/

## Stack

React 19, Vite 6 and Tailwind CSS 3, with a hand-written glass-style theme in `src/pf.css`.

## Run locally

```bash
npm install
npm run dev      # development server
npm run build    # production build in dist/
npm run preview  # preview the production build
```

## Structure

```
src/
├── App.jsx                 layout, theme switch, scroll spy
├── pf.css                  glass theme (light and dark) and responsive rules
├── data/portfolioData.js   all text, links, projects, tech stack and gallery
└── components/             Sidebar, Hero, HowItWorks, Projects, TechStack, About, Contact
public/images/              photos and project screenshots
```

To change any content (projects, tech stack, captions, links), edit `src/data/portfolioData.js`.

## Deployment

The site is hosted on GitHub Pages from the `gh-pages` branch of `superwowers/laurenmaeespinar`.

```bash
npm run deploy   # builds the site and publishes dist/ to gh-pages
```
