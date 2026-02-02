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
// --- 7. "Silent" PDF Download Function ---
function downloadPDF() {
  // 1. Create a clone of the content to work "behind the scenes"
  const content = document.body.cloneNode(true);

  // 2. Create a hidden worker and apply the export class
  const worker = document.createElement('div');
  worker.style.position = 'absolute';
  worker.style.left = '-9999px';
  worker.style.top = '0';
  worker.style.width = '1024px';
  worker.className = 'is-exporting';
  worker.appendChild(content);
  document.body.appendChild(worker);

  // 3. Force visibility on the clone (remove lazy animations)
  worker.querySelectorAll('.fade-in-section').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.visibility = 'visible';
  });

  const opt = {
    margin: [10, 0, 10, 0],
    filename: 'Gabriel_Garcia_CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  // 4. Generate PDF from the hidden worker
  html2pdf().set(opt).from(worker).save().then(() => {
    // 5. Cleanup the worker
    document.body.removeChild(worker);
  });
}
