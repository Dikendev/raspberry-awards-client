import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchMoviesByYear } from '../services/apiService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MoviesByYearChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Movies',
        data: [],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchMoviesByYear();
        const labels = result.map(item => item._id);
        const dataPoints = result.map(item => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Number of Movies',
              data: dataPoints,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default MoviesByYearChart;