// maybe move this to a more appropriate place
// given it's setting specific classes for the logo

// ideally we could check if the specific font is loaded using something like 
// const fa = new FontFace('fa_solid', 'url(../webfonts/fa-solid-900.woff2)');
// but that will probably need integrating with the fa css stuff

// https://developer.mozilla.org/en-US/docs/Web/API/FontFace

// this will do for now

document.fonts.ready.then(function() {

    // any operation that needs to be done only after all the fonts
    // have finished loading can go here

    const logoIcon = document.querySelector('.logo-icon');

    if (!logoIcon.classList.contains('ready')) {
        logoIcon.classList.add('ready');
        // console.log('add class ready!');
    }

});