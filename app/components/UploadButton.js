import React from 'react';

const UploadButton = ({ handleFileUpload }) => {
  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div>
      <button className="upload-button" onClick={triggerFileInput}>
        Upload CSV
      </button>
      <input
        type="file"
        id="fileInput"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default UploadButton;
