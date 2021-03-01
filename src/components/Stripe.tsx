import React, { useEffect, useState, useMemo } from 'react';
import { SubmitButton } from '../components/Button';
import { loadStripe, Token } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import config from '../config';
import { stripeContent } from '../content/steps';

const StripeCardElement: React.FC<{
  email: string;
  handlePay: (token: Token | undefined, quantity: number) => void;
  clearCard: boolean;
}> = ({ email, handlePay, clearCard }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [quantity, setQuantity] = useState(config.PRICE);

  const cardElement = elements && elements.getElement(CardElement);

  useEffect(() => {
    if (cardElement && clearCard) {
      cardElement.clear();
    }
  }, [clearCard]);

  const getToken = async (e: React.FormEvent<HTMLInputElement>) => {
    try {
      e.preventDefault();

      if (!elements || !stripe) {
        throw Error();
      }

      if (cardElement && isCardComplete) {
        const data = { name: email };
        const { token } = await stripe.createToken(cardElement, data);
        handlePay(token, quantity);
      } else {
        throw Error();
      }
    } catch (error) {
      handlePay(undefined, 0);
    }
  };

  const onChangeSlider = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setQuantity(parseFloat(value));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <input
          className="slider rounded-lg appearance-none w-3/4"
          type="range"
          name="quantity"
          id="quantity"
          min={config.MIN_PRICE}
          max={config.MAX_PRICE}
          step="20"
          value={quantity}
          onChange={onChangeSlider}
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
  handlePay: (token: Token | undefined, quantity: number) => void;
  clearCard: boolean;
}> = ({ email, handlePay, clearCard }) => {
  const stripePromise = useMemo(() => loadStripe(config.STRIPE_KEY), [config.STRIPE_KEY]);
  return (
    <Elements stripe={stripePromise}>
      <StripeCardElement email={email} handlePay={handlePay} clearCard={clearCard} />
    </Elements>
  );
};

export default Stripe;
