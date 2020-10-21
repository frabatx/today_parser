import "https://api.tiles.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js";

// MAP INITIALIZATION

const mapbox_token = 'pk.eyJ1IjoiZnJhYmF0eCIsImEiOiJja2diZWVyeXEwZ2F3MnNwZHVsYm4ydXphIn0.vMjCxPk6BAzzyXe81jTmMg';
mapboxgl.accessToken = mapbox_token; 

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/frabatx/ckfs593cm0p7p19qp12hupllr',
  center: [11.122, 46.066],
  zoom: 11
});
// disable map zoom when using scroll
map.scrollZoom.disable();

//recupero i dati in json e aggiungo un marker su ogni punto
fetch("/trento/trento_total.geojson")
  .then(response => response.json())
  .then(data=> {
    const {features, properties} = data;
    //console.log(features, properties);
    // features.forEach(feature => {
    //   new mapboxgl.Marker({
    //     color: "red"
    //   })
    //     .setLngLat(feature.geometry.coordinates)
    //     .addTo(map);
    // })
  });

// CIRCLE MAP
map.on('load',function(){
  map.addSource('points', {
    'type': 'geojson',
    'data':
    '/trento/trento_total.geojson'
  });
  
  map.addLayer(
    {
    'id': 'cerchi',
    'type': 'circle',
    'source': 'points',
    'minzoom': 7,
    'paint': {
    // Size circle radius by earthquake magnitude and zoom level
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      7,
      ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
      16,
      ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
      ],
      'circle-color': 'blue',
      'circle-stroke-color': 'white',
      'circle-stroke-width': 1,
      // Transition from heatmap to circle layer by zoom level
      'circle-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        7,
        0,
        8,
        1
      ]
      }
    },
    'waterway-label'
  );
});


// D3 SLIDER
