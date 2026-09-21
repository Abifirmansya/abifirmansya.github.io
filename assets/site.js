const translations = document.querySelectorAll('[data-id][data-en]');
const languageButtons = document.querySelectorAll('[data-lang]');

function setLanguage(language) {
  document.documentElement.lang = language;
  translations.forEach((element) => {
    element.textContent = element.dataset[language];
  });
  languageButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.lang === language);
    button.setAttribute('aria-pressed', button.dataset.lang === language ? 'true' : 'false');
  });
  try { localStorage.setItem('abi-site-language', language); } catch { /* Language switching still works when storage is blocked. */ }
}

languageButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

let savedLanguage = 'id';
try { savedLanguage = localStorage.getItem('abi-site-language') === 'en' ? 'en' : 'id'; } catch { /* Use Indonesian by default. */ }
setLanguage(savedLanguage);
