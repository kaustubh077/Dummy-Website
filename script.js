'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header');
const message = document.createElement('div');
message.innerHTML =
  'We use cookies for better Analytics ! <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);
message.classList.add('cookie-message');
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function () {
  // const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = el.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Instead of attaching an event handler to all the four buttons, we can
// attach the event handler to the parent element - that is how event delegation
// uses event bubbling

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  if (!id) return;
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

const tabs = document.querySelectorAll('.operations__tab');
const datas = document.querySelectorAll('.operations__content');
document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');
    if (!clicked) return;
    clicked.classList.add('operations__tab--active');
    tabs.forEach(function (tab) {
      if (tab !== clicked) tab.classList.remove('operations__tab--active');
    });
    const tabNum = clicked.getAttribute('data-tab');
    const curr = document.querySelector(`.operations__content--${tabNum}`);
    curr.classList.add('operations__content--active');
    datas.forEach(function (tab) {
      if (tab !== curr) tab.classList.remove('operations__content--active');
    });
  });

function handleHover(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(element => {
      if (element !== link) element.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

// mouseenter does not bubble, mousehover does
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// bind will assign the values passed as arguments to 'this' in the function
// and return a new function.

// sticky nav bar using intersection Obesrver API

function obsCallback(enteries) {
  const [entry] = enteries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(obsCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// revealing sections

const allSections = document.querySelectorAll('.section');
const revealSection = function (enteries, observer) {
  const [entry] = enteries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObs = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});
allSections.forEach(function (sec) {
  sectionObs.observe(sec);
  sec.classList.add('section--hidden');
});

// lazy loading images
const lazyImages = document.querySelectorAll('img[data-src]');

function lazyload(enteries, observer) {
  const [entry] = enteries;
  entry.target.src = entry.target.getAttribute('data-src');
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(lazyload, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // images should start loading before we reach them
});
lazyImages.forEach(function (img) {
  imgObserver.observe(img);
});

// slider component
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currSlide = 0;
let n = slides.length;
function goToSlide(curr) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - curr)}%)`;
  });
}

goToSlide(currSlide);
function nextSlide() {
  currSlide = (currSlide + 1) % n;
  goToSlide(currSlide);
}
function prevSlide() {
  currSlide = n - 1 - ((n - currSlide) % n);
  goToSlide(currSlide);
}
btnLeft.addEventListener('click', prevSlide);
btnRight.addEventListener('click', nextSlide);
