"use client";

import dynamic from 'next/dynamic';
import 'chart.js/auto';

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

const data = {
  labels: ['Chrome',	'Safari',	'Edge',	'Firefox'],
  datasets: [
    {
      label: 'Distribuição Percentual de Utilização de Browsers',
      data: [62.58,	20.47,	5.27,	2.81],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const BarChart = () => {
  return (
    <div>
      <h4>Utilização de Browsers em Portugal</h4>
      <Bar data={data} />
    </div>
  );
};
export default BarChart;
