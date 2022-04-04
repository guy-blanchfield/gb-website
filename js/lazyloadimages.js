// from https://css-tricks.com/the-complete-guide-to-lazy-loading-images/

// and web.dev info on loading=lazy (native browser support)

// domContentLoaded fires after defer scripts
document.addEventListener('DOMContentLoaded', function () {
  // var lazyloadImages = document.querySelectorAll('img.lazy');

  // const nativeSupport = false; (for testing)
  // we could probably set const lazyloadImages  = document.querySelectorAll('img[loading="lazy"]');
  // here but not sure about the removing 'lazy' class thing
  // that's going on down there, it'll need thorough testing in network, with throttling
  // so leave it for now

  // first see if if browser natively supports loading=lazy
  // if (nativeSupport == true) { (for testing)
  if ('loading' in HTMLImageElement.prototype) {
    const lazyloadImages = document.querySelectorAll('img[loading="lazy"]');
    lazyloadImages.forEach((img) => {
      img.src = img.dataset.src;
    });
  } else {
    // could do this as else if, but lets keep the 2 fallbacks together
    // if no native browser support, see if the intersection observer api is available

    if ('IntersectionObserver' in window) {
      const lazyloadImages = document.querySelectorAll('.lazy');
      const imageObserver = new IntersectionObserver(function (
        entries,
        observer
      ) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.src;
            image.classList.remove('lazy');
            imageObserver.unobserve(image);
          }
        });
      });

      lazyloadImages.forEach(function (image) {
        imageObserver.observe(image);
      });
    } else {
      // do it the old school way

      let lazyloadThrottleTimeout;

      // When we scroll, the scroll event triggers multiple times rapidly. Thus, for performance, we are adding a small timeout to our script that throttles the lazy loading function execution so it doesn’t block other tasks running in the same thread in the browser

      // more info:

      // from https://stackoverflow.com/questions/9083594/call-settimeout-without-delay

      // In browsers there also exists "The bucket" where all events are first put in wait for the UI thread to be done with whatever it´s doing. As soon as the thread is done it looks in the bucket and picks the task first in line.
      // Using setTimeout you create a new task in the bucket after the delay and let the thread deal with it as soon as it´s available for more work.

      // NB this is actually using a 20ms timeout

      const lazyloadImages = document.querySelectorAll('.lazy');

      function lazyload() {
        if (lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function () {
          const scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function (img) {
            if (img.offsetTop < window.innerHeight + scrollTop) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              console.log('loaded image: ' + img.src);
              console.log('lazyloadImages.length is: ' + lazyloadImages.length);
            }
          });
          if (lazyloadImages.length == 0) {
            document.removeEventListener('scroll', lazyload);
            window.removeEventListener('resize', lazyload);
            // when device is rotated from landscape to portrait or vice-versa
            window.removeEventListener('orientationChange', lazyload);
          }
        }, 20);
      }

      document.addEventListener('scroll', lazyload);
      window.addEventListener('resize', lazyload);
      window.addEventListener('orientationChange', lazyload);
    }
  }
});
