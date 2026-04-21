---
name: cv-sync
description: Reminds the agent to synchronize the PDF CV whenever the main index.html is modified.
---

# CV Synchronization Skill

This skill ensures that the professional PDF version of the CV (`Gabriel_Garcia_CV.pdf`) is always in sync with the web version (`index.html`).

## When to use

Whenever you make changes to `index.html` (adding skills, updating experience, changing contact info, etc.), you **MUST** run the synchronization script.

## How it Works

The generation process follows a **Single Source of Truth** architecture using `index.html` as the source and Puppeteer as the engine.

### 1. Data Scraping (Scraper)
The script `scripts/generate-pdf.js` launches a headless browser and opens `index.html`. It extracts the following data points using DOM selectors:
- **Profile**: Name (`.glitch-text`), Title (`.titleText`), Summary (`#aboutmeletter p`).
- **Skills**: All labels inside `.skill` blocks.
- **Experience**: Scrapes both simple and grouped roles from the `.timeline-container` structure.
- **Education & Certs**: Extracts info from `.studyIcon` and `.certification` containers.

### 2. Template Injection (Injector)
Once data is collected, the script loads **`cv-pdf-template.html`**. It performs a global search-and-replace of placeholders:
- `{{NAME}}`, `{{TITLE}}`, `{{SUMMARY}}`
- `{{EXPERIENCE}}`, `{{SKILLS}}`, `{{EDUCATION}}`, `{{CERTIFICATIONS}}`
- `{{CONTACT}}` and `{{PROFILE_IMG}}`

The result is saved as **`cv-pdf.html`**, which is the final visual representation using **`css/cv-pdf.css`**.

### 3. PDF Rendering (Generator)
Finally, Puppeteer opens the newly created `cv-pdf.html` and uses its Chromium print engine to generate **`Gabriel_Garcia_CV.pdf`** with A4 formatting, ensuring that all styles and fonts are correctly baked into the PDF.

## Maintenance

- **Changing Selectors**: If you change the CSS classes or the structure of `index.html`, you **must** update the `page.evaluate` section in `scripts/generate-pdf.js`.
- **Styling the PDF**: Modify `css/cv-pdf.css` to adjust the look and feel of the printed version without affecting the website.
- **Template Layout**: Modify `cv-pdf-template.html` to change the A4 structure (e.g., swapping columns).

## Commands

- **Install dependencies**: `npm install`
- **Generate PDF**: `node scripts/generate-pdf.js`
- **Verify HTML**: Open `cv-pdf.html` in a browser.

## Troubleshooting

- **Puppeteer errors**: If Puppeteer fails to launch, ensure Chromium is correctly installed by running `npm install`.
- **Missing data**: If some fields are empty in the PDF, check the CSS selectors in `scripts/generate-pdf.js` and ensure they match the structure of `index.html`.
