module.exports = {
  linters: {
    "**/*.js": ["git-exec-and-restage eslint --fix --"],
    "**/*.json": ["git-exec-and-restage prettier --write --"]
  },
  ignore: ["examples/expo-app/bin/**"]
};
