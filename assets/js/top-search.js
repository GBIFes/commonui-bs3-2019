var enableBieSearch = () => {
  // if (document.location.host !== 'localhost:8099') {
  if (document.location.host !== 'datos.gbif.es') {
    console.log('Enabling BIE search');
    $("#top-search-icon-button").show();
    $("#top-search-icon-button-big").show();
    $("#top-search-icon-button-small").show();
  }
}

document.addEventListener("DOMContentLoaded",function(){
  enableBieSearch();
});
