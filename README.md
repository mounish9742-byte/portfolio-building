# Mounish | Portfolio

A responsive, single-page portfolio for Mounish, built with React and Vite. It presents an introduction, skills, certifications, interactive project demos, and contact details, with animated 3D visuals rendered with Three.js.

## Requirements

- Node.js (an active LTS release is recommended)
- npm

## Getting started

From the project directory, install dependencies and start the development server:

```bash
npm install
npm run dev
```

Vite prints the local URL in the terminal, usually `http://localhost:5173/`. Open that address in your browser.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```text
.
├── assets/
│   └── images/           # Portfolio images
├── src/
│   ├── components/
│   │   └── ThreeComponents.jsx  # Three.js visual components
│   ├── App.jsx            # Portfolio sections and interactive demos
│   ├── index.css          # Tailwind directives and shared styles
│   └── main.jsx           # React application entry point
├── index.html             # HTML shell and page metadata
├── tailwind.config.js     # Tailwind theme configuration
└── vite.config.js         # Vite configuration
```

## Technology

- React 18
- Vite
- Tailwind CSS
- Three.js with React Three Fiber and Drei

## Customization

Portfolio content, including the introduction, skills, project examples, certifications, and contact details, is defined in `src/App.jsx`. Update the Tailwind theme in `tailwind.config.js` and shared styling in `src/index.css` to adjust the visual design.

The CMS/edit controls are client-side only; no authentication or database is configured. The contact form opens the visitor's email app with the message addressed to Mounish, and the visitor must press Send to deliver it. A WhatsApp link is also provided for direct messaging. Contact details are maintained in `src/App.jsx`.
