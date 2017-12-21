const path = require("path");

const webpack = require("webpack");
const { smart } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const base = require("./webpack.base.config");

module.exports = smart(base, {
  target: "electron-renderer",
  entry: path.join(__dirname, "../app/renderer/index.ts"),

  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.renderer.json"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true, // will inject the main bundle to index.html
      template: path.join(__dirname, "../app/index.html")
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
});
