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
// --- 7. Robust PDF Download Function ---
function downloadPDF() {
  const loader = document.getElementById('pdf-loader');
  if (loader) loader.style.display = 'flex';

  // 1. Create a specialized container for the PDF generation
  // We don't want to just print the body because html2canvas often messes up full page captures
  // with complex CSS variables and root styles.
  const mainOrigin = document.querySelector('main');
  const pdfContainer = document.createElement('div');
  pdfContainer.classList.add('pdf-mode'); // This triggers our optimized CSS

  // 2. Clone content
  // We need to move the clones into our pdf container
  const heroClone = document.querySelector('#hero').cloneNode(true);
  const contactClone = document.querySelector('#sec-contact').cloneNode(true);
  const educationClone = document.querySelector('#sec-education').cloneNode(true);
  const skillsClone = document.querySelector('#sec-skills').cloneNode(true);
  const aboutClone = document.querySelector('#sec-aboutme').cloneNode(true);
  const experienceClone = document.querySelector('#sec-experience').cloneNode(true);
  const projectsClone = document.querySelector('#sec-projects').cloneNode(true);

  // Append in the "Float" order (Sidebar first, then Main)
  pdfContainer.appendChild(heroClone);
  pdfContainer.appendChild(contactClone);
  pdfContainer.appendChild(educationClone);
  pdfContainer.appendChild(skillsClone);

  pdfContainer.appendChild(aboutClone);
  pdfContainer.appendChild(experienceClone);
  pdfContainer.appendChild(projectsClone);

  // 3. Temporarily append to body to render fonts/styles
  // But hide it from viewport view (absolute off-screen or z-index behind)
  // Actually html2pdf needs it visible to render
  pdfContainer.style.position = 'absolute';
  pdfContainer.style.top = '0';
  pdfContainer.style.left = '0';
  pdfContainer.style.zIndex = '99999'; // On top of everything
  document.body.appendChild(pdfContainer);

  // 4. Configure html2pdf
  const opt = {
    margin: 0,
    filename: 'Gabriel_Garcia_CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollY: 0,
      windowWidth: 794 // 210mm in pixels approx at 96dpi, ensure width consistency
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] }
  };

  // 5. Generate
  html2pdf().from(pdfContainer).set(opt).save().then(() => {
    // Cleanup
    document.body.removeChild(pdfContainer);
    if (loader) loader.style.display = 'none';
  }).catch(err => {
    console.error(err);
    alert('PDF Generation Error. Falling back to print dialog.');
    document.body.removeChild(pdfContainer);
    if (loader) loader.style.display = 'none';
    window.print();
  });
}



