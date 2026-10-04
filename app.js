import { projects } from './projects.js';
const section = document.querySelector('#projects');
for (const article of section.querySelectorAll('.project')) article.remove();
const translated = (tag, es, en) => {
  const element = document.createElement(tag);
  element.dataset.es = es; element.dataset.en = en; element.textContent = es;
  return element;
};
projects.forEach((project, index) => {
  const article = document.createElement('article'); article.className = 'project';
  const number = document.createElement('div'); number.className = 'number'; number.textContent = String(index + 1).padStart(2, '0');
  const body = document.createElement('div');
  const category = document.createElement('p'); category.className = 'category'; category.textContent = project.category;
  const name = document.createElement('h3'); name.textContent = project.name;
  const tags = document.createElement('ul'); tags.className = 'tags';
  for (const tag of project.tags) { const item = document.createElement('li'); item.textContent = tag; tags.append(item); }
  const detail = document.createElement('details');
  detail.append(translated('summary', 'Decisiones y alcance', 'Decisions and scope'), translated('p', project.detailEs, project.detailEn));
  body.append(category, name, translated('p', project.es, project.en), tags, detail);
  const action = translated(project.url ? 'a' : 'span', project.url ? (project.demo ? 'Abrir demo ↗' : 'Ver repositorio ↗') : (project.statusEs ?? 'Práctica · privado'), project.url ? (project.demo ? 'Open demo ↗' : 'View repository ↗') : (project.statusEn ?? 'Training · private'));
  action.className = 'demo'; if (project.url) action.href = project.url;
  article.append(number, body, action); section.insertBefore(article, section.querySelector('.scope'));
});
section.querySelector('.section-title span').textContent = `01 — ${String(projects.length).padStart(2, '0')}`;
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
