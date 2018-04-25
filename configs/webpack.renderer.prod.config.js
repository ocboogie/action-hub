const path = require("path");

const { smart } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: {
            loader: "css-loader",
            options: {
              minimize: true
            }
          },
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true, // will inject the main bundle to index.html
      template: path.join(__dirname, "../app/index.html")
    }),
    new ExtractTextPlugin("style.css")
  ]
});
