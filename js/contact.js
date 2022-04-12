const contactname = document.getElementById('contact-name');
const contactnickname = document.getElementById('contact-nickname');
const contactemail = document.getElementById('contact-email');
const contactmessage = document.getElementById('contact-message');
const contactsubmit = document.getElementById('contact-submit');
const contactform = document.getElementById('contact-form');
const contactsuccess = document.getElementById('contact-success');

// recaptcha callback was here - moved back to inline in head

// just do inputsStatus manually for now
const inputnames = ['contactname', 'contactemail', 'contactmessage', 'contactrecaptcha'];
const inputsStatus = {};

inputnames.forEach(n => {

  inputsStatus[n] = {
    'valid' : false,
    'errormsg' : ''
  }

});


// tracks whether the form has been changed
// to allow on blur validation
// don't want to validate if user is just tabbing through
// only if they've started filling in the form
// this is set to true on form change event
let allowblurvalidate = false;

// the recaptcha response token
let recaptchaResponse = '';

// eventlistener for change, to activate blur validation
contactform.addEventListener('change', () => {
  // console.log('contact form change!');
  allowblurvalidate = true;
});

// eventlistener for input focusouts/ blurs
// callback function is a dedicated function that takes the event
// and calls validateInput with the appropriate argument
contactform.addEventListener('focusout', focusEventHandler);

// eventlistener for submit
contactform.addEventListener('submit', (e) => {
  // console.log("submitted");
  e.preventDefault();
  validateForm('submit');
});

// little function to remove hyphen from input names (e.target.name)
// so we can keep the const names as a different naming format (i.e. not hyphenated!)
// at the moment it's only used by focusEventHandler but might come in handy

function removeHyphen(str) {
  // const splitstr = str.split('-');
  // const newstr = splitstr.join('');
  // return newstr;
  return str.split('-').join('');
}

function focusEventHandler(e) {

  // exit the function if allowblurvalidate isn't true
  if (!allowblurvalidate) return;

  // check the event target, if it's input or textarea we want it
  if (e.target.nodeName == 'INPUT' || e.target.nodeName == 'TEXTAREA') {
    
    const input = removeHyphen(e.target.name);

    console.log('input: ' + input);
    // call the input validater function
    validateInput(input);
  }

}


// function to check if all the inputs are valid
// returns false if there are any instances of 'valid: false' in the inputsStatus obj
function checkInputsValid() {

  for (const key in inputsStatus) {
    // skip loop if the property is from prototype
    if (!inputsStatus.hasOwnProperty(key)) continue;
  
    const obj = inputsStatus[key];
    if (obj.valid === false) {
      // console.log('returning false because: ' + key);
      return false;
    }
  
  }

  return true;

}

// validates the whole form
function validateForm(input) {

  // console.log('validating form with input: ' + input);

  // check all the inputs
  inputnames.forEach(n => validateInput(n));

  // ============= submit ===========================

  // send the form if all the inputs are valid and formValidate was called from submit (input === 'submit')
  if (input === 'submit' && checkInputsValid() === true) {

    // console.log('Fetching form because formvalid is ' + formvalid);
    // console.log('and honeypot value length is ' + contactnickname.value.length);
    
    // displayLoading is only called once, but might be useful
    // elsewhere so keep it as named function
    displayLoading();
    fetchForm();

  } else {

    // console.log('Not fetching form');
    // see https://stackoverflow.com/questions/16861325/honeypot-implementation

  }
}

// right, gonna try a separate function for the blur validation
function validateInput(input) {

    console.log('validating input with input: ' + input);

    let errorMsg = '';

    switch (input) {

      // ==================== name ==========================
      case 'contactname':

        // name not required, still needs check for maxlength though

        // NB there's a validateInput for name in verifyRecaptcha
        // just in case it doesn't get validated by a focusEvent

        /*
        if (contactname.value === '' || contactname == null) {
          errorMessage('contact', 'name', 'Name is required');
        }
        */
    
        // check for maxlength
        // input maxlength is limiting the inout to 50, but leave the check here for good measure
        errorMsg = (contactname.value.length > 50) ? 'No more than 50 characters for your name, please!' : '';
        errorMessage('contact','name', errorMsg);
        break;
      
      // ==================== email ==========================
      case 'contactemail':
  
        if (contactemail.value === '' || contactemail == null) {
          errorMsg = 'Please enter your email address'
        }
    
        // if email field isn't empty, check it's vaguely email-like
        // think the simplest pattern to .test is /^\S+@\S+$/
        const r = /^\S+@\S+$/;
        if (contactemail.value !== '' && r.test(contactemail.value) !== true) {
          errorMsg = 'Please provide a properly formatted email address';
        }
    
        // check for maxlength
        if (contactemail.value.length > 320) {
          errorMsg = 'Email address cannot be more than 254 characters.';
        }
    
        errorMessage('contact', 'email', errorMsg);
        break;

      // ==================== message ==========================
      case 'contactmessage':

        if (contactmessage.value === '' || contactmessage == null) {
          errorMsg = 'Please enter a message';
        }
    
        // check for maxlength
        if (contactmessage.value.length > 6000) {
          errorMsg = 'Message cannot be more than 6000 characters, sorry!';
        }
    
        errorMessage('contact', 'message', errorMsg);
        break;

      // ==================== recaptcha ==========================
      case 'contactrecaptcha':

        // the recaptcha widget callback sets recaptcha response
        // so we know its value is either the token or ''
        // console.log(recaptchaResponse);
    
        errorMsg = (recaptchaResponse.length === 0) ? 'Please confirm that you\'re not a robot!' : '';
        errorMessage('contact', 'recaptcha', errorMsg);

    }


    // always check if it's ok to enable the submit button
    if (checkInputsValid() === true) {
      
      // console.log('Form is good to go');
      disableSubmit(false);

    } else {

      // in case anything's changed since last validateinput
      // console.log('Form is bad');
      disableSubmit(true);

    }

}

function errorMessage(form, input, text) {

  // console.log('errorMessage function for ' + form + '-' + input + '-error');

  // update the inputsStatus object
  inputsStatus[form + input].valid = (text.length > 0) ? false : true;
  inputsStatus[form + input].errormsg = text;

  // console.log('valid: ' + inputsStatus[form + input].valid);
  // console.log('errormsg: ' + inputsStatus[form + input].errormsg);

  // set the error message
  document.getElementById(form + '-' + input + '-error').textContent = text;
  // and the hidden error message
  document.getElementById(form + '-' + input + '-error-hidden').textContent = text;

}

// try as async await
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises#async_and_await
function fetchForm() {

  // add the input values to the object
  contactObj = {

    name: contactname.value,
    email: contactemail.value,
    msg: contactmessage.value,
    // the recaptcha token
    token: recaptchaResponse
  };

  // console.log('Doing the fetch function');

  // do the fetch
  fetch('php/contact_process.php', {
    method: 'post',
    body: JSON.stringify(contactObj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      // this gets the text of the response and returns it to the next .then
      // which uses it as an argument in its function

      return response.text();
    })
    .then(function (text) {
      // console.log(text);

      // success!

      // following was named function (successMessage();)
      // but it was only called once and is just two other function calls

      // hide the submit button
      setVisible(contactsubmit, false);

      // show the success message
      setVisible(contactsuccess, true);

      // maybe clear the form?
      // maybe show a reset form button?

    })
    .catch(function (error) {
      // console.error(error);
    });

}

function verifyRecaptcha(token) {


  recaptchaResponse = token;

  // right gonna try this as part of the validation!
  validateInput('contactrecaptcha');

  // also validate the name input here as well 
  // in case it's never been focusouted
  // if it doesn't get validated the submit button won't activate
  validateInput('contactname');

}

// for when the recaptcha expires - see html attribute data-expired-callback="handleCaptchaExpired"
// data-expired-callback now just calls resetForm
// the dedicated handleCaptchaExpired() function was only calling resetForm anyway!
function resetForm() {

  // reset recaptcha response
  recaptchaResponse = '';

  // hide the success message
  setVisible(contactsuccess, false);
  
  // reset the submit button
  contactsubmit.textContent = 'Send Message';

  disableSubmit(true);
  // show the submit button
  setVisible(contactsubmit, true);

}

// when fetch starts (when submit passes all the validation)
function displayLoading() {

  // change the submit button textcontent
  // and clear the loadingDiv child node

  contactsubmit.textContent = '';

  const loadingDiv = document.createElement("div");
  loadingDiv.classList.add('loading');
  contactsubmit.appendChild(loadingDiv);
  // console.log('building the loadingDiv');

}


function disableSubmit(disable) {

  if (disable === true) {

    if (!contactsubmit.classList.contains('disabled')) {
      contactsubmit.classList.add('disabled');
    }

  } else {

    if (contactsubmit.classList.contains('disabled')) {
      contactsubmit.classList.remove('disabled');
    }

  }

}

function setVisible(element, visible) {

  const dataVisible = visible ? true : false;
  const ariaHidden = visible ? false : true;

  element.setAttribute('data-visible', dataVisible);
  element.setAttribute('aria-hidden', ariaHidden);

}