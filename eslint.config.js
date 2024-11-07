// eslint.config.js
module.exports = {
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    globals: {
      browser: true,
      node: true,
    },
  },
  rules: {
    semi: ['warn', 'always'],
    quotes: ['warn', 'single'],
    'no-unused-vars': 'warn',
    indent: ['warn', 2],
  },
};
