module.exports = {
  plugins: [
    "prettier",
    "flowtype",
    "react",
    "eslint-comments",
    "flowtype-errors"
  ],
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:react/recommended",
    "plugin:eslint-comments/recommended"
  ],
  parser: "babel-eslint",
  env: {
    es6: true,
    node: true
  },
  rules: {
    "prettier/prettier": "error", // Prettier errors (autofixes) are now ESLint errors (autofixes)
    "flowtype/define-flow-type": "error", // Play nice with Flow identifiers
    "flowtype-errors/show-errors": "error", // Flow errors are now ESLint errors
    "react/prop-types": "off" // We use Flow rather than PropTypes
  },
  overrides: [
    { files: ["**/__tests__/**/*.js", "**/*.test.js"], env: { jest: true } }
  ]
};
