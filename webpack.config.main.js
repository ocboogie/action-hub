const merge = require('webpack-merge');

const base = require('./webpack.config.base');

module.exports = merge.smart(base, {
    devtool: 'source-map',

    entry: './src/main/index.js',

    output: {
        filename: 'main.js'
    },
    node: {
        __dirname: false,
        __filename: false
    },
    target: 'electron-main'
});
