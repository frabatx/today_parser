//##########################################
//############   BAR CHART   ###############
//##########################################

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
var svg = d3.select("#bar-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("/site/src/keywords_count.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.values = +d.values;
  });

  // Scale the range of the data in the domains
  y.domain(data.map(function(d) { return d.keywords; }));
  x.domain([0, d3.max(data, function(d) { return d.values + 50; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", x(10))
      .attr("width", function(d) { return  x(d.values) + 10; })
      .attr("y", function(d) { return y(d.keywords); })
      .attr("height", y.bandwidth())
      .transition().duration(1000)
      .style("fill", "#90d4ed");


  // add the y Axis
  svg.append("g")
    .attr("class","axis" )
    .transition().duration(1000)
    .call(d3.axisLeft(y));
  
  var valueMargin = 4;

  svg.selectAll("bar")
  .data(data)
  .enter().append("text")
  .text(function (d) { return d.values; })
  .attr("x", function (d) { return x(d.values) + y.bandwidth() - valueMargin; })
  .attr("y", function (d) { return y(d.keywords) + y.bandwidth() / 2 + valueMargin; })
  .transition().duration(1000).attr('opacity', 1)
  .style("fill", "white")
  .attr("font-size" , "14px")
  .attr("text-anchor", "right");
});

