const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('./webpack.config.base');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = merge.smart(base, {
    devtool: 'inline-source-map',

    entry: './src/renderer/index.js',

    output: {
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader'
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader' // Creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // Translates CSS into CommonJS
                }, {
                    loader: 'sass-loader' // Compiles Sass to CSS
                }]
            }
            // Use one of these to serve jQuery for Bootstrap scripts:
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig
    ],
    target: 'electron-renderer'
});
