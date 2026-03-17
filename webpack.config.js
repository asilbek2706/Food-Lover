const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        entry: './js/script.js',
        output: {
            filename: 'js/bundle.[contenthash:8].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        devtool: isProduction ? false : 'source-map',
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
                filename: 'index.html',
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'style.css', to: 'style.css' },
                    { from: 'img', to: 'img', noErrorOnMissing: true },
                    { from: 'icons', to: 'icons', noErrorOnMissing: true },
                    { from: 'favicon.ico', to: 'favicon.ico', noErrorOnMissing: true },
                ],
            }),
        ],
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'dist'),
            },
            port: 8080,
            open: true,
            hot: true,
        },
    };
};
