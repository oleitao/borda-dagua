"use client";

import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import TemperaturaDia from '../../components/TemperaturaDia/TemperaturaDia'

import windSpeedClass from '/public/windSpeedClass.json' 
import weatherTypeClass from '/public/weatherTypeClass.json' 

export default function Temperatura() {

  //
  // not working?!

  const fetcher = (url) => axios.get(url).then(res => res.data)
  const { data: weatherData, error } = useSWR(`/api/ipma`, fetcher)

  console.log(weatherData)

  if (error) return <div>Error loading data</div>;
  if (!weatherData) return <div>Loading weatherData...</div>;

  // const weatherData = {"owner": "IPMA", "country": "PT", "data": [{"precipitaProb": "0.0", "tMin": "15.5", "tMax": "21.3", "predWindDir": "N", "idWeatherType": 2, "classWindSpeed": 2, "longitude": "-8.6535", "forecastDate": "2024-07-06", "latitude": "40.6413"}, {"precipitaProb": "0.0", "tMin": "14.0", "tMax": "20.8", "predWindDir": "NW", "idWeatherType": 2, "classWindSpeed": 2, "longitude": "-8.6535", "forecastDate": "2024-07-07", "latitude": "40.6413"}, {"precipitaProb": "12.0", "tMin": "14.4", "tMax": "22.2", "predWindDir": "W", "idWeatherType": 5, "classWindSpeed": 2, "longitude": "-8.6535", "forecastDate": "2024-07-08", "latitude": "40.6413"}, {"precipitaProb": "90.0", "tMin": "17.9", "tMax": "23.0", "predWindDir": "S", "idWeatherType": 9, "classWindSpeed": 1, "longitude": "-8.6535", "forecastDate": "2024-07-09", "classPrecInt": 2, "latitude": "40.6413"}, {"precipitaProb": "37.0", "tMin": "16.2", "tMax": "22.5", "predWindDir": "NW", "idWeatherType": 3, "classWindSpeed": 2, "longitude": "-8.6535", "forecastDate": "2024-07-10", "latitude": "40.6413"}], "globalIdLocal": 1010500, "dataUpdate": "2024-07-06T18:31:02"}

  const weatherTypeMap = {};
  weatherTypeClass.data.forEach(item => {
    weatherTypeMap[item.idWeatherType.toString()] = item.descWeatherTypePT;
  });

  const windTypeMap = {};
  windSpeedClass.data.forEach(item => {
    windTypeMap[item.classWindSpeed.toString()] = item.descClassWindSpeedDailyPT;
  });

  return (
    <>
      <h2>Tempo</h2>
      <p>Informação extraída da <a href="https://api.ipma.pt/" target="_blank">API do IPMA</a>.</p>
      {weatherData.data.data.slice(0, 3).map(
        (forecast, index) =>
          <TemperaturaDia
            key={index}
            forecast={forecast}
            weatherTypeMap={weatherTypeMap}
            windTypeMap={windTypeMap}
          />
      )}
    </>
  );
}
