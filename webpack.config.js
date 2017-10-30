var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
    
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    devServer: {
        inline: true,
        contentBase: './build'
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    compact: false
                }
            },
            { test: /\.(csv)$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/weatherData.csv' },
            { from: 'src/index.html' }
        ])
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};