const HtmlWebpack    = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyWebpack    = require('copy-webpack-plugin');

const CssMinimizerWebpack = require('css-minimizer-webpack-plugin');
const TersetWebpack       = require('terser-webpack-plugin');

module.exports = {
    mode: "production",
    output: {
        clean: true,
        filename: 'main.[fullhash].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'asset/img/[name][ext]',
                    emit: true
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerWebpack(),
            new TersetWebpack()
        ]
    },
    plugins: [
        new HtmlWebpack({
            title: 'Todo',
            template: './src/index.html'
        }),
        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        new CopyWebpack({
            patterns: [
                { from: './src/assets/', to: 'assets/'}
            ]
        })
    ]
 }