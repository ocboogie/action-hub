const path = require("path");

const camelCase = require("lodash/camelCase");
const Promise = require("bluebird");
const fs = require("fs-extra");
const webpack = require("webpack");
const { smart } = require("webpack-merge");
const chalk = require("chalk");

const baseWebpackConfig = require("../webpack.config");

const packagesDir = path.join(__dirname, "../packages");

Promise.resolve(fs.readdir(packagesDir))
  .each(file => {
    const packageDir = path.join(packagesDir, file);
    const webpackConfigPath = path.join(packageDir, "webpack.config.js");
    const packagePakPath = path.join(packageDir, "package.json");
    if (!fs.lstatSync(packageDir).isDirectory()) {
      return;
    }

    if (!fs.existsSync(packagePakPath)) {
      console.log(chalk.yellow(`No package.json found for "${file}".`));
      return;
    }
    let webpackConfig;
    if (fs.existsSync(webpackConfigPath)) {
      try {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        webpackConfig = require(webpackConfigPath);
      } catch (e) {
        console.error(
          `${chalk.bold.red(
            `There was an error running the webpack config in "${file}".`
          )}:\n`
        );
        console.error(e);
        console.error();
        console.error(
          chalk.bold.red(`Could not successfully compile "${file}"`)
        );
        return;
      }
    } else {
      webpackConfig = {};
    }
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const pak = require(packagePakPath);
    if (pak.buildIgnore) {
      console.log(chalk.yellow(`Ignoring "${file}".`));
      return;
    }
    const pakWebpackConfig = {
      entry: path.join(packageDir, "src/index.js"),
      output: {
        path: path.join(packageDir, "lib"),
        filename: `${pak.name}${process.env.NODE_ENV === "development"
          ? ""
          : ".min"}.js`,
        library: `${camelCase(pak.name)}.js`
      }
    };
    let compiler;
    try {
      compiler = webpack(
        smart(baseWebpackConfig, pakWebpackConfig, webpackConfig)
      );
    } catch (e) {
      if (e instanceof webpack.WebpackOptionsValidationError) {
        console.error(
          chalk.bold.red(
            `There was a webpack validation error in "${file}":\n\n${e.message}\n`
          )
        );
      } else {
        console.error(
          `${chalk.bold.red(
            `There was an error running the webpack config in "${file}".`
          )}:\n`
        );
        console.error(e);
        console.error();
      }
      console.error(
        chalk.bold.red(`Could not successfully compile "${file}".`)
      );
      return;
    }

    const compilerCallback = (err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
      }

      const info = stats.toJson();
      if (stats.hasErrors()) {
        info.errors.forEach(error => {
          console.log(error);
        });
      }

      if (stats.hasWarnings()) {
        info.warnings.forEach(warning => {
          console.log(warning);
        });
      }
      console.log(chalk.green(`Done compiling "${file}".`));
    };
    console.log(chalk.green(`Started compiling "${file}".`));
    compiler.run(compilerCallback);
  })
  .catch(e => {
    console.log(e);
  });
