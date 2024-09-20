import React from 'react';

const DownloadExcelButton = () => {
  const handleDownload = () => {
    window.location.href = '/api/get-excel';
  };

  return (
    <button onClick={handleDownload}>
      Excel faylini yuklab olish
    </button>
  );
};

export default DownloadExcelButton;
