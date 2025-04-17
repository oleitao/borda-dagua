"use client";

import useSWR from 'swr';
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './MapaBicisGira.module.css';


mapboxgl.accessToken = 'pk.eyJ1IjoibHVjaW8tc3R1ZGVyIiwiYSI6ImNsMDlraG05ZTAxN3gzam56eDVwc3o4enQifQ.WL9qChb0N0-WqvqS6QThjg';

const Mapa = () => {

  //
  // usa route que faz fetch a API EMEL/GIRA e retorna dados
  const { data: bikeLanesData, error } = useSWR('/api/gira/availability');

  useEffect(() => {

    if (error) return <div>Error loading data</div>;
    if (!bikeLanesData) return <div>Loading bikeLanesData...</div>;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [-9.204356, 38.698116],
      zoom: 12
    });

    map.on('load', () => {

      map.addSource('bike-lanes', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',

          //
          // adiciona todas as stations de bikeLanesData como features 

          features: bikeLanesData.features.map(station => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [station.lon, station.lat]
            },
            properties: {
              name: station.name,
              num_bikes: station.num_bicicletas,
              num_slots: station.num_docas
            }
          }))
        }
      });

      // Add bike lane points as symbols with bicycle icon
      map.addLayer({
        id: 'bike-lanes',
        type: 'symbol',
        source: 'bike-lanes',
        layout: {
          'icon-image': 'bicycle-15', // Use a bicycle icon from Mapbox
          'icon-allow-overlap': true,
          'icon-size': 1.5,
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      });

      // Add popup on click for bike lane points
      map.on('click', 'bike-lanes', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const { name, num_bikes, num_slots } = e.features[0].properties;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<strong>${name}</strong><br>Available Bikes: ${num_bikes}<br>Available Slots: ${num_slots}`)
          .addTo(map);
      });

      // Change the cursor to a pointer when hovering over the bike-lanes layer.
      map.on('mouseenter', 'bike-lanes', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'bike-lanes', () => {
        map.getCanvas().style.cursor = '';
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

      // Center map on user's location
      const centerUserLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const userCoordinates = [position.coords.longitude, position.coords.latitude];
            map.setCenter(userCoordinates);
          }, () => {
            alert('Unable to retrieve your location');
          });
        } else {
          alert('Geolocation is not supported by this browser.');
        }
      };

      document.getElementById('centerButton').onclick = centerUserLocation;
    });

    // Clean up map instance on component unmount
    return () => map.remove();

  }, [bikeLanesData, bikeLanesData?.features, error]);

  return (
    <div>
      <h1>Mapa</h1>
      <p>Exemplo de mapa MapBox com representação de pontos de ciclovias e localização do utilizador.</p>
      <button id="centerButton">Center on User Location</button>
      {/* Ensure map container is initially empty */}
      <div id="map" className={styles.map}></div>
    </div>
  );
};

export default Mapa;
