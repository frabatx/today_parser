// import "https://api.tiles.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js";

// // MAP INITIALIZATION
// const mapbox_token = 'pk.eyJ1IjoiZnJhYmF0eCIsImEiOiJja2diZWVyeXEwZ2F3MnNwZHVsYm4ydXphIn0.vMjCxPk6BAzzyXe81jTmMg';
// mapboxgl.accessToken = mapbox_token; 

// d3.json('/site/src/trento_total.geojson', function(data) {
//   //FUNZIONE CHE SERVE PER NORMALIZZARE LE KEYWORDS NEL DATABASE
//   // for(var i = 0; i < data.properties.length ; i ++){
//   //     data.properties[i].keywords = JSON.parse(data.properties[i].keywords.replace(/'/g, '"'));  
//   // }
//   // console.log(JSON.parse(data.properties[0].keywords.replace(/'/g, '"')));    

//   // Projection method:
//   // Project geojson coordinate to the map's current state
//   function project(d) {
//     return map.project(new mapboxgl.LngLat(d[0], d[1]));
//   }

//   // Render method redraws lines
//   function render() {
//     d3.selectAll(".circle")
//       .attr("cx", function(d) {
//         return project(d.geometry.coordinates).x;
//       })
//       .attr("cy", function(d) {
//         return project(d.geometry.coordinates).y;
//       })
//       ;
//   }


//   function createMap(data) {
//     map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/frabatx/ckfs593cm0p7p19qp12hupllr',
//         center: [11.122, 46.066],
//         zoom: 13
//       });
//     map.scrollZoom.disable();

//     map.on("viewreset", render);
//     map.on("move", render);
//     map.on("moveend", render);

//     // Optional: Modify map with d3
//     d3.selectAll(".mapboxgl-canvas")
//       .style("opacity", 1)
//       .style("position", "absolute")
//       .style("z-index", 1);
//     return data;
//   }

//   function createDots(data, svg) {
//     var container = map.getCanvasContainer();
//     var svg = d3
//       .select(container)
//       .append("svg")
//       .attr("width", "100%")
//       .attr("height", 2000)
//       .attr("class", "points")
//       // Ensure d3 layer in front of map
//       .style("position", "absolute")
//       .style("z-index", 10);

//     let points = svg
//       .selectAll("circle")
//       .data(data.features)
//     points.exit().remove()
//     points.enter()
//         .append("circle")
//           .attr("class", "circle")
//           .attr("r", 5)
//           .style("stroke", "white")
//           .style("fill", '#90d4ed')
//           .style("opacity", 1);

//     render();
//   }
 
//   function filterDataYear(data, start, stop){
//     var newData={};
//     newData.type = "FeatureCollection";
//     newData.features = [];
//     newData.properties = [];

//     for(var i=0;i<data.properties.length;i++){
//       if(data.properties[i].year>=start.toString() && data.properties[i].year<=stop.toString()){
//         newData.features.push(data.features[i]);
//         newData.properties.push(data.properties[i]);
//       }
//     }
//     return newData;
//   }

//   function createSlider(data){

//     var slider = createD3RangeSlider(2011, 2020, "#slider-container");
//     slider.range(2011,2012);
//     return slider;
//   }
//   //console.log(JSON.parse(data.properties[0].keywords.replace(/'/g, ' " ')));    
  
//   createMap(data);
//   var slider = createSlider(data);
  
  
//   slider.onChange(function(newRange){
//     var newData = filterDataYear(data,newRange.begin,newRange.end)
    
//     d3.selectAll('svg.points').remove()
//     createDots(newData);
//   });
// });

import "https://api.tiles.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js";

// MAP INITIALIZATION
const mapbox_token = 'pk.eyJ1IjoiZnJhYmF0eCIsImEiOiJja2diZWVyeXEwZ2F3MnNwZHVsYm4ydXphIn0.vMjCxPk6BAzzyXe81jTmMg';
mapboxgl.accessToken = mapbox_token; 

d3.json('/site/src/trento_total.geojson', function(data) {
  //FUNZIONE CHE SERVE PER NORMALIZZARE LE KEYWORDS NEL DATABASE
  // for(var i = 0; i < data.properties.length ; i ++){
  //     data.properties[i].keywords = JSON.parse(data.properties[i].keywords.replace(/'/g, '"'));  
  // }
  // console.log(JSON.parse(data.properties[0].keywords.replace(/'/g, '"')));    

  // Projection method:
  // Project geojson coordinate to the map's current state
  console.log(data)
  
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
      })
      ;
  }


  // function filterDataYear(data, start, stop){
  //   var newData={};
  //   newData.type = "FeatureCollection";
  //   newData.features = [];
  //   newData.properties = [];

  //   for(var i=0;i<data.features.properties.length;i++){
  //     if(data.properties[i].year>=start.toString() && data.properties[i].year<=stop.toString()){
  //       newData.features.push(data.features[i]);
  //       newData.properties.push(data.properties[i]);
  //     }
  //   }
  //   return newData;
  // }

  //console.log(JSON.parse(data.properties[1].keywords.replace(/'/g, ' " ')));    
  //console.log(data)
  

  // function listKeywordsData(data){
  //   var stringaClasse = " circle"
  //   var newData={};
  //   newData.type = "FeatureCollection";
  //   newData.features = [];
  //   newData.properties = [];

  //   for(var i=0;i<data.properties.length;i++){
  //     newData.features.push(data.features[i]);
  //     newData.properties.push(data.properties[i]);
  //     newData.properties[i].list_keywords = JSON.parse(data.properties[i].list_keywords.replace(/'/g, '"'));
  //     //ciclo sulle duove liste ed asegno una stringa che ne identifichi la classe
  //     var yearString = " ".concat(newData.properties[i].year.toString())
  //     data.properties[i].classes = data.properties[i].list_keywords.join(' ').concat(stringaClasse).concat(yearString);
  //   }
  //   return newData;
  // }

  // CREO LA MAPPA
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/frabatx/ckfs593cm0p7p19qp12hupllr',
    center: [11.122, 46.066],
    zoom: 13
  });
  map.scrollZoom.disable();

  map.on("viewreset", render);
  map.on("move", render);
  map.on("moveend", render);

  // Optional: Modify map with d3
  d3.selectAll(".mapboxgl-canvas")
    .style("opacity", 1)
    .style("position", "absolute")
    .style("z-index", 1);

  // CREO I PUNTI
  var newData = listKeywordsData(data);
  console.log(newData)

  var container = map.getCanvasContainer();
  var svg = d3
    .select(container)
    .append("svg")
    .attr("width", "100%")
    .attr("height", 2000)
    .attr("class", "points")
    // Ensure d3 layer in front of map
    .style("position", "absolute")
    .style("z-index", 10);

  let points = svg
    .selectAll("circle")
    .data(newData.features)
    .enter()
      .append("circle")
        .attr("class", "circle")
        .attr("r", 5)
        .style("stroke", "white")
        .style("fill", '#90d4ed')
        .style("opacity", 1);

  render();
  
  // CREO LO SLIDER

  // NEL CASO IO RIESCA AD IMPLEMENTARE LA DEFINIZIONE DI CLASSE BASATA SULLE features
  // BISOGNEREBBE CAMBIARE LA FUNZIONE DI FILTRAGGIO E FARLA PER CLASSE
  var slider = createD3RangeSlider(2011, 2020, "#slider-container");
  slider.range(2011,2012);
  slider.onChange(function(newRange){
    var newData = filterDataYear(data,newRange.begin,newRange.end)
  
    d3.selectAll('svg.points').remove()
    createDots(newData);
  });
});



