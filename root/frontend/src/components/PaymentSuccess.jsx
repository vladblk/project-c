import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Payment.css';

function PaymentSuccess() {
  return (
    <div className="payment">
      <h2>Payment Successfully Processed</h2>
      <Link to="/">
        <button>Return to Homepage</button>
      </Link>
    </div>
  );
}

export default PaymentSuccess;
