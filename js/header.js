/* the mobile nav toggle stuff */

const mainNav = document.querySelector('.main-nav-list');
const navToggle = document.querySelector('.mobile-nav-toggle');
const navToggleIcon = document.querySelector('.mobile-nav-toggle-icon');

function toggleNav() {
  const visibility = mainNav.getAttribute('data-visible');

  if (visibility === 'false') {
    mainNav.setAttribute('data-visible', true);
    navToggle.setAttribute('aria-expanded', true);
  } else if (visibility === 'true') {
    mainNav.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', false);
  }

  // toggle the fa icon for the button
  // fa-xmark will overide the style for fa-bars but let's toggle both, just for tidiness
  navToggleIcon.classList.toggle('fa-bars');
  navToggleIcon.classList.toggle('fa-xmark');
}

navToggle.addEventListener('click', toggleNav);

// clicking anywhere on the mobile nav should hide the mobile menu
// this seems to be working but have a think about smartening it up
mainNav.addEventListener('click', toggleNav);

/* now some scroll stuff to show and hide the header, and make it sticky sometimes */

let prevScrollPos = window.pageYOffset;

function hideheader() {
  // get the header
  const headerToHide = document.querySelector('.header');
  let currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    // if scroll up
    // if hidenav class is present, remove it (show the header)
    if (headerToHide.classList.contains('hideheader')) {
      headerToHide.classList.remove('hideheader');
    }
    //document.querySelector('.header').style.top = "0";
  } else {
    // if scroll down
    // if hideheader class isn't present, add it (hide the header)
    if (!headerToHide.classList.contains('hideheader')) {
      headerToHide.classList.add('hideheader');
    }

    // if scroll gets to bottom, show the header
    // found this a bit distracting tbh, leave it out for now
    /* 
    if (window.innerHeight + window.pageYOffset >= document.body.clientHeight) {
      // if hidenav class is present, remove it (show the header)
      if (headerToHide.classList.contains('hideheader')) {
        headerToHide.classList.remove('hideheader');
      }
    }
    */
  }

  prevScrollPos = currentScrollPos;

  // should probably put something in here to change the border / drop shadow when it's scrolling
  // basically needs to have a border when the page can't scroll up any further and a drop shadow the rest of the time

  if (window.pageYOffset > 200) {
    // header height is 5rem - 200 seems to be about right

    if (!headerToHide.classList.contains('stickyheader')) {
      headerToHide.classList.add('stickyheader');
    }
  } else {
    if (headerToHide.classList.contains('stickyheader')) {
      headerToHide.classList.remove('stickyheader');
    }
  }
}

window.onscroll = function () {
  hideheader();
};
