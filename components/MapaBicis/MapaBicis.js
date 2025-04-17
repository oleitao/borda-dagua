"use client";

import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Mapa.module.css';
import useSWR from 'swr';
import axios from 'axios';


mapboxgl.accessToken = 'pk.eyJ1IjoibHVjaW8tc3R1ZGVyIiwiYSI6ImNsMDlraG05ZTAxN3gzam56eDVwc3o4enQifQ.WL9qChb0N0-WqvqS6QThjg';

const Mapa = () => {

  // axios parses the response directly as JSON
  const fetcher = (url) => axios.get(url).then(res => res.data)
  const { data, error } = useSWR(`/api/gira/availability`, fetcher)
 
  const { dataHello, errorHello } = useSWR(`/api/hello`, fetcher)
  const { dataExample, errorExample } = useSWR(`/api/example`, fetcher)

  useEffect(() => {
    if (data !== undefined) {
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
        // Add bike lanes data
        map.addSource('bike-lanes', {
          'type': 'geojson',
          'data': data
        });

        // Add bike lane points as symbols with bicycle icon
        map.addLayer({
          'id': 'bike-lanes',
          'type': 'symbol',
          'source': 'bike-lanes',
          'layout': {
            'icon-image': 'bicycle-15', // Use a bicycle icon from Mapbox
            'icon-allow-overlap': true,
            'icon-size': 1.0
          }
        });

        // Initialize popup variable to hold the current popup instance
        let popup = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: true
        });

        // Add click event listener for bike-lanes layer
        map.on('click', 'bike-lanes', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const { desig_comercial, num_bicicletas, num_docas } = e.features[0].properties;

          // Ensure popup is closed if already open
          popup.remove();

          // Set popup content
          popup.setLngLat(coordinates)
            .setHTML(`<strong>${desig_comercial}</strong><br>Número de docas: ${num_docas}<br>Número de Bicicletas: ${num_bicicletas}`)
            .addTo(map);
        });

        // Change cursor to pointer when hovering over bike-lanes layer
        map.on('mouseenter', 'bike-lanes', () => {
          map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to default cursor when leaving
        map.on('mouseleave', 'bike-lanes', () => {
          map.getCanvas().style.cursor = '';
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

      return () => {
        map.remove();
      };
    }
  }, [data]);


  return (
    <div>
      <h1>Bicicletas Gira</h1>

      <p>Mapa com as docas Gira em Lisboa.</p>
      <p> Procure no mapa as docas 🚲, clique e veja quantas existem disponíveis!</p>
      {error && <div>Loading bikeLanesData...</div>}
      {!error && <div id="map" className={styles.map}></div>}
      
    </div>
  );
};

export default Mapa;
