import "https://api.tiles.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js";

// MAP CONSTANT
const mapbox_token = 'pk.eyJ1IjoiZnJhYmF0eCIsImEiOiJja2diZWVyeXEwZ2F3MnNwZHVsYm4ydXphIn0.vMjCxPk6BAzzyXe81jTmMg';
mapboxgl.accessToken = mapbox_token; 
//GENERAL CONSTANT
var grey = "#343a40"
var yellow = "#fca311"

// DEFINISCO I BOTTONI SULLA DESTRA
var keywords = ["furti","droga","orso","violenza","violenza_sessuale","truffe","rapine","incidenti_stradali","omicidio","degrado","morti","prostituzione"]
keywords.forEach(key=> createButtons(key) )

function createButtons(text){
    var button = document.createElement("button");
    button.innerHTML = text;
    button.setAttribute("class", "keySelection");
    document.getElementById('keys-buttons').append(button);
}

$('.keySelection').on('click', function(){
    $("."+this.textContent).css('fill', yellow);
});



//INIZIALIZZO LA MAPPA
d3.json('/site/src/trento_total.geojson', function(data) {
  
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

  // CREO LA MAPPA
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/frabatx/ckfs593cm0p7p19qp12hupllr',
    center: [11.122, 46.066],
    zoom: 12
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

  //Creo i punti

  var container = map.getCanvasContainer();
  var svg = d3
    .select(container)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("class", "points")
    // Ensure d3 layer in front of map
    .style("position", "absolute")
    .style("z-index", 10)
    .style("right",0);

  let points = svg
    .selectAll("circle")
    .data(data.features)
    .enter()
      .append("circle")
        .attr("class", function(d){return d.properties.classes})
        .attr("r", 5)
        .style("stroke", "white")
        .style("fill", '#90d4ed')
        .style("opacity", 0);

  render();
  
});

//TODO implementare animazione per il caricamento della mappa iniziale
//TODO implementare bottoni per selezionare i punti in base alle classi

var margin = {left: 70, right: 50},
    width = 900,
    height = 50,
    range = [2011, 2020],
    step = 1; // change the step and if null, it'll switch back to a normal slider

// append svg
var svg = d3.select('div#slider-container').append('svg')
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 900 50")

var slider = svg.append('g')
    .classed('slider', true)
    .attr('transform', 'translate(' + margin.left +', '+ (height/2) + ')');

// using clamp here to avoid slider exceeding the range limits
var xScale = d3.scaleLinear()
    .domain(range)
    .range([0, width - margin.left - margin.right])
    .clamp(true);

// array useful for step sliders
var rangeValues = d3.range(range[0], range[1], step || 1).concat(range[1]);
var xAxis = d3.axisBottom(xScale).tickValues(rangeValues).tickFormat(function (d) {
    return d;
});

xScale.clamp(true);
// drag behavior initialization
var drag = d3.drag()
    .on('start.interrupt', function () {
        slider.interrupt();
    }).on('start drag', function () {
        dragged(d3.event.x);
    });

// this is the main bar with a stroke (applied through CSS)
var track = slider.append('line').attr('class', 'track')
    .attr('x1', xScale.range()[0])
    .attr('x2', xScale.range()[1]);

// this is a bar (steelblue) that's inside the main "track" to make it look like a rect with a border
var trackInset = d3.select(slider.node().appendChild(track.node().cloneNode())).attr('class', 'track-inset');

var ticks = slider.append('g').attr('class', 'ticks').attr('transform', 'translate(0, 4)')
    .call(xAxis);

// drag handle
var handle = slider.append('circle').classed('handle', true)
    .attr('r', 9);

// this is the bar on top of above tracks with stroke = transparent and on which the drag behaviour is actually called
// try removing above 2 tracks and play around with the CSS for this track overlay, you'll see the difference
var trackOverlay = d3.select(slider.node().appendChild(track.node().cloneNode())).attr('class', 'track-overlay')
    .call(drag);

// text to display
var text = svg.append('text').attr('transform', 'translate(' + (width/2) + ', ' + height/3 + ')')
    .text('Value: 0');

// initial transition
slider.transition().duration(300)
    .tween("drag", function () {
        var i = d3.interpolate(0, 10);
        return function (t) {
            dragged(xScale(i(t)));
        }
    });

function dragged(value) {
    var x = xScale.invert(value), index = null, midPoint, cx, xVal;
    if(step) {
        // if step has a value, compute the midpoint based on range values and reposition the slider based on the mouse position
        for (var i = 0; i < rangeValues.length - 1; i++) {
            if (x >= rangeValues[i] && x <= rangeValues[i + 1]) {
                index = i;
                break;
            }
        }
        midPoint = (rangeValues[index] + rangeValues[index + 1]) / 2;
        if (x < midPoint) {
            cx = xScale(rangeValues[index]);
            xVal = rangeValues[index];
        } else {
            cx = xScale(rangeValues[index + 1]);
            xVal = rangeValues[index + 1];
        }
    } else {
        // if step is null or 0, return the drag value as is
        cx = xScale(x);
        xVal = x.toFixed(3);
    }
    // use xVal as drag value
    handle.attr('cx', cx);
    text.text('Year: ' + xVal);

    $(".circle").css('opacity', '0');
    $(".y"+xVal.toString()).css('opacity', '1');
  }