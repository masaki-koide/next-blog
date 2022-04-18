module.exports = {
  extends: ['thai-soup'],
  ignorePatterns: ['.eslintrc.js', 'babel.config.js'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'no-useless-constructor': 'off',
  },
}
