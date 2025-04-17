"use client";

import React from 'react'
import styles from './TemperaturaDia.module.css'
import Image from 'next/image';

const { getSunrise, getSunset } = require('sunrise-sunset-js');


function isNight() {
  const latitude = 38.7167;  // Latitude Lisboa
  const longitude = -9.1333;  // Longitude Lisboa
  const date = new Date();

  const sunrise = getSunrise(latitude, longitude, date);
  const sunset = getSunset(latitude, longitude, date);

  if (date < sunrise || date >= sunset) {
    return true;
  } else {
    return false;
  }
}


export default function TemperaturaDia({ forecast, weatherTypeMap, windTypeMap }) {


  //
  // Transform data

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const date = new Date(forecast.forecastDate).toLocaleDateString('pt-PT', options);
  const iconWeather = `w_ic_${isNight() ? 'd' : 'd'}_${forecast.idWeatherType.toString().padStart(2, '0')}anim.svg`

  return (
    <div className={styles.day}>
      <div className={styles.date}>{date}</div>
      <div className={styles.info}>
        <div>
          <div>{weatherTypeMap[forecast.idWeatherType]}. Vento {windTypeMap[forecast.classWindSpeed]}.</div>
          <div className={styles.temperature}>
            <div style={{ background: '#03a9f4', padding: '5px 10px', borderRadius: '5px' }}>{forecast.tMin}°C</div>
            <div style={{ background: 'orange', padding: '5px 10px', borderRadius: '5px' }}>{forecast.tMax}°C</div>
          </div>
        </div>

        <Image
          src={`/icons_ipma_weather/${iconWeather}`}
          alt="Weather icon"
          width={70}
          height={70}
        />
      </div>
    </div>
  )
}
