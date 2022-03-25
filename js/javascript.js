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
  studiyImageList[i].classList.remove('animate__bounceIn');
}
const observerStydies = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      for (let i = 0; i < studiyImageList.length; i++) {
        studiyImageList[i].classList.add('animate__bounceIn');
      }
      return;
    }

    for (let i = 0; i < studiyImageList.length; i++) {
      studiyImageList[i].classList.remove('animate__bounceIn');
    }
  });
});
observerStydies.observe(document.querySelector('#studiesIcons'));


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
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.style.marginBottom = "10px"
    } 
  });
}
var firstPannel = document.getElementById('firstaccordion').nextElementSibling;
firstPannel.style.maxHeight = firstPannel.scrollHeight + "px";
firstPannel.style.marginBottom = "10px";
firstPannel.style.display = "flex";