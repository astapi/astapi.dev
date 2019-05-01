module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    // parser: 'babel-eslint'
    parser: '@typescript-eslint/parser',
    sourceType: "module",
    project: "./tsconfig.json"
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue'
  ],
  plugins: [
    'prettier',
    '@typescript-eslint'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'no-console': 'off'
  }
}
