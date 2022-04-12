/* make sure the fonts and the first image are loaded before displaying the hero stuff */

const firstImg =  document.querySelector('[data-src="../img/content/png/bls_home_crop.png"]');
// const firstImg =  document.querySelector('#bls-img');
// console.log(firstImg.getAttribute('data-src'));


async function checkImageLoaded(img) {
    
    // console.log(`loading ${img.id}, please!`);
    return new Promise((resolve, reject) => {

        img.onload = () => {
            // console.log(`loaded ${img.id}, yay!`);
            resolve('First image loaded');
        }

        img.onerror = () => {
            // console.log(firstImg.src + " is loaded!");
            reject('There was a problem with the image');
        }

        // for some reason this doesn't work, so do it the long way
        // img.onload = resolve('First image loaded');
        // img.onerror = reject('There was a problem with the image');

    });
}

async function checkFontsLoaded() {

    await document.fonts.ready;
    // console.log("Fonts are ready! (from the async function)");
    displayLogoIcon();
    displayNavToggleIcon();
    return('Fonts are ready!');
    // reject('Fonts are not ready!');
};



// try an async iife for the promises, instead of promise.all.then
(async () => {
    // const results = await Promise.all([firstImgPromise, fontsPromise]);
    const results = await Promise.all([checkImageLoaded(firstImg), checkFontsLoaded()]);
    // console.log(results);
    // display the hero content with animation
    displayHeroContent(true);
})().catch((err) => {
    // if something goes wrong just make the hero
    // content visible without the animation
    // console.log(err);
    displayHeroContent(false);
});


function displayLogoIcon() {

    const logoIcon = document.querySelector('.logo-icon');

    if (!logoIcon.classList.contains('ready')) {
        logoIcon.classList.add('ready');
        // console.log('add class ready!');
    }

}

// also hide the navtoggle until fonts have loaded
// because it's also using font awesome

function displayNavToggleIcon() {

    const navToggleIcon = document.querySelector('.mobile-nav-toggle-icon');
    
    if (!navToggleIcon.classList.contains('ready')) {
        navToggleIcon.classList.add('ready');
        // console.log('add class ready!');
    }
}

// animation parameter takes boolean arg 
// as to whether or not to do the hero animation
function displayHeroContent(animation) {

    const heroContent = document.querySelector('.hero-content');

    if (animation) {
        
        const heroH2Spans = document.querySelectorAll('.hero-content span');
        const heroH2SpanClasses = ['greeting-hi', 'greeting-im', 'greeting-guy'];
        const heroContentPara = document.querySelector('.hero-content p');

        // add the fade-in animation classes to the h2 spans
        heroH2Spans.forEach((span, index) => {
            if (!span.classList.contains(heroH2SpanClasses[index])) {
                span.classList.add(heroH2SpanClasses[index]);
                // console.log('adding class ' + heroH2SpanClasses[index]);
            }
        });

        // add the typewiter class to hero p
        if (!heroContentPara.classList.contains('typewriter')) {
            heroContentPara.classList.add('typewriter');
            // console.log('add class ready!');
        }

    }
    
    // if !animation just make the hero content visible
    if (!heroContent.classList.contains('ready')) {
        heroContent.classList.add('ready');
        // console.log('add class ready!');
    }

}