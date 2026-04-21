const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
    console.log('🚀 Starting PDF generation process...');

    const browser = await puppeteer.launch({ 
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // 1. Scrape data from index.html
    const indexPath = 'file://' + path.resolve(__dirname, '../index.html');
    console.log(`📑 Loading index.html from: ${indexPath}`);
    await page.goto(indexPath, { waitUntil: 'networkidle0' });

    console.log('🔍 Scraping data...');
    const data = await page.evaluate(() => {
        const getText = (sel) => document.querySelector(sel)?.innerText.trim() || '';
        
        // Scraping Skills (Name only)
        const skills = Array.from(document.querySelectorAll('.skill')).map(el => {
            return {
                name: el.querySelector('.details span:first-child')?.innerText.trim(),
                level: el.querySelector('.details span:last-child')?.innerText.trim() || '0%'
            };
        });

        // Scraping Education
        const education = Array.from(document.querySelectorAll('.studyIcon')).map(el => ({
            school: el.querySelector('.schoolName')?.innerText.trim(),
            date: el.querySelector('.dateIcon p')?.innerText.trim(),
            title: el.querySelector('.title')?.innerText.trim()
        }));

        // Scraping Certifications
        const certs = Array.from(document.querySelectorAll('.certification')).map(el => ({
            name: el.querySelector('p')?.innerText.trim(),
            img: el.querySelector('img')?.src
        }));

        // Scraping Experience (Handle GFT, Cognizant, and Grouped ones like Minsait)
        const experience = Array.from(document.querySelectorAll('.timeline-container')).map(el => {
            const company = el.querySelector('.badge')?.innerText.trim();
            const date = el.querySelector('.timeline-date')?.innerText.trim();
            const job = el.querySelector('.timeline-job')?.innerText.trim();
            const desc = el.querySelector('.timeline-desc')?.innerHTML.trim();
            
            // Handle sub-roles (like Minsait/Tecnatom)
            const subRoles = Array.from(el.querySelectorAll('.timeline-role')).map(role => ({
                date: role.querySelector('.timeline-date')?.innerText.trim(),
                job: role.querySelector('.timeline-job')?.innerText.trim(),
                desc: role.querySelector('.timeline-desc')?.innerHTML.trim()
            }));

            return { company, date, job, desc, subRoles };
        });

        return {
            name: getText('.glitch-text'),
            title: getText('.titleText'),
            summary: Array.from(document.querySelectorAll('#aboutmeletter p:not(#galeryButton)'))
                .map(p => p.innerText.trim())
                .map(t => t.replace(/You can view my photography portfolio here:?|GitHub Profile|Photography Gallery/gi, ''))
                .filter(t => t.length > 0)
                .join('\n\n')
                .replace(/^Hello, I'm Gabriel\. /i, ''),
            skills,
            education,
            certs,
            experience,
            profileImg: document.querySelector('.introContainer img')?.src
        };
    });

    await browser.close();

    console.log('🛠️  Injecting data into template...');
    let template = fs.readFileSync(path.resolve(__dirname, '../cv-pdf-template.html'), 'utf8');

    // Helper functions to format HTML
    const formatSkills = (skills) => skills.map(s => `
        <div class="skill-item">
            <div class="skill-info">
                <span>${s.name}</span>
                <span class="skill-level">${s.level}</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: ${s.level}"></div>
            </div>
        </div>
    `).join('\n');
    
    const formatEducation = (edu) => edu.map(e => `
        <div class="edu-item">
            <div class="edu-school">${e.school}</div>
            ${e.title ? `<div class="edu-title">${e.title}</div>` : ''}
            <div class="edu-date">${e.date}</div>
        </div>
    `).join('\n');

    const formatCerts = (certs) => certs.map(c => `
        <div class="cert-item">
            <img src="${c.img}" alt="${c.name}">
            <span>${c.name}</span>
        </div>
    `).join('\n');

        <div class="exp-item">
            <div class="exp-header">
                <div>
                    <span class="exp-company">${e.company}</span>
                    <span class="exp-title"> — ${e.job}</span>
                </div>
                <div class="exp-date">${e.date}</div>
            </div>
            <div class="exp-desc">${e.desc}</div>
            ${e.subRoles.map(r => `
                <div class="role-subitem">
                    <div class="exp-header">
                        <div class="exp-title">${r.job}</div>
                        <div class="exp-date">${r.date}</div>
                    </div>
                    <div class="exp-desc">${r.desc}</div>
                </div>
            `).join('')}
        </div>
    `).join('\n');

    const formatSummary = (text) => text.split('\n\n').map(p => `<p>${p}</p>`).join('');

    // Pre-formatting contact info (hardcoded or extracted)
    const contactHtml = `
        <div class="contact-item"><i class="fa fa-envelope"></i> gabigarciagar@gmail.com</div>
        <div class="contact-item"><i class="fa fa-linkedin"></i> In/gabriel-garcia-garrido</div>
        <div class="contact-item"><i class="fa fa-github"></i> @Gaboxondo</div>
    `;

    // Global replacements
    const replacements = {
        '{{NAME}}': data.name,
        '{{TITLE}}': data.title,
        '{{SUMMARY}}': formatSummary(data.summary),
        '{{SKILLS}}': formatSkills(data.skills),
        '{{EDUCATION}}': formatEducation(data.education),
        '{{CERTIFICATIONS}}': formatCerts(data.certs),
        '{{EXPERIENCE}}': formatExperience(data.experience),
        '{{CONTACT}}': contactHtml,
        '{{PROFILE_IMG}}': data.profileImg,
        '{{DATE}}': new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    let resultHtml = template;
    for (const [key, value] of Object.entries(replacements)) {
        resultHtml = resultHtml.split(key).join(value);
    }

    const outputHtmlPath = path.resolve(__dirname, '../cv-pdf.html');
    fs.writeFileSync(outputHtmlPath, resultHtml);
    console.log(`✅  cv-pdf.html generated successfully.`);

    // 2. Generate PDF using Puppeteer on the generated HTML
    console.log('📄 Generating PDF from cv-pdf.html...');
    const browserPdf = await puppeteer.launch({ 
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const pagePdf = await browserPdf.newPage();
    const cvHtmlPath = 'file://' + outputHtmlPath;
    
    await pagePdf.goto(cvHtmlPath, { waitUntil: 'networkidle0' });
    
    await pagePdf.pdf({
        path: path.resolve(__dirname, '../Gabriel_Garcia_CV.pdf'),
        format: 'A4',
        printBackground: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });

    await browserPdf.close();
    console.log('🎉 Gabriel_Garcia_CV.pdf created successfully!');
}

generatePDF().catch(err => {
    console.error('❌ Error generating PDF:', err);
    process.exit(1);
});
