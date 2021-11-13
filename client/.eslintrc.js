module.exports = {
  env: {
    es6: true,
    browser: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }], // CRLF 문제 해결
    'import/prefer-default-export': 1,
    'import/extensions': 0,
    'no-use-before-define': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0, // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용
    'react/prop-types': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    '@typescript-eslint/no-explicit-any': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'], // https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope
    'react/require-default-props': 'off' // https://stackoverflow.com/questions/63696724/eslint-problem-with-default-props-in-functional-component-typescript-react
  }
};
