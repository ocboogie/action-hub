const path = require("path");

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"]
  },
  output: {
    path: path.join(__dirname, "../dist")
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      }
    ]
  }
};
