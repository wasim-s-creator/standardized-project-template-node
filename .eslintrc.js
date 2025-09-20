module.exports = {
  env: {
    browser: false,
    node: true,
    es2021: true,
    mocha: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'commonjs',
  },
  rules: {
    // Error prevention
    'no-undef': 'error',
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-console': 'off',

    // Code style
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],

    // Best practices
    'no-var': 'error',
    'prefer-const': 'error',
    'no-trailing-spaces': 'error',
    'eol-last': 'error',

    // Node.js specific
    'no-process-exit': 'warn',
    'no-sync': 'warn',
  },
  globals: {
    process: 'readonly',
    Buffer: 'readonly',
    __dirname: 'readonly',
    __filename: 'readonly',
    module: 'readonly',
    require: 'readonly',
    exports: 'readonly',
    global: 'readonly',
  },
};
