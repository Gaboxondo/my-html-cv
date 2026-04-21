---
name: cv-pdf-guidelines
description: Expert guidelines for creating and improving professional CV PDFs based on Santander's "10 Keys for an Outstanding CV". Use this skill whenever the user mentions refining their CV, preparing it for job applications, optimizing layout for PDF format, or checking if their profile meets modern professional standards for a Curriculum Vitae.
---

# CV PDF Guidelines (Santander Best Practices)

This skill provides actionable instructions for creating, auditing, and refining a Curriculum Vitae (CV) intended for PDF export, following the 10 keys recommended by Banco Santander.

## Core Principles

Apply these 10 rules when generating or reviewing a CV:

1.  **Reverse Chronological Order**: Always place the most recent experience or education first. Depending on the user's profile, prioritize the section (Experience vs. Education) that is most currently relevant to the target job.
2.  **Concise Extension**: Limit the CV to 1 or 2 pages maximum. Filter out irrelevant information; prioritize what adds value to the specific role being applied for.
3.  **Functional Descriptions**: Do not just list job titles. Describe functions, achievements, and fulfilled objectives for each role to demonstrate professional value.
4.  **Visual Clarity**: Use a clean design with sections, columns, and a touch of color to facilitate reading. Use visual elements like bars or icons for skills (languages, software) to make them scanable.
5.  **Impeccable Grammar**: Zero tolerance for spelling or grammatical errors. Use professional, legible typography.
6.  **PDF Format**: Always aim for a PDF output to ensure the layout remains intact and information cannot be easily modified.
7.  **Social Media Strategy**: Only include links to social profiles (LinkedIn, Portfolio, etc.) if they genuinely add value to the professional profile.
8.  **Complete Profile (Skills & Interests)**: Include soft skills, hobbies, and personal interests if they help the company get a "global" view of the candidate.
9.  **Total Honesty**: Never exaggerate or lie about experience or training. The goal is to generate a trust-based interview.
10. **Constant Update**: Keep contact information and the latest experience/education up to date.

## Audit Workflow

When asked to review a CV, follow this checklist:

- [ ] Is the information sorted by most recent first?
- [ ] Does it exceed 2 pages? (Suggest cuts if so).
- [ ] Are achievements mentioned, or just tasks?
- [ ] Is the layout visual and easy to scan?
- [ ] Are there spelling/grammar errors?
- [ ] Does it include relevant social links?
- [ ] Are soft skills and interests included?

## Implementation Guide for HTML/CSS CVs

If building a CV using HTML/CSS (to be printed/saved as PDF):

- **A4 Layout**: Design specifically for A4 dimensions (`210mm x 297mm`).
- **Typography**: Choose high-quality fonts (Inter, Roboto, Open Sans).
- **Scanability**: Use ample white space and clear headings.
- **Visuals**: Use CSS Grid/Flexbox for multi-column layouts that look modern.
- **Print Version**: Ensure `@media print` rules remove unnecessary web elements (nav bars, buttons).
