//Lo suyo seria un trigger por cada una. Ver como hacerlo con un For
const barList = document.querySelectorAll('.bartoogle');
for (let i = 0; i < barList.length; i++) {
  barList[i].classList.remove('animateddBar');
}
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      for (let i = 0; i < barList.length; i++) {
        barList[i].classList.add('animateddBar');
      }
      return;
    }

    for (let i = 0; i < barList.length; i++) {
      barList[i].classList.remove('animateddBar');
    }
  });
});
observer.observe(document.querySelector('#skillList'));


const studiyImageList = document.querySelectorAll('.educationImageToogle');
for (let i = 0; i < studiyImageList.length; i++) {
  studiyImageList[i].classList.remove('bounce-in');
}
const observerStydies = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      for (let i = 0; i < studiyImageList.length; i++) {
        studiyImageList[i].classList.add('bounce-in');
      }
      return;
    }

    for (let i = 0; i < studiyImageList.length; i++) {
      studiyImageList[i].classList.remove('bounce-in');
    }
  });
});
observerStydies.observe(document.querySelector('#studiesIcons'));

const certImageList = document.querySelectorAll('.certification');
for (let i = 0; i < studiyImageList.length; i++) {
  studiyImageList[i].classList.remove('flip');
}
const observerCertifications = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      for (let i = 0; i < certImageList.length; i++) {
        certImageList[i].classList.add('flip');
      }
      return;
    }

    for (let i = 0; i < certImageList.length; i++) {
      certImageList[i].classList.remove('flip');
    }
  });
});
observerCertifications.observe(document.querySelector('#certifications'));

// esto se puede poner con un bucle bastante mas mejor
const titleWriter = document.querySelector('.titleText');
titleWriter.classList.remove('typewriter');
// Create the observer, same as before:
const observerTitleWritter = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      titleWriter.classList.add('typewriter');
      return;
    }

    titleWriter.classList.remove('typewriter');
  });
});
observerTitleWritter.observe(document.querySelector('.titleText'));

const titleWriter2 = document.querySelector('.titleText2');
titleWriter2.classList.remove('typewriter');
// Create the observer, same as before:
const observerTitleWritter2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      titleWriter2.classList.add('typewriter');
      return;
    }

    titleWriter2.classList.remove('typewriter');
  });
});
observerTitleWritter2.observe(document.querySelector('.titleText2'));

const titleWriter3 = document.querySelector('.titleText3');
titleWriter3.classList.remove('typewriter');
// Create the observer, same as before:
const observerTitleWritter3 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      titleWriter3.classList.add('typewriter');
      return;
    }

    titleWriter3.classList.remove('typewriter');
  });
});
observerTitleWritter3.observe(document.querySelector('.titleText3'));

const titleWriter4 = document.querySelector('.titleText4');
titleWriter4.classList.remove('typewriter');
// Create the observer, same as before:
const observerTitleWritter4 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      titleWriter4.classList.add('typewriter');
      return;
    }

    titleWriter4.classList.remove('typewriter');
  });
});
observerTitleWritter4.observe(document.querySelector('.titleText4'));


var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    for(j = 0; j < acc.length; j++) {
      acc[j].nextElementSibling.style.maxHeight = null;
      acc[j].nextElementSibling.style.display = "none";
      acc[j].nextElementSibling.style.marginBottom = "0";
    }
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    panel.style.display = "flex";
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      panel.style.marginBottom = "0"
    } else {
      panel.style.maxHeight = panel.scrollHeight + "90px";
      panel.style.marginBottom = "10px"
    } 
  });
}
var firstPannel = document.getElementById('firstaccordion').nextElementSibling;
firstPannel.style.maxHeight = firstPannel.scrollHeight + "90px";
firstPannel.style.marginBottom = "10px";
firstPannel.style.display = "flex";



    // Comportamientos para el men� de navegaci�n.
    let mainNav=document.getElementById('nav');
    let navbarToggle=document.getElementById("navbar-toogle");
    navbarToggle.addEventListener("click", function() {

    if (this.classList.contains('active')){
        mainNav.style.display="none";
        this.classList.remove('active');
    }
    else {
        mainNav.style.display="flex";
        this.classList.add('active');
    }
    });
