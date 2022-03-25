// Remove the transition class
const barList = document.querySelectorAll('.bartoogle');
for (let i = 0; i < barList.length; i++) {
  barList[i].classList.remove('animateddBar');
}

// Create the observer, same as before:
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



// Remove the transition class
const studiyImageList = document.querySelectorAll('.educationImageToogle');
for (let i = 0; i < studiyImageList.length; i++) {
  studiyImageList[i].classList.remove('animate__bounceIn');
}

// Create the observer, same as before:
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