"use client";

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './Calendar.module.css'; 

export default function CalendarGfg() {
  const [events, setEvents] = useState([]);
  const [value, onChange] = useState(new Date());


  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleDateClick = (date) => {
    const eventDate = formatDate(date); // Format date as YYYY-MM-DD

    const eventName = prompt('Insira o nome do evento para ' + eventDate);
    if (eventName) {
      const newEvent = { date: eventDate, name: eventName };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const highlightDates = ({ date }) => {
    const formattedDate = formatDate(date); // Format date as YYYY-MM-DD
    const eventExists = events.some((event) => event.date === formattedDate);
    return eventExists ? <div className={styles.highlightedDate}></div> : null;
  };

  return (
    <div className={styles.calendarContainer}>
      <h1>Calendário</h1>
      <div className={styles.calendar}>
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={handleDateClick}
          tileContent={highlightDates}
        />
      </div>
      <div className={styles.eventsContainer}>
        <h2>Eventos Adicionados:</h2>
        {events.length === 0 ? (
          <p>Nenhum evento adicionado.</p>
        ) : (
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                <strong>{event.date}</strong>: {event.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
