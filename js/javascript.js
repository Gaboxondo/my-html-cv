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
observer.observe(document.querySelector('.bar'));


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
observerStydies.observe(document.querySelector('.studyIconImage'));


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