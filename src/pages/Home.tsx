import React from 'react';
import { useTranslation } from 'react-i18next';
import raspberryLogo from '../assets/images/raspberry_logo_v2.jpeg'; 

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="text-center">
        <img
          src={raspberryLogo}
          alt="Raspberry Logo"
          className="w-full max-w-xs sm:max-w-xs md:max-w-sm lg:max-w-sm mx-auto mb-6 rounded-lg shadow-lg"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-red-600">{t('welcome')}</h1>
        <p className="text-base sm:text-lg md:text-xl mb-6">
          {t('description')}
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          {t('learnMore')}
        </button>
      </div>
    </div>
  );
};

export default Home;