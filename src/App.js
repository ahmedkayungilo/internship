import React, { useRef, useEffect, useState } from 'react';
import './App.css';



import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

var number = 0

mapboxgl.accessToken = 'pk.eyJ1IjoiYWhtZWRrYXl1bmdpbG8iLCJhIjoiY2xpem5rczFnMGZ6NjNkdDh3dDFxdW85MyJ9.kPBSgey9na3xFmgcyAS0lw';

function App() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);


  



  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: 'ahmed',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
      doubleClickZoom: false,
    });

    map.current.on('dblclick', (e) => {
      number ++;

    
// Add markers to the map.
const marker = new mapboxgl.Marker()
.setLngLat([e.lngLat['lng'], e.lngLat['lat']])
.setPopup(new mapboxgl.Popup({ closeButton: false }))
.addTo(map.current);

var markerElement = marker.getElement();

markerElement.addEventListener('click', function() {


  var popupContent = document.createElement('div');
popupContent.innerHTML = `
    <h3>No Note</h3>
    <button id="editButton">Edit</button>
    <button id="deleteButton">Delete</button>
`;

marker.getPopup().setDOMContent(popupContent);

popupContent.querySelector('#editButton').addEventListener('click', function foo() {
 
  var newContent = document.createElement('input');
  newContent.type = 'text';
  newContent.addEventListener('change', function() {
      marker.getPopup().setHTML(`
      <h3>${this.value}</h3>
      <button id="editButton">Edit</button>
      <button id="deleteButton">Delete</button>
  `);

  });
  marker.getPopup().setDOMContent(newContent);

});

popupContent.querySelector('#deleteButton').addEventListener('click', function() {
  marker.remove();
});

});

markerElement.addEventListener('mouseover', function() {
  marker.togglePopup();
});

markerElement.addEventListener('mouseleave', function() {
  marker.togglePopup();
});

      
      console.log(e);
      
    })
  });


  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
    });

     
    return (
      <div>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div id='ahmed' className="map-container" />
      </div>



    );
}

export default App;
