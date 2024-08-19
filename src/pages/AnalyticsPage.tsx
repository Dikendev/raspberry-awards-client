import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchAnalyticsData } from '../services/apiService';
import Spinner from '../components/Spinner';
import { LargestGapResult, FastestWinsResult } from '../interfaces/AnalyticsInterface';
import MoviesByYearChart from '../components/charts/MoviesByYearChart';
import ProducerMovieCountsChart from '../components/charts/ProducerMovieCountsChart';

const AnalyticsPage: React.FC = () => {
  const { t } = useTranslation();
  const [largestGapResult, setLargestGapResult] = useState<LargestGapResult | null>(null);
  const [fastestWinsResult, setFastestWinsResult] = useState<FastestWinsResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const { largestGap, fastestWins } = await fetchAnalyticsData(setLoading);
        setLargestGapResult(largestGap);
        setFastestWinsResult(fastestWins);
      } catch (error) {
        console.error('Error fetching analytics data', error);
      }
    }
    loadAnalytics();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading && <Spinner />}
      <h1 className="text-2xl font-bold mb-4">{t('producerAnalytics')}</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('largestGap')}</h2>
        {largestGapResult ? (
          <div>
            <p><strong>{t('producerName')}:</strong> {largestGapResult.producer.name}</p>
            <p><strong>{t('largestGapYears')}:</strong> {largestGapResult.largestGap} {t('years')}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t('fastestWins')}</h2>
        {fastestWinsResult ? (
          <div>
            <p><strong>{t('producerName')}:</strong> {fastestWinsResult.producer.name}</p>
            <p><strong>{t('fastestGapYears')}:</strong> {fastestWinsResult.fastestWins} {t('years')}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">{t('numberOfMovies')}</h2>
        <ProducerMovieCountsChart />
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">{t('chooseMoviesByYearOrByStudio')}</h2>
        <MoviesByYearChart></MoviesByYearChart>
      </section>
    </div>
  );
};

export default AnalyticsPage;