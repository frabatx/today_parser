import "https://api.tiles.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js";

// MAP INITIALIZATION
const mapbox_token = 'pk.eyJ1IjoiZnJhYmF0eCIsImEiOiJja2diZWVyeXEwZ2F3MnNwZHVsYm4ydXphIn0.vMjCxPk6BAzzyXe81jTmMg';
mapboxgl.accessToken = mapbox_token; 


var map;

d3.json('/site/src/trento_total.geojson', function(data) {
  console.log(data);    
  createMap(data);
  createDots(data);
    });

function createMap(data) {
  map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/frabatx/ckfs593cm0p7p19qp12hupllr',
      center: [11.122, 46.066],
      zoom: 11
    });
  //map.scrollZoom.disable();

  map.on("viewreset", render);
  map.on("move", render);
  map.on("moveend", render);

  // Optional: Modify map with d3
  d3.selectAll(".mapboxgl-canvas")
    .style("opacity", 1)
    .style("position", "absolute")
    .style("z-index", 1);
  return data;
}

function createDots(data) {
  var container = map.getCanvasContainer();

  var svg = d3
    .select(container)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "2000")
    // Ensure d3 layer in front of map
    .style("position", "absolute")
    .style("z-index", 10);

  let dots = svg
    .selectAll("circle")
    .data(data.features)
    .enter()
      .append("circle")
        .attr("class", "circle")
        .attr("r", 3)
        //.style("opacity", 0.7)
        .style("fill", '#90d4ed');

  render();
}

// Projection method:
// Project geojson coordinate to the map's current state
function project(d) {
  return map.project(new mapboxgl.LngLat(d[0], d[1]));
}

// Render method redraws lines
function render() {
  d3.selectAll(".circle")
    .attr("cx", function(d) {
      return project(d.geometry.coordinates).x;
    })
    .attr("cy", function(d) {
      return project(d.geometry.coordinates).y;
    });
}
















// var map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/frabatx/ckfs593cm0p7p19qp12hupllr',
//   center: [11.122, 46.066],
//   zoom: 11
// });
// // disable map zoom when using scroll
// map.scrollZoom.disable();

// // //recupero i dati in json e aggiungo un marker su ogni punto
// // fetch("/site/trento_total.geojson")
// //   .then(response => response.json())
// //   .then(data=> {
// //     const {features, properties} = data;
// //     //console.log(features, properties);
// //     // features.forEach(feature => {
// //     //   new mapboxgl.Marker({
// //     //     color: "red"
// //     //   })
// //     //      .setLngLat(feature.geometry.coordinates)
// //     //     .addTo(map);
// //     // })
// //   }); 
// var data = d3.json();

// // CIRCLE MAP
// map.on('load',function(){
//   map.addSource('points', {
//     'type': 'geojson',
//     'data':'/site/src/trento_total.geojson'
//   });
  
//   map.addLayer(
//     {
//     'id': 'cerchi',
//     'type': 'circle',
//     'source': 'points',
//     'minzoom': 7,
//     'paint': {
//       // Size circle radius by earthquake magnitude and zoom level
//       'circle-radius': [
//         'interpolate',
//         ['linear'],
//         ['zoom'],
//         7,
//         ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
//         16,
//         ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
//         ],
//         'circle-color': '#90d4ed',
//         'circle-stroke-color': '#90d4ed',
//         'circle-stroke-width': 1,
//         // Transition from heatmap to circle layer by zoom level
//         'circle-opacity': [
//           'interpolate',
//           ['linear'],
//           ['zoom'],7,0,8,1]
//         }
//       },
//       'waterway-label'
//   );
// });






