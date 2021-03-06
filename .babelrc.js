const isDevelopment = process.env.TYPE === 'development';
const isTest = process.env.TYPE === 'test';

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  isTest ? 'istanbul' : '',
].filter(Boolean);

const presets = [
  ['@babel/preset-env', { useBuiltIns: 'usage', corejs: { version: 3 } }],
  [
    '@babel/preset-react',
    {
      development: isDevelopment,
      useBuiltIns: true,
    },
  ],
];

module.exports = {
  presets,
  plugins,
};
