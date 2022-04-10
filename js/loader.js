/* make sure the fonts and the first image are loaded before displaying the hero stuff */

const firstImg =  document.querySelector('[data-src="../img/content/png/bls_home_crop.png"]');
// const firstImg =  document.querySelector('#bls-img');
// console.log(firstImg.getAttribute('data-src'));

const firstImgPromise = new Promise(function (resolve, reject) {

    firstImg.onload = function () {
        console.log(firstImg.src + " is loaded!");
        // return resolve();
        resolve();
    }

});

const fontsPromise = new Promise(function (resolve, reject) {

    document.fonts.ready.then(function() {
        console.log("Fonts are ready!");
        displayLogoIcon();
        resolve();
    });

});

Promise.all([firstImgPromise, fontsPromise]).then(() => {
    console.log("The promises are resolved");
    // display the hero content with animation
    displayHeroContent(true);
    // should probably do the displaylogoIcon() as soon as the fonts are loaded
    // moved it into the fonts.ready.then()
    // displayLogoIcon();
}).catch(() => {

    // if something goes wrong just make the hero
    // content visible without the animation
    displayHeroContent(false);

});

// no error handling for now

function displayLogoIcon() {

    const logoIcon = document.querySelector('.logo-icon');

    if (!logoIcon.classList.contains('ready')) {
        logoIcon.classList.add('ready');
        // console.log('add class ready!');
    }

}

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
                console.log('adding class ' + heroH2SpanClasses[index]);
            }
        });

        // add the typewiter class to hero p
        if (!heroContentPara.classList.contains('typewriter')) {
            heroContentPara.classList.add('typewriter');
            // console.log('add class ready!');
        }

    }
    
    // if animation != true just make the hero content visible
    if (!heroContent.classList.contains('ready')) {
        heroContent.classList.add('ready');
        // console.log('add class ready!');
    }

}