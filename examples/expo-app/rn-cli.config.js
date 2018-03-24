const path = require("path");
module.exports = {
  getProjectRoots() {
    // NOTE: This is needed because we're importing packages from elsewhere in
    // the monorepo, which metro-bundler doesn't support out of the box.
    return [
      __dirname,
      path.resolve(__dirname, "../../packages"),
      path.resolve(__dirname, "../../")
    ];
  },
  getEnableBabelRCLookup() {
    // Don't let the root Babel config interfere with the local one.
    return false;
  }
};
