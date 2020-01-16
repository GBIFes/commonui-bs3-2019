import gbifesjs from './settings.js';
import { locale } from './i18n_init.js';

$( document ).ready(function() {
  const path = `${gbifesjs.layoutUrl}i18n/`;

  jQuery.i18n.properties(
    {                                                                                                                     name: 'messages', path, mode: 'both', language: locale, async: true, callback() {
    $(document).euCookieLawPopup().init({
      cookiePolicyUrl : 'https://www.gbif.es/politica-de-cookies/',
      popupPosition : 'bottom',
      colorStyle : 'gbif',
      compactStyle : true,
      popupTitle : '',
      popupText : jQuery.i18n.prop('cookie_message'),
      buttonContinueTitle : jQuery.i18n.prop('cookie_accept_btn'),
      buttonLearnmoreTitle :jQuery.i18n.prop('cookie_policy_btn'),
      buttonLearnmoreOpenInNewWindow : true,
      agreementExpiresInDays : 30,
      autoAcceptCookiePolicy : false,
      htmlMarkup : null
    })
  }});
});
