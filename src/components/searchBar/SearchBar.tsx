import React from 'react';
import { SearchBarProps } from './SearchBarPropsInterface';

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange, searchQueries, t }) => {
  return (
    <div className="mb-4 flex flex-col gap-2">
      <input
        type="text"
        name="title"
        value={searchQueries.title}
        onChange={onSearchChange}
        placeholder={t('searchTitle')}
        className="border px-4 py-2 rounded"
      />
      <input
        type="text"
        name="year"
        value={searchQueries.year}
        onChange={onSearchChange}
        placeholder={t('searchYear')}
        className="border px-4 py-2 rounded"
      />
      <input
        type="text"
        name="producer"
        value={searchQueries.producer}
        onChange={onSearchChange}
        placeholder={t('searchProducer')}
        className="border px-4 py-2 rounded"
      />
      <input
        type="text"
        name="studio"
        value={searchQueries.studio}
        onChange={onSearchChange}
        placeholder={t('searchStudio')}
        className="border px-4 py-2 rounded"
      />
    </div>
  );
};

export default SearchBar;