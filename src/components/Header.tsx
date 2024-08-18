import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';
import HealthIndicator from './HealthIndicator';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-gray-800 p-4">
      <nav className="container mx-auto flex flex-wrap justify-between items-center">
        <ul className="flex flex-wrap space-x-4 sm:space-x-8 text-white">
          <li className="hover:text-gray-400">
            <Link to="/">{t('home')}</Link>
          </li>
          <li className="hover:text-gray-400">
            <Link to="/raspberry">{t('raspberryAwards')}</Link>
          </li>
          <li className="hover:text-gray-400">
            <Link to="/analytics">{t('analytics')}</Link>
          </li>
          <li className="hover:text-gray-400">
            <Link to="/about">{t('about')}</Link>
          </li>
          {/* <li className="hover:text-gray-400">
            <Link to="/contact">{t('contact')}</Link>
          </li> */}
        </ul>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <button onClick={() => changeLanguage('en')} className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-bold w-10 h-10 rounded-full mr-2">
            <Flag code="US" className="w-8 h-8 rounded-full object-cover" />
          </button>
          <button onClick={() => changeLanguage('pt')} className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-bold w-10 h-10 rounded-full">
            <Flag code="BR" className="w-8 h-8 rounded-full object-cover" />
          </button>
          <HealthIndicator /> {/* Include the HealthIndicator component */}
        </div>
      </nav>
    </header>
  );
};

export default Header;