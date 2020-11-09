// //##########################################
// //############   BAR CHART   ###############
// //##########################################

// // set the dimensions and margins of the graph
// var margin = {top: 20, right: 40, bottom: 30, left: 100},
//     width = 600 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// // set the ranges
// var y = d3.scaleBand()
//           .range([height, 0])
//           .padding(0.1);
// var x = d3.scaleLinear()
//           .range([0, width]);
          
// // append the svg object to the body of the page
// // append a 'group' element to 'svg'
// // moves the 'group' element to the top left margin
// var svg_bar = d3.select("#bar-chart").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// // get the data
// d3.csv("/site/src/keywords_count.csv", function(error, data) {
//   if (error) throw error;

//   // format the data
//   data.forEach(function(d) {
//     d.values = +d.values;
//   });

//   // Scale the range of the data in the domains
//   y.domain(data.map(function(d) { return d.keywords; }));
//   x.domain([0, d3.max(data, function(d) { return d.values + 50; })]);

//   // append the rectangles for the bar chart
//   svg_bar.selectAll(".bar")
//       .data(data)
//       .enter().append("rect")
//       .attr("class", "bar")
//       .attr("x", x(10))
//       .attr("width", function(d) { return  x(d.values) + 10; })
//       .attr("y", function(d) { return y(d.keywords); })
//       .attr("height", y.bandwidth())
//       .transition().duration(1000)
//       .style("fill", "#90d4ed");


//   // add the y Axis
//   svg_bar.append("g")
//     .attr("class","axis" )
//     .transition().duration(1000)
//     .call(d3.axisLeft(y));
  
//   var valueMargin = 4;

//   svg_bar.selectAll("bar")
//   .data(data)
//   .enter().append("text")
//   .text(function (d) { return d.values; })
//   .attr("x", function (d) { return x(d.values) + y.bandwidth() - valueMargin; })
//   .attr("y", function (d) { return y(d.keywords) + y.bandwidth() / 2 + valueMargin; })
//   .transition().duration(1000).attr('opacity', 1)
//   .style("fill", "white")
//   .attr("font-size" , "14px")
//   .attr("text-anchor", "right");
// });

// //##########################################
// //############     FINE      ###############
// //##########################################



// set the dimensions and margins of the graph
var margin = {top: 20, right: 40, bottom: 30, left: 100},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);
var x = d3.scaleLinear()
          .range([0, width]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg_bar = d3.select("#bar-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



// load the csv and create the chart
d3.csv(`/site/src/correlationKeyword.csv`, function(d, i, columns) {
  for (var i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}, function(error, data) {
  if (error) throw error;

  var keys = data.columns.slice(1);
  //I colori vanno  impostati dentro la funzione di lettura dati dopo la slice
  // A color scale: one color for each group
  var z = d3.scaleOrdinal()
  .domain(keys)
  .range(d3.schemeSet2);


  data.sort(function(a, b) {return b.total - a.total; });
  y.domain(data.map(function(d) { return d.keys; }));
  x.domain([0, d3.max(data, function(d) { return d.total; })]);

  svg_bar.selectAll(".bar")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("y", function(d) { return y(d.data.keys); })
      .attr("x", function(d) { return x(d[0]) + 10; })
      .attr("width", function(d) { return x(d[1]) - x(d[0]); })
      .attr("height", y.bandwidth())
    
    
  // add the y Axis
  svg_bar.append("g")
    .attr("class","axis" )
    .transition().duration(1000)
    .call(d3.axisLeft(y));


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

// // Creo gli oggetti 
// var matrix = [
//   [735, 0, 8, 0, 9, 33, 0, 2, 2, 0, 0, 0],
//   [0, 35, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
//   [8, 0, 539, 0, 0, 1, 0, 0, 8, 5, 2, 0],
//   [0, 0, 0, 5, 0, 1, 0, 0, 0, 0, 0, 0],
//   [9, 3, 0, 0, 232, 1, 0, 0, 0, 0, 1, 1],
//   [33, 0, 1, 1, 1, 170, 0, 0, 1, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 163, 0, 0, 19, 0, 0],
//   [2, 0, 0, 0, 0, 0, 0, 132, 0, 13, 0, 0],
//   [2, 0, 8, 0, 0, 1, 0, 0, 124, 0, 3, 0],
//   [0, 0, 5, 0, 0, 0, 19, 13, 0, 716, 0, 26],
//   [0, 0, 2, 0, 1, 0, 0, 0, 3, 0, 43, 0],
//   [0, 0, 0, 0, 1, 0, 0, 0, 0, 26, 0, 555]
// ];

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
const svg = d3.select("#chord-diagram")
            .append("svg:svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("svg:g")
            .attr("transform", "translate(" + (margin.left + width/2) + "," + (margin.top + height/2) + ")");


const chord = d3.chord()
            .padAngle(.01)(matrix);


// DISEGNO GLI ARCHI ESTERNI
const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

const g = svg.selectAll("g.group")
            .data(chord.groups)
            .enter().append("svg:g")
            .attr("class", function(d) {return "group " + keywords[d.index];});

g.append("svg:path")
  .attr("class", function(d) {return "arc " + keywords[d.index];})
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
    // .on("mouseover", function(d){
    //     //seleziono tutti quelli che non hanno la key nella source, li abbasso tutti
    //     g.filter(a => a.index != d.source.index)
    //     .style("opacity", 0);
    //     //d3.selectAll(".arc").filter(a => a.index != d.source.index).style('opacity',0);
        
    //     console.log(svg.filter);
        
    // })
    //.on("mouseout", d => console.log('moudeout', d))
    .style("stroke", function(d,i) { return d3.rgb(colors[d.source.index]).darker(); })
    .style("fill", function(d){ return(colors[d.source.index]) }) // colors depend on the source group. Change to target otherwise.
    .style("opacity", 0.7)


//https://observablehq.com/@john-guerra/mouseover-chord-diagram
    // https://observablehq.com/@d3/hierarchical-edge-bundling
    // https://stackoverflow.com/questions/35615781/convert-correlation-dataframe-to-dictionary-key-sample-x-sample-y-value