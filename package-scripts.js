const { series, concurrent, commonTags: { oneLine } } = require("nps-utils");

const execInEachPackage = (...cmds) =>
  series(
    ...cmds.map(cmd => "bolt workspaces exec --ignore-fs examples/* -- " + cmd)
  );

const { env } = process;
const isCI = env.CI === "true";

function crossEnv(arg) {
  return `node ${require.resolve(".bin/cross-env")} ${arg}`;
}

module.exports = {
  scripts: {
    postinstall: series.nps("build"),
    build: execInEachPackage(
      crossEnv(
        oneLine`
          BABEL_ENV=commonjs
          babel src --copy-files --out-dir dist --ignore "**/__tests__,**/*.test.js"
        `
      ),
      "flow-copy-source src dist"
    ),
    bootstrap: series("bolt", "lint-json"),
    clean: execInEachPackage("rimraf dist"),
    test: isCI ? "jest --ci --coverage" : "jest",
    lint: concurrent.nps("lint-js", "lint-json"),
    lintJs: `eslint ${isCI ? "" : "--fix"} "**/*.js"`,
    lintJson: oneLine`
      prettier --ignore-path .eslintignore
      ${isCI ? "--list-different" : "--write"}
      "**/*.json"
    `,
    ci: series("lint", "test"),
    precommit: "lint-staged"
  }
};
