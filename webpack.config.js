const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main.ts'
    },
    devtool: 'inline-source-map',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 80,
        host: '192.168.1.65',
        hot: true,
        stats: 'errors-only',
        contentBase: './dist',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: 'Rain.js',
            template:'./public/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /.(png|jpg|jpeg)$/,
                use: [
                    'file-loader',
                    'ts-loader'
                ]
            },
            {
                test: /.ts$/,
                use: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}