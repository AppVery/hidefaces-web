const generalId = 'q9mrc6xq3k';
const devId = 'g9wezw15fc';
const prodId = 'rx31c7brnb';

const isDev = () => process.env.REACT_APP_STAGE === 'dev';
const isProd = () => process.env.REACT_APP_STAGE === 'prod';

const getAPIendpoint = (id: string, stage: string) =>
  `https://${id}.execute-api.eu-west-1.amazonaws.com/${stage}/check`;

const dev = {
  endpoint: getAPIendpoint(isDev() ? devId : generalId, 'dev'),
  STRIPE_KEY: 'pk_test_dWFGbfBf1OkmSoNS8QAu1R7a00HSKb10om',
};

const prod = {
  endpoint: getAPIendpoint(prodId, 'prod'),
  STRIPE_KEY: 'pk_live_QzLlwFKdgLUAS3IzSOI1x9O800kdiQ1yrJ',
};

const config = {
  //price in cents
  MIN_PRICE: 100,
  PRICE: 200,
  MAX_PRICE: 500,
  MAX_SECONDS: 30,
  MAX_MEGABYTES: 100,
  // Default to dev if not set
  ...(isProd() ? prod : dev),
};

export default config;
