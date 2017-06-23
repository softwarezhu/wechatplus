var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: path.join(__dirname, 'src/main.js'),
    output: {
        path: path.join(__dirname, 'dist/javascripts/build'),
        filename: 'app.js'
    },
    resolveLoader: {
        root: path.join(__dirname, '../node_modules'),
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css!autoprefixer'
        }, {
            test: /\.less/,
            loader: 'style!css!autoprefixer!less'
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    vue: {
        loaders: {
            css: 'style!css!autoprefixer!less'
        }
    },
    devtool: 'source-map',
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
}
