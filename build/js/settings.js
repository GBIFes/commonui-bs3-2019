var gbifesjs = typeof gbifesjs === 'undefined'? {
    isDevel: true,
    layoutUrl: "https://demo.gbif.es/",
    sentryUrl: "https://e8b7082a5d2f4d659690e56438f6015c@sentry.comunes.org/17"
}: gbifesjs;
console.log('settings loaded');

export default gbifesjs;
