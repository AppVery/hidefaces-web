import React, { useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import CtaButton from './CtaButton';
import config from '../config';
import { stripeContent } from '../content/steps';

const StripeCardElement: React.FC<{
  email: string;
  handlePay: (token: stripe.Token | undefined) => void;
  stripe: ReactStripeElements.StripeProps;
}> = ({ email, handlePay, stripe }) => {
  const [isCardComplete, setIsCardComplete] = useState(false);
  const getToken = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log('init stripe payment');
    if (email && isCardComplete && stripe) {
      const { token, error } = await stripe.createToken({
        name: email,
      });
      console.log(token, error, isCardComplete);
      handlePay(token);
    } else {
      handlePay(undefined);
    }
  };

  return (
    <>
      <CardElement
        className="card-field"
        onChange={(e) => setIsCardComplete(e.complete)}
        style={{
          base: {
            fontSize: '16px',
            color: '#495057',
            fontFamily: "'Open Sans', sans-serif",
          },
        }}
      />
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

const InjectStripeCardElement = injectStripe<{
  email: string;
  handlePay: (token: stripe.Token | undefined) => void;
  stripe?: ReactStripeElements.StripeProps;
}>(StripeCardElement);

const Stripe: React.FC<{
  email: string;
  handlePay: (token: stripe.Token | undefined) => void;
}> = ({ email, handlePay }) => {
  return (
    <StripeProvider apiKey={config.STRIPE_KEY}>
      <Elements
        fonts={[
          {
            cssSrc: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800',
          },
        ]}
      >
        <InjectStripeCardElement email={email} handlePay={handlePay} />
      </Elements>
    </StripeProvider>
  );
};

export default Stripe;
