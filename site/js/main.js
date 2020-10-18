// Funzione di caricamento mappa
$(document).ready(function(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhYmF0eCIsImEiOiJja2diZWVyeXEwZ2F3MnNwZHVsYm4ydXphIn0.vMjCxPk6BAzzyXe81jTmMg';
    
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/frabatx/ckfs593cm0p7p19qp12hupllr',
      center: [11.122, 46.066],
      zoom: 11
    });

    // github raw data url
    var url = 'https://raw.githubusercontent.com/frabatx/today_parser/master/trento/trento_total.geojson'

    //inserisco i punti sulla mappa
    fetchGeojson(url, map);
});

// Funzione che prende ed inserisce sulla mappa i punti
async function fetchGeojson(url, map){
    const response = await fetch(url);
    const geojson = await response.json();
    
    // Inserisco il for all'interno della funzione che aspetta di scaricare i punti da Giuhub
    geojson.features.forEach(function(marker) {
        var el = document.createElement('div');
        el.className = 'marker';
  
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
          .addTo(map);
      });
    
}




