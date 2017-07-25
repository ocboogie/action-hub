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
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'stylus-loader'
                ]
            }
            // Use one of these to serve jQuery for Bootstrap scripts:
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig
    ],
    target: 'electron-renderer'
});
