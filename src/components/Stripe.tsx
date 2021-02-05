import React, { useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import CtaButton from './CtaButton';
import config from '../config';

const StripeCardElement: React.FC<{
  stripe: ReactStripeElements.StripeProps;
}> = ({ stripe }) => {
  const [isCardComplete, setIsCardComplete] = useState(false);
  const getToken = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log('init stripe payment');
    if (stripe) {
      const { token, error } = await stripe.createToken({
        name: 'HideFaces',
      });
      console.log(token, error);
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
          text="Pay 1.5€"
          onClick={(e: React.FormEvent<HTMLInputElement>) => getToken(e)}
        />
      </div>
    </>
  );
};

const InjectStripeCardElement = injectStripe<{
  stripe?: ReactStripeElements.StripeProps;
}>(StripeCardElement);

const Stripe: React.FC = () => {
  return (
    <StripeProvider apiKey={config.STRIPE_KEY}>
      <Elements
        fonts={[
          {
            cssSrc: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800',
          },
        ]}
      >
        <InjectStripeCardElement />
      </Elements>
    </StripeProvider>
  );
};

export default Stripe;
