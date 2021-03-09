import React, { useState } from 'react';
import { SubmitButton } from './Button';
import config from '../config';
import { stripeContent } from '../content/steps';

const Payment: React.FC<{
  handlePay: (amount: number) => void;
}> = ({ handlePay }) => {
  const [amount, setAmount] = useState(config.PRICE);

  const handlePayment = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    handlePay(amount);
  };

  const onChangeSlider = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setAmount(parseFloat(value));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <input
          className="slider rounded-lg appearance-none w-3/4"
          type="range"
          name="amount"
          id="amount"
          min={config.MIN_PRICE}
          max={config.MAX_PRICE}
          step="20"
          value={amount}
          onChange={onChangeSlider}
        />
        <div className="text-white text-center text-lg font-semibold w-14 p-1 bg-indigo-600">
          {stripeContent.amount(amount)}
        </div>
      </div>
      <SubmitButton
        text={stripeContent.button}
        fn={(e: React.FormEvent<HTMLInputElement>) => handlePayment(e)}
      />
    </>
  );
};

export default Payment;
