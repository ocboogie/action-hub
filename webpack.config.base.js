const path = require('path');

const webpack = require('webpack');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    externals: { vm2: 'commonjs vm2' },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/^any-promise$/, 'bluebird')
    ]
};
