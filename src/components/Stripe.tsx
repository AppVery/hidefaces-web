import React, { useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import CtaButton from './items/CtaButton';
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
    <div className="mt-5 md:mt-0 md:col-span-2">
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
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
        </div>
        <div className="px-4 py-3 bg-gray-100 text-right sm:px-6">
          <CtaButton
            text="Pay 1.5€"
            onClick={(e: React.FormEvent<HTMLInputElement>) => getToken(e)}
          />
        </div>
      </div>
    </div>
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
