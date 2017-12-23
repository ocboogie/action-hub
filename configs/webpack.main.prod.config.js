const path = require("path");

const webpack = require("webpack");
const { smart } = require("webpack-merge");

const base = require("./webpack.base.config");

module.exports = smart(base, {
  target: "electron-main",
  entry: path.join(__dirname, "../app/main/index.ts"),
  output: {
    filename: "main.js"
  },
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [new webpack.optimize.UglifyJsPlugin()]
});
