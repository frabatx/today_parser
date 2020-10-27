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
    //      .setLngLat(feature.geometry.coordinates)
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
      'circle-color': '#90d4ed',
      'circle-stroke-color': '#90d4ed',
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


//##########################################
//############ CHORD DIAGRAM ###############
//##########################################

// Creo gli oggetti 
var matrix = [
  [0, 0, 8, 0, 9, 33, 0, 2, 2, 0, 0, 0],
  [0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
  [8, 0, 0, 0, 0, 1, 0, 0, 8, 5, 2, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [9, 3, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
  [33, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0],
  [2, 0, 8, 0, 0, 1, 0, 0, 0, 0, 3, 0],
  [0, 0, 5, 0, 0, 0, 19, 13, 0, 0, 0, 26],
  [0, 0, 2, 0, 1, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 26, 0, 0]
];

var keywords = ["furti","truffa","droga","violenza sessuale" ,"truffe","rapine","incidenti stradali" ,"omicidio","degrado","morti" ,"prostituzione" ,"coronavirus"];
// 4 groups, so create a vector of 4 colors
var colors = [  "#f9665e",
                "#afc7d0",
                "#98e690",
                "#c7eff0",
                "#f5d5fd",
                "#fdc4ec",
                "#ffc2cb", 
                "#c5c2df", 
                "#9b94be", 
                "#f9c8a0",
                "#f28997", 
                "#7b8fa5"];

// Inizializzo le variabili
var margin = {top: 30, right: 25, bottom: 20, left: 25},
width = 800 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom,
innerRadius = Math.min(width, height) * .39,
outerRadius = innerRadius * 1.04;

// Creo l'SVG
var svg = d3.select("#chord-diagram")
            .append("svg:svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("svg:g")
            .attr("transform", "translate(" + (margin.left + width/2) + "," + (margin.top + height/2) + ")");


var chord = d3.chord()
            .padAngle(.01)(matrix);


// DISEGNO GLI ARCHI ESTERNI
var arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

var g = svg.selectAll("g.group")
            .data(chord.groups)
            .enter().append("svg:g")
            .attr("class", function(d) {return "group " + keywords[d.index];});

g.append("svg:path")
  .attr("class", "arc")
  .style("fill", function(d,i){ return colors[i] })
  .attr("d", arc)
  .style("opacity", 0)
  .transition().duration(1000)
  .style("opacity", 1);


// INITIATE NAMES
g.append("svg:text")
  .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
  .attr("dy", ".35em")
  .attr("class", "titles")
  .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
  .attr("transform", function(d) {
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
    +"translate(" + (innerRadius + 15) + ")"
    +(d.angle > Math.PI ? "rotate(180)" : "");
  })
  .transition().duration(1000)
  .text(function(d,i) { return keywords[i]; })
  .style("fill", "white");


//INITIATE INNER CORDS
// Ribbons sono degli oggetti d3 che connetteranno gli archi
// mostrandone le connessioni
var trade = d3.ribbon().radius(210);

// Add the links between groups
g.append("g")
  .datum(chord)
  .selectAll("path")
  .data(function(d) { return d; })
  .enter()
  .append("path")
    .attr("d", trade)
    .style("stroke", function(d,i) { return d3.rgb(colors[d.source.index]).darker(); })
    .style("fill", function(d){ return(colors[d.source.index]) }) // colors depend on the source group. Change to target otherwise.
    .style("opacity", 0.4)








