var enableBieSearch = () => {
  // if (document.location.host !== 'localhost:3002') {

  // Maybe better:
  // if (/^datos.gbif.es/.test(window.location.host)) {

  if (document.location.host !== 'datos.gbif.es') {
    $("#top-search-icon-button").show();
    $("#top-search-icon-button-big").show();
    $("#top-search-icon-button-small").show();
  }
}

$(function(){
  console.log('Enabling BIE search');
  enableBieSearch();
});
