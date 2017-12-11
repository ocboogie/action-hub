const path = require("path");

const { smart } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");

const base = require("./webpack.base.config");

module.exports = smart(base, {
  target: "electron-main",
  entry: path.join(__dirname, "../app/main/index.ts"),
  externals: [nodeExternals()],
  output: {
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.main.json"
        }
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  }
});
