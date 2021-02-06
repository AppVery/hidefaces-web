import React, { useState, useMemo } from 'react';
import { loadStripe, Token } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CtaButton from './CtaButton';
import config from '../config';
import { stripeContent } from '../content/steps';

const StripeCardElement: React.FC<{
  email: string;
  handlePay: (token: Token | undefined) => void;
}> = ({ email, handlePay }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isCardComplete, setIsCardComplete] = useState(false);

  const getToken = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!elements || !stripe) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement && isCardComplete) {
      const data = { name: email };
      const { token } = await stripe.createToken(cardElement, data);
      handlePay(token);
    } else {
      handlePay(undefined);
    }
  };

  return (
    <>
      <CardElement className="card-field" onChange={(e) => setIsCardComplete(e.complete)} />
      <img className="rounded-lg shadow-lg" src={`/images/stripe.png`} alt="stripe-badge" />
      <div className="text-right">
        <CtaButton
          text={stripeContent.button}
          onClick={(e: React.FormEvent<HTMLInputElement>) => getToken(e)}
        />
      </div>
    </>
  );
};

const Stripe: React.FC<{
  email: string;
  handlePay: (token: Token | undefined) => void;
}> = ({ email, handlePay }) => {
  const stripePromise = useMemo(() => loadStripe(config.STRIPE_KEY), [config.STRIPE_KEY]);
  return (
    <Elements stripe={stripePromise}>
      <StripeCardElement email={email} handlePay={handlePay} />
    </Elements>
  );
};

export default Stripe;
