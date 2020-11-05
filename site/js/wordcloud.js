
//SETTINGS
var width = 750,
    height = 750;

//DROPDOWN BUTTON
var keywords = ["furti","droga","orso","violenza","violenza_sessuale","truffe","rapine","incidenti_stradali","omicidio","degrado","morti","prostituzione"]

$(".dropdown-menu").html('');
for(var i = 0; i<keywords.length; i++){
  var $div = $("<a>",{
    value: keywords[i],
  }).text(keywords[i]);
  $div.attr("class","dropdown-item");
  $(".dropdown-menu").append($div);
}

$(function() {
  $('.dropdown-item').on('click', function(e) {
    //inserisco il nome nel bottone.
    
    document.getElementById('keysbutton').innerHTML = this.text;
    document.getElementById('word-cloud').innerHTML = '';
    console.log(this.text);
    const newLocal = `/site/src/wordcloud/${this.text}.csv`;
    //##########################################
    //############   WORD CLOUD   ##############
    //##########################################
    d3.csv(newLocal, function(data){
      
      var leaderScale = d3.scaleLinear();
      //formatter
      var s = d3.formatSpecifier("f");
      s.precision = d3.precisionFixed(0.01);
      var formatter = d3.format(s);
      
      var leaders = data
        .map(function(d){return{text: d.key, size: formatter(parseFloat(d.value))};})
        //.sort(function(a,b){ return d3.descending(a.size, b.size);})
        //.slice(0,100);

      var array_size = leaders.map(function(d){return parseFloat(d.size)});

      var min = d3.min(array_size);
      var max = d3.max(array_size);
      
      leaderScale
      .domain([ min,max])
      .range([8,80]);

      d3.layout.cloud()
          .size([width, height])
          .words(leaders)
          .padding(6)
          .rotate(function() { return ~~(Math.random() * 2) * 90; })
          //.font("Monserrat")
          .fontSize(function(d) { return leaderScale(parseFloat(d.size)); })//console.log(leaderScale(d.size));
          .on("end", drawCloud)
          .start();

    })

  });
});


function drawCloud(words) {

  // A color scale: one color for each group
  var myColor = d3.scaleOrdinal()
  .domain(words)
  .range(d3.schemeSet2);

  d3.select("#word-cloud")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
    .transition().duration(300)
    .attr("id","wordcloud" )
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-weight", 700)
      .style("fill",function(d,i){return myColor(i)})
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
      
}
