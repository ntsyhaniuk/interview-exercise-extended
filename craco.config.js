const ReactCompilerConfig = {
  target: '18',
};

module.exports = {
  babel: {
    plugins: [
      // React Compiler must run first in the Babel pipeline.
      ['babel-plugin-react-compiler', ReactCompilerConfig],
    ],
  },
};
