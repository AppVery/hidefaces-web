const dev = {
  endpoint: 'https://api.hidefaces.app/dev/payment',
  STRIPE_KEY: 'pk_test_dWFGbfBf1OkmSoNS8QAu1R7a00HSKb10om',
};

const prod = {
  endpoint: 'https://api.hidefaces.app/prod/payment',
  STRIPE_KEY: 'pk_live_QzLlwFKdgLUAS3IzSOI1x9O800kdiQ1yrJ',
};

const config = {
  MAX_ATTACHMENT_SIZE: 5000000,
  // Default to dev if not set
  ...(process.env.REACT_APP_STAGE === 'prod' ? prod : dev),
};

export default config;
