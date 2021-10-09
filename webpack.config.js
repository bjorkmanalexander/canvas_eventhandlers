const { ProgressPlugin } = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    cache: { 
        cacheDirectory: resolve(__dirname, '.temp_cache'),
        type: 'filesystem' 
    },
    entry: [
        __dirname + '/src/index.js'
    ],
    mode: 'development',
    output: {
        filename: '[name].min.js',
        path: resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Canvas App'
        }),
        new ProgressPlugin()
    ],
    watch: true
}