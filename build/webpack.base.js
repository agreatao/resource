const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { DIST_PATH, SRC_PATH, join } = require('./utils.js');
const config = require('../config');

const ENV = process.env.NODE_ENV || 'development';
const isDev = ENV === 'development';

console.log('---------------------------------\n当前开发环境: ' + ENV + '\n---------------------------------');

module.exports = {
    context: SRC_PATH,
    entry: {
        vendor: [
            'react', 'react-dom', 'react-router',
            'redux', 'redux-thunk', 'react-redux',
            'react-router-redux'
        ]
    },
    output: {
        path: DIST_PATH,
        publicPath: config.build.publicPath,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            join('node_modules')
        ],
        alias: {
            '@': SRC_PATH
        }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            enforce: 'pre',
            use: 'eslint-loader'
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['react-hot-loader', 'babel-loader']
        }, {
            test: /\.(bmp|png|jpe?g|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'images/[name].[ext]'
                }
            }]
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    mimetype: 'application/font-woff',
                    name: 'fonts/[name].[ext]'
                }
            }]
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    limit: 8192,
                    mimetype: 'application/font-woff',
                    name: 'fonts/[name].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin([ DIST_PATH ], { verbose: false }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: config.title,
            filename: 'index.html',
            template: './entry/index.html',
            favicon: join('favicon.ico'),
            hash: true,
            chunks: ['vendor', 'app'],
            minify: isDev ? false : {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeComments: true
            }
        })
    ]
};
