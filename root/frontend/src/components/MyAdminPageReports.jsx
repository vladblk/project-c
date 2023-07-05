import React from 'react';

import '../style/MyAdminPageReports.css';

const ReportGenerator = () => {
  const handleBtnClick = (reportType) => {
    window.open(
      `http://localhost:3000/api/v1/${reportType}/${reportType}-report`,
      '_blank'
    );
  };

  return (
    <div className="report-generator">
      <h2>Report Generator</h2>
      <div className="report-buttons">
        <button onClick={() => handleBtnClick('users')}>Users Report</button>
        <button onClick={() => handleBtnClick('camps')}>Camps Report</button>
        <button onClick={() => handleBtnClick('products')}>
          Products Report
        </button>
        <button onClick={() => handleBtnClick('reviews')}>
          Reviews Report
        </button>
      </div>
    </div>
  );
};

export default ReportGenerator;
