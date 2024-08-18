import React, { useEffect, useState } from 'react';
import { checkHealthApi } from '../services/apiService';
import { useTranslation } from 'react-i18next';

const HealthIndicator: React.FC = () => {
  const { t } = useTranslation();
  const [healthStatus, setHealthStatus] = useState<'ok' | 'down'>('down');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await checkHealthApi();
        if (response.status === 'ok') {
          setHealthStatus('ok');
        } else {
          setHealthStatus('down');
        }
      } catch (error) {
        setHealthStatus('down');
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`w-4 h-4 rounded-full ${
          healthStatus === 'ok' ? 'bg-green-400 animate-pulse' : 'bg-red-500'
        }`}
      ></div>
      <span className="text-white">
        {healthStatus === 'ok' ? t('serverHealth') : t('serverDown')}
      </span>
    </div>
  );
};

export default HealthIndicator;