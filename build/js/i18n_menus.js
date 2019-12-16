/**
 * Simple function to internationalise menus and sections of the home page.
 */
function i18n_menus() {
  if (gbifesjs.isDevel) console.log(`locale in i18n_menus: ${locale}`);

  // Add lang param to lang links
  if (locale) {
    $('.top-nav-menu a, .portal-link').each(function () {
      const $this = $(this);
      const _href = $this.attr('href');
      // Take care of #hash in links
      const uri = _href.split('#')[0];
      const hash = _href.split('#')[1];
      if (typeof hash === 'undefined') {
        // without hash
        $this.attr('href', `${_href}?lang=${locale}`);
      } else {
        $this.attr('href', `${uri}?lang=${locale}#${hash}`);
      }
      if (gbifesjs.isDevel) console.log(`Added lang to href: ${$this.attr('href')}`);
    });
  }

  const url = window.location.href;

  for (let i = 0; i < enabledLangs.length; i++) {
    const curlang = enabledLangs[i];
    const $link = $(`.${curlang}-locale-link`); // or grab it by tagname etc

    let localeUrl = url;

    if (url.includes('lang=')) {
      localeUrl = url.replace(/lang=en|lang=es|lang=ca/gi, `lang=${curlang}`);
    } else if (url.includes('?')) {
      localeUrl = `${localeUrl}&lang=${curlang}`;
    } else {
      const uri = url.split('#')[0];
      let hash = url.split('#')[1];
      hash = typeof hash === 'undefined' ? '' : `#${hash}`;
      localeUrl = `${uri}?lang=${curlang}${hash}`;
    }
    $link.attr('href', localeUrl);
    if (gbifesjs.isDevel) console.log(`Added lang to href: ${$link.attr('href')}`);
  }

  // underscore current locale
  $('.wpml-ls-statics-shortcode_actions ul li').each(function (index) {
    const currentItem = $(this).text().replace(/^\s+|\s+$/gm, '').toLowerCase();
    $(this).removeClass('wpml-ls-current-language');
    if (currentItem === locale) {
      $(this).addClass('wpml-ls-current-language');
    }
  });

  const path = `${gbifesjs.layoutUrl}i18n/`;

  if (gbifesjs.isDevel) console.log(`localePath: ${path}`);

  jQuery.i18n.properties({
    name: 'messages',
    path,
    mode: 'both',
    language: locale,
    async: true,
    callback() {
      const keys = [
        'main_title_label',
        'menu_portal_part1',
        'menu_portal_part2',
        'menu_collections',
        'menu_datasets',
        'menu_search',
        'menu_explore',
        'menu_regions',
        'top_menu_dataportal',
        'footer_menu_about',
        'footer_menu_biodiversity_data',
        'footer_menu_collaborations',
        'footer_menu_resources',
        'footer_menu_news',
        'footer_menu_training',
        'footer_menu_software',
        'footer_menu_contact',
        'numbers_occurrences_label',
        'numbers_datasets_label',
        'numbers_institutions_label',
        'numbers_species_label',
        'lang_link_en',
        'lang_link_es',
        'lang_link_cat',
        'footer_legal_info',
        'search_input_advanced1',
        'search_input_advanced2',
        'sub_menu_collections',
        'sub_menu_collections_detail',
        'sub_menu_datasets',
        'sub_menu_datasets_detail',
        'sub_menu_explore',
        'sub_menu_explore_detail',
        'sub_menu_regions',
        'sub_menu_regions_detail',
        'footer_legal_code',
        'banner_search_input_placeholder',
        'main_search_input_placeholder'
      ];

      for (let i = 0; i < keys.length; i++) {
        if (keys[i].endsWith('_placeholder')) {
	  const elementID = keys[i].substring(0, keys[i].length - 12);
	  $(`#${elementID}`).attr('placeholder', jQuery.i18n.prop(keys[i]));
        } else {
	  $(`#${keys[i]}`).html(jQuery.i18n.prop(keys[i]));
        }
      }
    }
  });
}
