const faders = document.querySelectorAll('.fade-in');
// const sliders = document.querySelectorAll('.slide-in');
const saturaters = document.querySelectorAll('.saturate-in');
const sections = document.querySelectorAll('section[id]');

const appearOptions = {
  threshold: 0.2, // maybe 0.5?
  rootMargin: '0px 0px -100px 0px',
};

const saturateOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px',
};

const updateMenuOptions = {
  threshold: 0,
  rootMargin: '-200px 0px -200px 0px',
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      entry.target.classList.remove('appear');
    } else {
      entry.target.classList.add('appear');
    }
  });
},
appearOptions);

const saturateOnScroll = new IntersectionObserver(function (
  entries,
  saturateOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      entry.target.classList.remove('saturate');
    } else {
      entry.target.classList.add('saturate');
    }
  });
},
saturateOptions);

const updateMenuOnScroll = new IntersectionObserver(function (
  entries,
  updateMenuOnScroll
) {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute('id');

    if (!entry.isIntersecting) {
      document
        .querySelector(`nav li a[href="#${id}"]`)
        .classList.remove('active');
    } else {
      document.querySelector(`nav li a[href="#${id}"]`).classList.add('active');
    }
  });
},
updateMenuOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

saturaters.forEach((saturater) => {
  saturateOnScroll.observe(saturater);
});

sections.forEach((section) => {
  updateMenuOnScroll.observe(section);
});

/*
sliders.forEach(slider => {
  appearOnScroll.observe(slider);
});

*/
