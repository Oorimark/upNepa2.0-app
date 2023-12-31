module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  plugin: ['prettier'],
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
  },
};
