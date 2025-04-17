import useSWR from 'swr';

const BikeLanesComponent = () => {
  const fetcher = (url) => fetch(url).then(res => res.json());

  const { data, error } = useSWR('https://opendata.emel.pt/cycling/gira/station/availability', fetcher);

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Bike Lanes</h2>
      <ul>
        {data.features.map((feature, index) => (
          <li key={index}>
            {feature.properties.desig_comercial} - Bikes: {feature.properties.num_bicicletas}, Docs: {feature.properties.num_docas}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BikeLanesComponent;
