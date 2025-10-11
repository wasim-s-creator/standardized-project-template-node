const globals = require('globals');
const js = require('@eslint/js');
const eslintPluginSecurity = require('eslint-plugin-security');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
    },
    plugins: {
      security: eslintPluginSecurity,
    },
    rules: {
      ...eslintPluginSecurity.configs.recommended.rules,
      // Error prevention
      'no-undef': 'error',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-console': 'warn',

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
  },
];
