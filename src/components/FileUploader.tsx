import React from 'react';
import { FileUploaderProps } from '../interfaces/FileUploaderInterface';

const FileUploader: React.FC<FileUploaderProps> = ({ handleFileUpload, csvFileName, t }) => {
  return (
    <div className="mb-4 flex flex-row gap-5">
      <div>
        <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer inline-block">
          {t('uploadCSV')}
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        {csvFileName && <p className="mt-2 text-sm text-gray-600">{t('uploadedFile')}: {csvFileName}</p>}
      </div>
      <div className="self-center">
        <p className="text-sm text-gray-600">{t('uploadCSVMessage')}</p>
      </div>
    </div>
  );
};

export default FileUploader;