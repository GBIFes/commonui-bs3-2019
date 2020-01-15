import './url.js';
import gbifesjs from './settings.js';

var locale;

var currentUrl  = new Url;

const enabledLangs = ['es', 'en', 'ca'];

if (gbifesjs.isDevel) console.log("Is development!");

function i18n_init() {
  // https://caniuse.com/#search=URL
  const url = new URL(window.location.href);

  locale = url.searchParams.get('lang');

  if (locale != null) {
    localStorage.setItem('locale', locale);
  } else {
    locale = localStorage.getItem('locale');
  }

  if (locale === undefined || locale === null) {
    locale = navigator.language.substring(0, 2);
  }

  if (gbifesjs.isDevel) console.log(`Initial locale: ${locale}`);

  const isValid = (enabledLangs.indexOf(locale) > -1);
  if (!isValid) {
    locale = 'es';
    localStorage.setItem('locale', locale);
  }
}

if (gbifesjs.isDevel) console.log(`Current lang: ${currentUrl.query["lang"]}`);

if (typeof locale === 'undefined') {
  i18n_init();
}

if (gbifesjs.isDevel) console.log(`locale: ${locale}`);

export { locale, enabledLangs };
