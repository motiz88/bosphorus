export function makeAction(asyncFn) {
  return (...args) => {
    Promise.resolve(asyncFn(...args)).catch(e => {
      process.stderr.write(e.message + "\n");
      process.exit(1);
    });
  };
}
