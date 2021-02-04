const dev = {
  STRIPE_KEY: 'pk_test_dWFGbfBf1OkmSoNS8QAu1R7a00HSKb10om',
  apiGateway: {
    REGION: 'eu-west-1',
    URL: 'https://api.hidefaces.app/dev',
  },
};

const prod = {
  STRIPE_KEY: 'pk_live_QzLlwFKdgLUAS3IzSOI1x9O800kdiQ1yrJ',
  apiGateway: {
    REGION: 'eu-west-1',
    URL: 'https://api.hidefaces.app/prod',
  },
};

const config = {
  MAX_ATTACHMENT_SIZE: 5000000,
  // Default to dev if not set
  ...(process.env.REACT_APP_STAGE === 'prod' ? prod : dev),
};

export default config;
