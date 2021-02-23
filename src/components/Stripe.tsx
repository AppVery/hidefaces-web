import React, { useState, useMemo } from 'react';
import { loadStripe, Token } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CtaButton from './CtaButton';
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
          className="slider rounded-lg appearance-none w-3/5"
          type="range"
          name="quantity"
          id="quantity"
          min="1.5"
          max="5"
          step="0.1"
          value={quantity}
          onChange={onChange}
        />
        <CtaButton
          text={stripeContent.button(quantity)}
          onClick={(e: React.FormEvent<HTMLInputElement>) => getToken(e)}
        />
      </div>
      <CardElement className="card-field" onChange={(e) => setIsCardComplete(e.complete)} />
      <div className="flex justify-end">
        <img className="rounded-lg shadow-lg" src={`/images/stripe.png`} alt="stripe-badge" />
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
