const path = require('path');

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
    }
};
