const path = require("path");

const { smart } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const base = require("./webpack.base.config");

module.exports = smart(base, {
  devtool: "inline-source-map",
  target: "electron-renderer",
  entry: path.join(__dirname, "../app/renderer/index.ts"),

  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          configFileName: "tsconfig.renderer.json"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true, // will inject the main bundle to index.html
      template: path.join(__dirname, "../app/index.html")
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    port: process.env.PORT || 8080
  }
});
