module.exports = {
  "**/*.js": ["git-exec-and-restage eslint --fix --"],
  "**/*.json": ["git-exec-and-restage prettier --write --"]
};
