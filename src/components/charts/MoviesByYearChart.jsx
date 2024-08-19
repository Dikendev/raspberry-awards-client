import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {  moviesByStudio, moviesByYear } from '../../services/apiService';
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MoviesChart = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: t('numberOfMoviesChart'),
        data: [],
        backgroundColor: 'rgba(34, 15, 74, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataType, setDataType] = useState('year'); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (dataType === 'year') {
          result = await moviesByYear();
        } else {
          result = await moviesByStudio();
        }
        const labels = result.map(item => item._id);
        const dataPoints = result.map(item => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: t('numberOfMoviesChart'),
              data: dataPoints,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        setError('Failed to fetch data',error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataType]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-col sm:flex-row">
        <button
          onClick={() => setDataType('year')}
          className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          {t('moviesByYear')}
        </button>
        <button
          onClick={() => setDataType('studio')}
          className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
        >
          {t('moviesByStudio')}
        </button>
      </div>
      <Bar data={chartData} />
    </div>
  );
};

export default MoviesChart;