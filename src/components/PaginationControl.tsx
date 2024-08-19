import React from 'react';
import { PaginationControlsProps } from '../interfaces/PaginationControlPropsInterface';

const PaginationControls: React.FC<PaginationControlsProps> = ({ limit, handleLimitChange, page, setPage, t }) => {
  return (
    <div className="mt-4 flex flex-row sm:flex-row justify-between">
      <div className="flex items-center mb-1 sm:mb-0">
        <label htmlFor="limit" className="mr-2">{t('itemsPerPage')}:</label>
        <select
          id="limit"
          className="bg-white border border-gray-300 px-4 py-2 rounded"
          value={limit}
          onChange={handleLimitChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div className="flex justify-end sm:w-1/2 gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={() => setPage(page => Math.max(page - 1, 1))}
        >
          {'<'}
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={() => setPage(page => page + 1)}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;