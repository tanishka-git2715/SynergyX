module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 2018,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  rules: {
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'max-len': 'off',
    'require-jsdoc': 'off',
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
