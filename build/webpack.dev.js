const webpack = require('webpack');
const merge = require('webpack-merge');

const base = require('./webpack.base.js');

const config = require('../config');

module.exports = merge(base, {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: ['babel-polyfill', './entry/index', 'font-awesome-webpack']
    },
    devServer: {
        hot: true,
        contentBase: false,
        host: config.dev.host,
        port: config.dev.port,
        open: config.dev.open,
        publicPath: config.dev.publicPath
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [{
            test: /\.(css)$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(scss|sass)$/,
            use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[path][local]-[hash:base64:5]',
                        minimize: false,
                        sourceMap: true,
                        importLoaders: 2
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        sourceMap: true,
                        plugins: [
                            require('precss')(),
                            require('autoprefixer')()
                        ]
                    }
                },
                'sass-loader'
            ]
        }, {
            test: /\.(less)$/,
            use: [{
                loader: 'style-loader'
            },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        minimize: false,
                        sourceMap: true,
                        importLoaders: 2
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        sourceMap: true,
                        plugins: [
                            require('precss')(),
                            require('autoprefixer')()
                        ]
                    }
                },
                'less-loader'
            ]
        }]
    }
});
