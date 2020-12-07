
mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhYmF0eCIsImEiOiJja2diZWVyeXEwZ2F3MnNwZHVsYm4ydXphIn0.vMjCxPk6BAzzyXe81jTmMg';

var map = new mapboxgl.Map({
    container: 'map-comuni',
    style: 'mapbox://styles/frabatx/ckidhutth015z19o0bltl5q0m', // stylesheet location
    center: [11.08, 46.066],
    zoom: 8// starting zoom
});

map.scrollZoom.disable();

map.on('load', function(){
    map.addSource('quartieri', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/frabatx/today_parser/master/newSite/src/countComuni.geojson'
      });

    

    map.addLayer({
        'id': 'quartieri-fill',
        'type': 'fill',
        'source': 'quartieri',
        'paint': {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'counts'],
                1,'#ffe0b2',
                20,'#ffb74d',
                50,'#ffa726',
                100,'#ff9800',
                200,'#f57c00',
                400,'#e65100',
                1000,'#bf360c',
            ],
            'fill-opacity': 0.50
        }
    },'waterway-label'
    );

    map.addLayer({
        'id': 'bordi',
        'type': 'line',
        'source': 'quartieri',
        'paint': {
            'line-color': '#f57c00',
            'line-width': 2
        }
    },'waterway-label'
    );



    var layers = ['1-20', '20-50', '50-100', '100-200', '200-400', '400-1000', '1000+'];
    var colors = ['#ffe0b2', '#ffb74d', '#ffa726', '#ff9800', '#f57c00', '#e65100', '#bf360c'];
    
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var color = colors[i];
        var item = document.createElement('div');
        var key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;
      
        var value = document.createElement('span');
        value.innerHTML = layer;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    }

    map.on('mousemove', function(e) {
        var states = map.queryRenderedFeatures(e.point, {
          layers: ['quartieri-fill']
        });
        
        if (states.length > 0) {
          document.getElementById('pd-comuni').innerHTML = "<h4><strong>" + states[0].properties.comune + "</strong></h4><p><strong><em>" + states[0].properties.counts + "</strong> articoli</em></p>";
        } else {
          document.getElementById('pd-comuni').innerHTML = '<p>Passa il mouse sui quartieri!</p>';
        }
    });

});




