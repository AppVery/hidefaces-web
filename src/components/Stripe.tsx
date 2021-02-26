import React, { useState, useMemo } from 'react';
import { SubmitButton } from '../components/Button';
import { loadStripe, Token } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import config from '../config';
import { stripeContent } from '../content/steps';

const StripeCardElement: React.FC<{
  email: string;
  handlePay: (token: Token | undefined, quantity: string) => void;
}> = ({ email, handlePay }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [quantity, setQuantity] = useState('2');

  const getToken = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!elements || !stripe) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement && isCardComplete) {
      const data = { name: email };
      const { token } = await stripe.createToken(cardElement, data);
      handlePay(token, quantity);
    } else {
      handlePay(undefined, quantity);
    }
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setQuantity(e.currentTarget.value);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <input
          className="slider rounded-lg appearance-none w-3/4"
          type="range"
          name="quantity"
          id="quantity"
          min="1.5"
          max="5"
          step="0.1"
          value={quantity}
          onChange={onChange}
        />
        <div className="text-white text-center text-lg font-semibold w-14 p-1 bg-indigo-600">
          {stripeContent.amount(quantity)}
        </div>
      </div>
      <CardElement className="card-field" onChange={(e) => setIsCardComplete(e.complete)} />
      <div className="flex justify-end">
        <SubmitButton
          text={stripeContent.button}
          fn={(e: React.FormEvent<HTMLInputElement>) => getToken(e)}
        />
      </div>
    </>
  );
};

const Stripe: React.FC<{
  email: string;
  handlePay: (token: Token | undefined, quantity: string) => void;
}> = ({ email, handlePay }) => {
  const stripePromise = useMemo(() => loadStripe(config.STRIPE_KEY), [config.STRIPE_KEY]);
  return (
    <Elements stripe={stripePromise}>
      <StripeCardElement email={email} handlePay={handlePay} />
    </Elements>
  );
};

export default Stripe;
