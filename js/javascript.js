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
          otherPanel.style.display = "none";
          // Reset bars in other panels
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
      setTimeout(() => panel.style.display = "none", 300);

      // Reset bars
      let bars = panel.querySelectorAll('.bartoogle');
      bars.forEach(bar => bar.classList.remove('animateddBar'));

    } else {
      // Opening
      panel.style.display = "flex";
      panel.style.maxHeight = panel.scrollHeight + "px";

      // Animate bars with a slight delay to allow rendering
      setTimeout(() => {
        let bars = panel.querySelectorAll('.bartoogle');
        bars.forEach(bar => {
          bar.classList.add('animateddBar');
        });
      }, 50);
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
  console.log("Initiating PDF Export...");
  const loader = document.getElementById('pdf-loader');
  const mainContent = document.querySelector('main');

  if (loader) loader.style.display = 'flex';
  document.body.classList.add('is-exporting');
  window.scrollTo(0, 0);

  const opt = {
    margin: [10, 5, 10, 5],
    filename: 'Gabriel_Garcia_Resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 1.5, // Safer scale for large pages
      useCORS: true,
      letterRendering: true,
      logging: false
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Give time for classes to apply
  setTimeout(() => {
    html2pdf().from(mainContent).set(opt).save()
      .then(() => {
        console.log("PDF saved successfully");
        finish();
      })
      .catch(err => {
        console.error("PDF Export failed:", err);
        alert("Browser security blocks automatic PDF generation when running from local files. \n\nPlease use 'Ctrl + P' and select 'Save as PDF' - it's already optimized for a perfect 2-page result!");
        finish();
      });
  }, 1200);

  function finish() {
    document.body.classList.remove('is-exporting');
    if (loader) loader.style.display = 'none';
  }
}
