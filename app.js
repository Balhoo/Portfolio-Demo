const button = document.querySelector('#language');
button.addEventListener('click', () => {
  const language = document.documentElement.lang === 'es' ? 'en' : 'es';
  document.documentElement.lang = language;
  for (const element of document.querySelectorAll('[data-es][data-en]')) {
    element.textContent = element.dataset[language].replaceAll('\\n', '\n');
  }
  button.textContent = language === 'es' ? 'EN' : 'ES';
  button.setAttribute('aria-label', language === 'es' ? 'Switch to English' : 'Cambiar a español');
  document.querySelector('nav').setAttribute('aria-label', language === 'es' ? 'Principal' : 'Main');
});
