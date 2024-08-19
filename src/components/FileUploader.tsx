import React, { ChangeEvent, RefObject } from 'react';

interface FileUploaderProps {
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  csvFileName: string | null;
  t: (key: string) => string;
  fileInputRef: RefObject<HTMLInputElement>;
}


const FileUploader: React.FC<FileUploaderProps> = ({ handleFileUpload, csvFileName, t,fileInputRef }) => {
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
            ref={fileInputRef}
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