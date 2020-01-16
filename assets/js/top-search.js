var enableBieSearch = () => {
  // if (document.location.host !== 'localhost:3002') {
  if (document.location.host !== 'datos.gbif.es') {
    $("#top-search-icon-button").show();
    $("#top-search-icon-button-big").show();
    $("#top-search-icon-button-small").show();
  }
}

document.addEventListener("DOMContentLoaded",function(){
  console.log('Enabling BIE search');
  enableBieSearch();
});
