




mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhYmF0eCIsImEiOiJja2diZWVyeXEwZ2F3MnNwZHVsYm4ydXphIn0.vMjCxPk6BAzzyXe81jTmMg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/frabatx/ckidhutth015z19o0bltl5q0m', // stylesheet location
    center: [11.122, 46.066],
    zoom: 10// starting zoom
});

map.on('load', function(){
    map.addSource('quartieri', {
        type: 'geojson',
        data: '/src/countQuartieri.geojson'
      });
})

