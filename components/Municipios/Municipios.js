"use client";

import React from 'react';
import useSWR from 'swr';

// Define the fetcher function
const fetcher = url => fetch(url).then(res => res.json());

export default function Municipios() {
  // Fetch data using SWR
  const { data: municipalities, error } = useSWR('https://api.carrismetropolitana.pt/municipalities', fetcher);

  // Handle loading and error states
  if (error) return <div>Error loading data</div>;
  if (!municipalities) return <div>Loading...</div>;

  municipalities.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <h2>Municípios</h2>
      <p>Extraído do endpoint municipios da <a href="https://api.carrismetropolitana.pt" target="_blank">API da CarrisMetropolitana</a></p>
      <ul>
        {municipalities.map(municipality => (
          <li key={municipality.id}>{municipality.name}</li>
        ))}
      </ul>
    </div>
  );
}
