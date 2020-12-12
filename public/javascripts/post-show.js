
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGM5NTciLCJhIjoiY2tpamI2eTZ0MDB5bTJza2FoOWVtbG10NSJ9.tNlxMrujdtiAb4jWvB1-mg';
    
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: post.coordinates,
      zoom: 3
    });
    
    // code from the next step will go here!



// create a HTML element for our post location/marker
var el = document.createElement('div');
el.className = 'marker';

// make a marker for our location and add to the map
new mapboxgl.Marker(el)
        .setLngLat(post.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>'))
        .addTo(map);
;
    