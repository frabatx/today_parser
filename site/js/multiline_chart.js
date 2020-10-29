//##########################################
//############   LINE CHART   ##############
//##########################################

// set the dimensions and margins of the graph
var margin = {top: 50, right: 100, bottom: 30, left: 100},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var multiline_svg = d3.select("#multiline-chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
          
          
          
// List of groups (here I have one group per column)
var allGroup = ["furti","droga","orso","violenza","violenza_sessuale","truffe","rapine","incidenti_stradali","omicidio","degrado","morti","prostituzione"]

// A color scale: one color for each group
var myColor = d3.scaleOrdinal()
    .domain(allGroup)
    .range(d3.schemeSet2);

var grey = "#343a40"
var yellow = "#fca311"

//Read the data
d3.csv("src/trendPerYear.csv", function(data) {

    // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
      return {
        name: grpName,
        values: data.map(function(d) {
          return {time: new Date(d.year), value: +d[grpName]};
        })
      };
    });
    // Dati transformati in tuple (time-value)
    console.log(dataReady)

    // Add X axis 
    var x = d3.scaleTime()
      .domain([new Date(2010, 10, 1),new Date(2020, 1, 1)])
      .range([ 0, width ]);
      multiline_svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")))
      .attr("class","axis" )

    //  ASSE X ON TOP
    //  // Add X axis 
    //  var x = d3.scaleTime()
    //  .domain([new Date(2010, 10, 1),new Date(2020, 1, 1)])
    //  .range([ 0, width ]);
    //  multiline_svg.append("g")
    //  .attr("transform", "translate(" + height +"," -width+ ")")
    //  .call(d3.axisTop(x).tickFormat(d3.timeFormat("%Y")))
    //  .attr("class","axis" )


    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [-3,150])
      .range([ height, 0 ]);
      multiline_svg.append("g")
      .call(d3.axisLeft(y))
      .attr("class","axis")

    // Add the lines
    var line = d3.line()
      .x(function(d) { return x(+d.time) })
      .y(function(d) { return y(+d.value)})
    
    multiline_svg.selectAll("myLines")
      .data(dataReady)
      .enter()
      .append("path")
        .attr("class", function(d){ return d.name })
        .attr("d", function(d){ return line(d.values) } )
        // .attr("stroke", function(d){ return myColor(d.name) })
        .attr("stroke", grey)
        .style("stroke-width", 4)
        .style("fill", "none")

    // Add the points
    multiline_svg
      // First we need to enter in a group
      .selectAll("myDots")
      .data(dataReady)
      .enter()
      .append('g')
      //.style("fill", function(d){ return myColor(d.name) })
        .style("fill", grey)
        .attr("class", function(d){ return d.name })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.time) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 3)
        .attr("stroke", "grey")

    // Add a label at the end of each line
    // multiline_svg
    //   .selectAll("myLabels")
    //   .data(dataReady)
    //   .enter()
    //     .append('g')
    //     .append("text")
    //       .attr("class", function(d){ return d.name })
    //       .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
    //       .attr("transform", function(d) { return "translate(" + x(d.value.time) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
    //       .attr("x", 12) // shift the text a bit more right
    //       .text(function(d) { return d.name; })
    //       .style("fill", function(d){ return myColor(d.name) })
    //       .style("font-size", 15)


    //##########################################
    //############     LEGEND     ##############
    //##########################################

    // select the svg area
    var legend_svg = d3.select("#trend-legend")

    // Add one dot in the legend for each name.
    var size = 20
    legend_svg.selectAll("mydots")
    .data(allGroup)
    .enter()
    .append("rect")
        .attr("id", function(d){return d})
        .attr("class", "legenda")
        .attr("x", 10)
        .attr("y", function(d,i){ return 20 + i*(40)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", 150)
        .attr("height", 30)
        .style("fill", grey)
      .on("mouseover",function(d){
          d3.selectAll("path."+ d).raise() //porto la line al primo piano
          d3.selectAll("g."+ d).raise() //porto i point al primo piano
          d3.selectAll("rect#"+ d+".legenda").transition().duration(100).style("fill", yellow)
          d3.selectAll("path."+ d).transition().duration(300).style("stroke", yellow) //cambio il colore della line
          d3.selectAll("g."+ d).transition().duration(300).style("fill", yellow) //cambio il colore deli point
      })
      .on("mouseout",function(d){
        d3.selectAll("rect#"+ d+".legenda").transition().duration(100).style("fill", grey)
        d3.selectAll("path."+ d).transition().duration(300).style("stroke", grey)
        d3.selectAll("g."+ d).transition().duration(300).style("fill", grey)
        d3.selectAll("path."+ d).lower()
        d3.selectAll("g."+ d).raise()
    } )

        
    legend_svg.selectAll("legenda")
    .data(allGroup)
    .enter()
    .append("g")
    .attr("text-align", "center")
    .append("text")
        .attr("x",165/2)
        .attr("y", function(d,i){ return 20 + i*(40)+20}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", "white")
        .style("font-weight", "600")
        .text(function(d){ return d })
        .style("text-anchor", "middle")
        .on("mouseover",function(d){
          d3.selectAll("path."+ d).raise() //porto la line al primo piano
          d3.selectAll("g."+ d).raise() //porto i point al primo piano
          d3.selectAll("rect#"+ d+".legenda").transition().duration(100).style("fill", yellow)
          d3.selectAll("path."+ d).transition().duration(300).style("stroke", yellow) //cambio il colore della line
          d3.selectAll("g."+ d).transition().duration(300).style("fill", yellow) //cambio il colore deli point
      })
      .on("mouseout",function(d){
        d3.selectAll("rect#"+ d+".legenda").transition().duration(100).style("fill", grey)
        d3.selectAll("path."+ d).transition().duration(300).style("stroke", grey)
        d3.selectAll("g."+ d).transition().duration(300).style("fill", grey)
        d3.selectAll("path."+ d).lower()
        d3.selectAll("g."+ d).raise()
    } )
})



// Aggiunta animazione mouseover che permette di evidenziare una linea rispetto alle altre



