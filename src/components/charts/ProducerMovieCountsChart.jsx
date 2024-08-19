import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchProducerMovieCounts } from '../../services/apiService';
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProducerMovieCountsChart = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: t('numberOfMoviesChart'),
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchProducerMovieCounts(setLoading);
        const labels = result.map(item => item.name);
        const dataPoints = result.map(item => item.movieCount);

        setChartData({
          labels,
          datasets: [
            {
              label: t('numberOfMoviesChart'),
              data: dataPoints,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4"></div>
      <Bar
        data={chartData}
      />
    </div>
  );
};

export default ProducerMovieCountsChart;