const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app/index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["env", "react"]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true, // will inject the main bundle to index.html
      template: "./app/index.html"
    })
  ],
  stats: {
    colors: true
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  devtool: "source-map"
};
