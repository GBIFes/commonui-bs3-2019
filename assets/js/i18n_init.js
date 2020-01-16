import './url.js';
import gbifesjs from './settings.js';
import './js.cookie.js';

var locale;

// https://github.com/Mikhus/domurl
var currentUrl  = new Url;

const enabledLangs = ['es', 'en', 'ca'];

if (gbifesjs.isDevel) console.log("Is development!");

function i18n_init() {

  locale = currentUrl.query.lang;

  if (gbifesjs.isDevel) console.log(`Lang locale: ${locale}`);

  if (typeof locale === 'undefined') {
    // locale = localStorage.getItem('locale');
    locale = Cookies.get('datos-gbif-es-lang')
  }
  if (gbifesjs.isDevel) console.log(`Initial locale: ${locale}`);

  if (locale === undefined || locale === null) {
    locale = navigator.language.substring(0, 2);
  }

  const isValid = (enabledLangs.indexOf(locale) > -1);

  if (!isValid) {
    locale = 'es';
  }

  if (gbifesjs.isDevel) console.log(`End locale: ${locale}`);

  // localhost
  Cookies.set('datos-gbif-es-lang', locale, { expires: 365, path: '/'});
  // try this
  Cookies.set('datos-gbif-es-lang', locale, { expires: 365, path: '/', domain: '.gbif.es' });

  // localStorage.setItem('locale', locale);

}

if (typeof locale === 'undefined') {
  if (gbifesjs.isDevel) console.log(`init locale: ${locale}`);
  i18n_init();
}

if (typeof Cookies.get('datos-gbif-es-lang-session') === 'undefined' && typeof currentUrl.query.lang === 'undefined') {
  // Workaround to set grails locale
  // This will use to do a uniq lang redirect (to force grails to set the lang for the session)
  var in30Minutes = 1/48;
  // grails default session lifetime is 30min
  Cookies.set('datos-gbif-es-lang-session', '/', { expires: in30Minutes });
  currentUrl.query.lang = locale;
  document.location.search = currentUrl.query;
}

Object.freeze(locale);
Object.freeze(enabledLangs);

export { locale, enabledLangs };
