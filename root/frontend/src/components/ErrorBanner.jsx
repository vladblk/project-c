import React from 'react';

function ErrorBanner({ message }) {
  return (
    <div className="error-banner">
      <p className="error-message">{message}</p>
    </div>
  );
}

export default ErrorBanner;
