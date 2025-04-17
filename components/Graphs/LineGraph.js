"use client";

import dynamic from 'next/dynamic';
import 'chart.js/auto';

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

const data = {
  labels: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
  datasets: [
    {
      label: 'Percentagem da população que utiliza Internet em Portugal',
      data: [0.10023057, 0.2504265, 0.4501616, 0.71890575, 1.4943346, 2.9808776, 4.953002, 9.870446, 14.742338, 16.430468, 18.087137, 19.37, 29.67, 31.78, 34.99, 38.01, 42.09, 44.13, 48.27, 53.3, 55.249996, 60.339996, 62.0956, 64.59, 68.63286, 70.42357, 73.791214, 74.660965, 75.346375, 78.26166, 82.30903, 84.49691],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const LineChart = () => {
  return (
    <div>
      <h4>Utilização da Internet em Portugal</h4>
      <Line data={data} />
    </div>
  );
};
export default LineChart;