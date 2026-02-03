// JavaScript for CV Interactions

// --- 1. Education Icons Animation ---
const studiyImageList = document.querySelectorAll('.educationImageToogle');
// Reset state
for (let i = 0; i < studiyImageList.length; i++) {
  studiyImageList[i].classList.remove('bounce-in');
}

const observerStydies = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      studiyImageList.forEach(img => img.classList.add('bounce-in'));
    } else {
      // Optional: remove if you want it to re-animate every time
      studiyImageList.forEach(img => img.classList.remove('bounce-in'));
    }
  });
});
const studiesSection = document.querySelector('#studiesIcons');
if (studiesSection) observerStydies.observe(studiesSection);


// --- 2. Certifications Animation ---
const certImageList = document.querySelectorAll('.certification');
// Reset state
certImageList.forEach(cert => cert.classList.remove('flip'));

const observerCertifications = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      certImageList.forEach(cert => cert.classList.add('flip'));
    } else {
      certImageList.forEach(cert => cert.classList.remove('flip'));
    }
  });
});
const certSection = document.querySelector('#certificationsContainer'); // ensure ID matches HTML
if (certSection) observerCertifications.observe(certSection);
// Fallback if ID is just specific container
const skillsSection = document.querySelector('#skillsCourses');
if (skillsSection) observerCertifications.observe(skillsSection);


// --- 3. Typewriter Effect ---
const titleWriter = document.querySelector('.titleText');
if (titleWriter) {
  titleWriter.classList.remove('typewriter');
  const observerTitleWritter = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        titleWriter.classList.add('typewriter');
      } else {
        titleWriter.classList.remove('typewriter');
      }
    });
  });
  observerTitleWritter.observe(titleWriter);
}


// --- 4. Accordion & Skill Bars Animation ---
var acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    // A. Close all other panels
    for (let j = 0; j < acc.length; j++) {
      if (acc[j] !== this) {
        acc[j].classList.remove("active");
        let otherPanel = acc[j].nextElementSibling;
        if (otherPanel) {
          otherPanel.style.maxHeight = null;
          otherPanel.style.paddingTop = "0px";
          otherPanel.style.paddingBottom = "0px";
          setTimeout(() => {
            if (!acc[j].classList.contains('active')) {
              otherPanel.style.display = "none";
            }
          }, 600);

          let otherBars = otherPanel.querySelectorAll('.bartoogle');
          otherBars.forEach(bar => bar.classList.remove('animateddBar'));
        }
      }
    }

    // B. Toggle CURRENT panel
    this.classList.toggle("active");
    var panel = this.nextElementSibling;

    if (panel.style.maxHeight) {
      // Closing
      panel.style.maxHeight = null;
      panel.style.paddingTop = "0px";
      panel.style.paddingBottom = "0px";
      setTimeout(() => {
        if (!this.classList.contains('active')) {
          panel.style.display = "none";
        }
      }, 600);

      let bars = panel.querySelectorAll('.bartoogle');
      bars.forEach(bar => bar.classList.remove('animateddBar'));
    } else {
      // Opening
      panel.style.display = "flex";
      // Small timeout to allow display: flex to take effect before animating height
      setTimeout(() => {
        panel.style.maxHeight = (panel.scrollHeight + 40) + "px";
        panel.style.paddingTop = "20px";
        panel.style.paddingBottom = "20px";
      }, 10);

      // Animate bars with a delay relative to the panel opening
      setTimeout(() => {
        let bars = panel.querySelectorAll('.bartoogle');
        bars.forEach(bar => {
          bar.classList.add('animateddBar');
        });
      }, 400);
    }
  });
}


// --- 5. Scroll Fade-In Animation ---
const fadeElements = document.querySelectorAll('.fade-in-section');
const appearOptions = {
  threshold: [0, 0.1], // Trigger at 0 for exits and 0.1 for entries
  rootMargin: "0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    } else if (entry.intersectionRatio <= 0) {
      // Only remove if completely gone to prevent black zones during transition
      entry.target.classList.remove('is-visible');
    }
  });
}, appearOptions);

fadeElements.forEach(fader => {
  appearOnScroll.observe(fader);
});
// --- 7. Robust PDF Download Function ---
function downloadPDF() {
  const loader = document.getElementById('pdf-loader');
  const mainOrigin = document.querySelector('main');

  if (loader) loader.style.display = 'flex';
  document.body.classList.add('is-exporting');
  window.scrollTo(0, 0);

  // 1. Create a container for the 2-page document
  const pdfWrapper = document.createElement('div');
  pdfWrapper.id = 'reconstructed-pdf-wrapper';

  // Reusable function to clone sections
  const getClone = (id) => {
    const el = mainOrigin.querySelector(`#${id}`);
    if (!el) return null;
    const clone = el.cloneNode(true);
    clone.style.display = 'block';
    clone.style.marginBottom = '5mm';
    return clone;
  };

  // Build Page 1
  const page1 = document.createElement('div');
  page1.className = 'pdf-page';
  page1.id = 'page-1';
  page1.innerHTML = `
    <div class="pdf-sidebar">
      <div class="pdf-hero-area"></div>
      <div class="pdf-contact-area"></div>
      <div class="pdf-skills-half-1"></div>
    </div>
    <div class="pdf-main-content">
      <div class="pdf-edu-area"></div>
      <div class="pdf-exp-area"></div>
    </div>
  `;

  // Build Page 2
  const page2 = document.createElement('div');
  page2.className = 'pdf-page';
  page2.id = 'page-2';
  page2.innerHTML = `
    <div class="pdf-sidebar">
      <div class="pdf-skills-half-2"></div>
    </div>
    <div class="pdf-main-content">
      <div class="pdf-projects-area"></div>
      <div class="pdf-courses-area"></div>
      <div class="pdf-aboutme-area"></div>
    </div>
  `;

  // Populate Page 1
  const heroClone = getClone('hero');
  if (heroClone) page1.querySelector('.pdf-hero-area').appendChild(heroClone);

  const contactClone = getClone('contact');
  if (contactClone) page1.querySelector('.pdf-contact-area').appendChild(contactClone);

  const eduClone = getClone('education');
  if (eduClone) page1.querySelector('.pdf-edu-area').appendChild(eduClone);

  const expClone = getClone('experience');
  if (expClone) page1.querySelector('.pdf-exp-area').appendChild(expClone);

  // Populate Page 2
  const projectsClone = getClone('projects');
  if (projectsClone) page2.querySelector('.pdf-projects-area').appendChild(projectsClone);

  const coursesClone = getClone('courseList');
  if (coursesClone) page2.querySelector('.pdf-courses-area').appendChild(coursesClone);

  const aboutmeClone = getClone('aboutme');
  if (aboutmeClone) page2.querySelector('.pdf-aboutme-area').appendChild(aboutmeClone);

  // Split Skills
  const skillsBase = mainOrigin.querySelector('#skillsCourses');
  if (skillsBase) {
    const allSkills = Array.from(skillsBase.querySelectorAll('.skill'));
    const midpoint = Math.ceil(allSkills.length / 2);

    const skills1 = page1.querySelector('.pdf-skills-half-1');
    const skills2 = page2.querySelector('.pdf-skills-half-2');

    // Add Skills Header to both
    const h1_1 = document.createElement('h1'); h1_1.innerHTML = 'Skills <i class="fa fa-microchip"></i>';
    const h1_2 = document.createElement('h1'); h1_2.innerHTML = 'Skills (cont.) <i class="fa fa-microchip"></i>';
    skills1.appendChild(h1_1);
    skills2.appendChild(h1_2);

    allSkills.slice(0, midpoint).forEach(s => skills1.appendChild(s.cloneNode(true)));
    allSkills.slice(midpoint).forEach(s => skills2.appendChild(s.cloneNode(true)));
  }

  pdfWrapper.appendChild(page1);
  pdfWrapper.appendChild(page2);
  document.body.appendChild(pdfWrapper);

  const opt = {
    margin: 0,
    filename: 'Gabriel_Garcia_Resume.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: false,
      allowTaint: true,
      scrollY: 0,
      letterRendering: true,
      logging: false
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] }
  };

  // Capture
  setTimeout(() => {
    html2pdf().from(pdfWrapper).set(opt).save()
      .then(() => {
        setTimeout(finish, 500);
      })
      .catch(err => {
        console.warn("Auto-PDF failed or blocked:", err);
        alert("The automatic download was blocked by browser security (local files).\n\nOpening Print Dialog: Please select 'Save as PDF'.\n(The layout is already optimized for a perfect 2-page result!)");
        window.print();
        finish();
      });
  }, 1200);

  function finish() {
    document.body.classList.remove('is-exporting');
    if (pdfWrapper.parentNode) document.body.removeChild(pdfWrapper);
    if (loader) loader.style.display = 'none';
  }

  // Safety cleanup: ensure loader disappears after 20 seconds regardless of success
  setTimeout(finish, 20000);
}



