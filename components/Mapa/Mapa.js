// components/Mapa.js
'use client'; // Add this line

import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './Mapa.module.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibHVjaW8tc3R1ZGVyIiwiYSI6ImNsMDlraG05ZTAxN3gzam56eDVwc3o4enQifQ.WL9qChb0N0-WqvqS6QThjg';

const Mapa = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [-9.204356, 38.698116],
      zoom: 12
    });

    function addUserLocationToMap(position) {
      const userCoordinates = [position.coords.longitude, position.coords.latitude];
      map.setCenter(userCoordinates);

      map.addSource('user-location', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': userCoordinates
              }
            }
          ]
        }
      });

      map.addLayer({
        'id': 'user-location-point',
        'type': 'circle',
        'source': 'user-location',
        'paint': {
          'circle-radius': 8,
          'circle-color': 'blue'
        }
      });
    }

    map.on('load', () => {
      map.addSource('national-park', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
                  [
                    [-9.203356, 38.697116],
                    [-9.205356, 38.697116],
                    [-9.205356, 38.699116],
                    [-9.203356, 38.699116],
                    [-9.203356, 38.697116],
                  ]
                ]
              }
            },
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [-9.204356, 38.698116],
                'properties': {
                  'name': 'Belem'
                }
              }
            }
          ]
        }
      });

      map.addLayer({
        'id': 'park-boundary',
        'type': 'fill',
        'source': 'national-park',
        'paint': {
          'fill-color': 'red',
          'fill-opacity': 0.2
        },
        'filter': ['==', '$type', 'Polygon']
      });

      map.addLayer({
        'id': 'park-volcanoes',
        'type': 'circle',
        'source': 'national-park',
        'paint': {
          'circle-radius': 6,
          'circle-color': 'red'
        },
        'filter': ['==', '$type', 'Point']
      });

      // Add symbol layer for text label
      map.addLayer({
        'id': 'park-volcanoes-label',
        'type': 'symbol',
        'source': 'national-park',
        'layout': {
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 1.5], // Adjusted offset for better visibility
          'text-anchor': 'top'
        },
        'paint': {
          'text-color': 'red',
          'text-halo-color': 'white',
          'text-halo-width': 2
        },
        'filter': ['==', '$type', 'Point']
      });
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(addUserLocationToMap, () => {
          alert('Unable to retrieve your location');
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    });

    // Add navigation control (zoom, rotate)
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');

    // Add geolocate control (to locate the user)
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserLocation: true
    });
    map.addControl(geolocate, 'top-right');
    
  }, []);

  return (
    <div>
      <h1>Mapa</h1>
      <p>Exemplo de mapa com a localização do utilizador. Procure um ponto e um polígono!</p>
      <div id="map" className={styles.map}></div>
    </div>
  );
};

export default Mapa;
