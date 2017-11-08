const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const UnminifiedWebpackPlugin = require("unminified-webpack-plugin");

const plugins = [];

if (process.env.NODE_ENV !== "development") {
  plugins.push(new UglifyJsPlugin(), new UnminifiedWebpackPlugin());
}

module.exports = {
  devtool: "source-map",
  output: {
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: ["babel-loader", "eslint-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".json", ".js"]
  },
  plugins
};
