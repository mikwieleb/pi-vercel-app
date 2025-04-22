import React from 'react';
import { makePiPayment } from '../utils/pi-sdk';

const PiPaymentButton = () => {
  return (
    <button onClick={makePiPayment}>
      Payer 0,001 Pi
    </button>
  );
};

export default PiPaymentButton;
