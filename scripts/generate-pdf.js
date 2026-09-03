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
        
        // Scraping Skills (Name and Percentages)
        const skills = Array.from(document.querySelectorAll('.accordion')).map(acc => {
            const category = acc.innerText.trim();
            const panel = acc.nextElementSibling;
            const itemData = Array.from(panel.querySelectorAll('.skill')).map(item => {
                const name = item.querySelector('.details span:first-child')?.innerText.trim();
                const pctText = item.querySelector('.details span:last-child')?.innerText.trim() || '0%';
                const pct = parseInt(pctText.replace('%', ''));
                return { name, pct };
            });
            // Keep sorting by pct within each category
            itemData.sort((a, b) => b.pct - a.pct);
            return { category, skills: itemData };
        });

        // Scraping Education (filtering out items marked with .pdf-hide)
        const education = Array.from(document.querySelectorAll('.studyIcon:not(.pdf-hide)')).map(el => ({
            school: el.querySelector('.schoolName')?.innerText.trim(),
            date: el.querySelector('.dateIcon p')?.innerText.trim(),
            title: el.querySelector('.title')?.innerText.trim()
        }));

        // Scraping Certifications (filtering out items marked with .pdf-hide)
        const certs = Array.from(document.querySelectorAll('.certification:not(.pdf-hide)')).map(el => ({
            name: el.querySelector('p')?.innerText.trim(),
            img: el.querySelector('img')?.src
        }));

        // Scraping Experience (filtering out elements marked with .pdf-hide)
        const experience = Array.from(document.querySelectorAll('.timeline-container:not(.pdf-hide)')).map(el => {
            const body = el.querySelector('.timeline-body');
            const company = body.querySelector('.badge')?.innerText.trim();
            const date = body.querySelector(':scope > .timeline-date')?.innerText.trim();
            const job = body.querySelector(':scope > .timeline-job')?.innerText.trim();
            const desc = body.querySelector(':scope > .timeline-desc')?.innerHTML.trim();
            
            // Handle sub-roles
            const subRoles = Array.from(el.querySelectorAll('.timeline-role:not(.pdf-hide)')).map(role => ({
                date: role.querySelector('.timeline-date')?.innerText.trim(),
                job: role.querySelector('.timeline-job')?.innerText.trim(),
                desc: role.querySelector('.timeline-desc')?.innerHTML.trim()
            }));

            return { company, date, job, desc, subRoles };
        });

        // Summary extracted directly from index.html (.pdf-summary-text tag)
        const pdfSummary = document.querySelector('.pdf-summary-text')?.innerText.trim() || '';

        return {
            name: getText('.glitch-text'),
            title: 'Senior Backend & Cloud Engineer',
            summary: pdfSummary,
            skills,
            education,
            certs,
            experience,
            profileImg: document.querySelector('.introContainer img')?.src
        };
    });

    await browser.close();

    // Read profile image locally in Node.js and convert to base64 Data URL to guarantee PDF rendering
    const profileImgPath = path.resolve(__dirname, '../images/profile.jpg');
    let profileImgDataUrl = data.profileImg;
    if (fs.existsSync(profileImgPath)) {
        const imgBuffer = fs.readFileSync(profileImgPath);
        profileImgDataUrl = `data:image/jpeg;base64,${imgBuffer.toString('base64')}`;
    }

    console.log('🛠️  Injecting data into template...');
    let template = fs.readFileSync(path.resolve(__dirname, '../cv-pdf-template.html'), 'utf8');

    // Filter noise and restructure skills specifically for ATS & Senior Backend focus
    const formatSkillsForATS = (skillGroups) => {
        // Defined categories tailored for Senior/Lead Backend & Cloud Engineer
        const targetCategories = {
            'Core Backend': ['Java', 'Spring boot', 'Spring Webflux', 'Project Reactor', 'Node JS', 'Python', 'C#', 'SQL', 'Liquibase', 'JUnit', 'Mockito'],
            'Architecture & Security': ['Microservices', 'Event Driven', 'DDD (Domain Driven Design)', 'CQRS', 'Oauth2', 'Azure B2C', 'REST', 'WSO2'],
            'Cloud & Data': ['Google Cloud cloud run', 'Google Cloud pubsub', 'Google Cloud storage', 'Google Cloud Dataflow', 'Azure App services', 'Azure Cosmos DB', 'Azure SQL Database', 'MongoDB', 'PostgreSQL', 'Redis'],
            'DevOps & Containers': ['Kubernetes', 'Docker|compose', 'Helm', 'OpenShift', 'Jenkins', 'Github Actions', 'Azure devops', 'SonarQube', 'Grafana']
        };

        // Flatten all scraped skills
        const allSkillsMap = new Map();
        skillGroups.forEach(g => {
            g.skills.forEach(s => {
                allSkillsMap.set(s.name.toLowerCase(), s);
            });
        });

        let resultHtml = '';

        for (const [catName, skillNames] of Object.entries(targetCategories)) {
            const matchedSkills = skillNames.map(name => {
                const foundKey = Array.from(allSkillsMap.keys()).find(k => k === name.toLowerCase() || k.includes(name.toLowerCase()));
                return foundKey ? allSkillsMap.get(foundKey) : { name, pct: 80 };
            });

            resultHtml += `
            <div class="skill-category">
                <div class="category-name">${catName}</div>
                <div class="category-skills">
                    ${matchedSkills.map(s => {
                        let lvl = 'l6';
                        if (s.pct >= 90) lvl = 'l8';
                        else if (s.pct >= 80) lvl = 'l7';
                        else if (s.pct >= 70) lvl = 'l6';
                        else if (s.pct >= 50) lvl = 'l5';
                        return `<span class="skill-pill skill-pill--${lvl}">${s.name}</span>`;
                    }).join('')}
                </div>
            </div>`;
        }

        return resultHtml;
    };
    
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

    const formatExperience = (exp) => exp.map(e => {
        // Special clean grouping for MINSAIT to prevent ATS date overlap issues
        const isMinsait = e.company && e.company.toUpperCase().includes('MINSAIT');
        if (isMinsait) {
            return `
            <div class="exp-item">
                <div class="exp-header">
                    <div>
                        <span class="exp-company">${e.company}</span>
                        <span class="exp-title"> — Senior Backend & Cloud Architect</span>
                    </div>
                    <div class="exp-date">Oct 2017 – Jun 2022</div>
                </div>
                <div class="minsait-summary-tag">
                    <em>Sub-roles / Project Focus: Azure B2C Developer | Cloud & DevOps Engineer | Java Backend Specialist</em>
                </div>
                ${e.subRoles.map(r => `
                    <div class="role-subitem">
                        <div class="exp-header">
                            <div class="exp-title">${r.job}</div>
                        </div>
                        <div class="exp-desc">${r.desc}</div>
                    </div>
                `).join('')}
            </div>`;
        }

        return `
        <div class="exp-item">
            ${(e.job || e.desc) ? `
            <div class="exp-header">
                <div>
                    <span class="exp-company">${e.company}</span>
                    ${e.job ? `<span class="exp-title"> — ${e.job}</span>` : ''}
                </div>
                ${e.date ? `<div class="exp-date">${e.date}</div>` : ''}
            </div>
            ${e.desc ? `<div class="exp-desc">${e.desc}</div>` : ''}
            ` : `
            <div class="exp-header">
                <div>
                    <span class="exp-company">${e.company}</span>
                </div>
            </div>
            `}
            ${e.subRoles.map(r => `
                <div class="role-subitem">
                    <div class="exp-header">
                        <div class="exp-title">${r.job}</div>
                        <div class="exp-date">${r.date}</div>
                    </div>
                    <div class="exp-desc">${r.desc}</div>
                </div>
            `).join('')}
        </div>`;
    }).join('\n');

    const formatSummary = (text) => `<p>${text}</p>`;

    // Pre-formatting contact info (hardcoded or extracted)
    const contactHtml = `
        <div class="contact-item"><i class="fa fa-envelope"></i> gabigarciagar@gmail.com</div>
        <div class="contact-item"><i class="fa fa-phone"></i> +34 690342350</div>
        <div class="contact-item"><i class="fa fa-linkedin"></i> In/gabriel-garcia-garrido</div>
        <div class="contact-item"><i class="fa fa-github"></i> @Gaboxondo</div>
    `;

    // Global replacements
    const replacements = {
        '{{NAME}}': data.name,
        '{{TITLE}}': data.title,
        '{{SUMMARY}}': formatSummary(data.summary),
        '{{SKILLS}}': formatSkillsForATS(data.skills),
        '{{EDUCATION}}': formatEducation(data.education),
        '{{CERTIFICATIONS}}': formatCerts(data.certs),
        '{{EXPERIENCE}}': formatExperience(data.experience),
        '{{CONTACT}}': contactHtml,
        '{{PROFILE_IMG}}': profileImgDataUrl,
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
