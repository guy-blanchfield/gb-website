const today = new Date();
const year = today.getFullYear();

const copyrightYear = document.querySelector('.copyright-year');
copyrightYear.textContent = year;