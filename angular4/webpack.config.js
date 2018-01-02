const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const proxy = require('http-proxy-middleware');
const htmlLoader = require('raw-loader');
const http = require('https');
const keepAliveAgent = new http.Agent({keepAlive: true});
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});


const proxyPeel = proxy('/api', {
    target: 'https://web-service:8989',
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,
    secure: false,
    agent: keepAliveAgent
});


const proxyPeel2 = proxy('/user', {
    target: 'https://web-service:8989',
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,
    secure: false,
    agent: keepAliveAgent
});

const proxyPeel3 = proxy('/base', {
    target: 'https://web-service:8989',
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,
    secure: false,
    agent: keepAliveAgent
});

module.exports = {
    entry: {
        'stylez': './src/app/assets/css/sassy.sass',
        'app': './src/main.ts',
        'vendor': './src/vendor.ts',
        'polyfills': './src/polyfills.ts'

    },
    module: {
        rules: [
            {
                test: require.resolve('jquery'), use: [
                {
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }
            ]
            },
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader',
                    {
                        loader: 'awesome-typescript-loader',
                        options: {configFileName: path.resolve(__dirname, 'src', 'tsconfig.json')}
                    }, 'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: [/node_modules/, /build/, /dist/, /angular-project/, /app/]
            },
            {
                test: /\.(html)$/,
                exclude: [/index\.html/],
                loader: "file-loader?name=[name].[hash:6].[ext]"
            },
            {
                test: /\.(htm)$/,
                loader: "raw-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=[name].[hash].[ext]',
                exclude: [/node_modules/, /build/, /dist/, /gradle/]
            },
            {
                test: /\.css$/,
                exclude: [/build/, /dist/, /gradle/],
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.s[ac]ss$/,
                exclude: [/build/, /dist/, /gradle/],
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            }
        ]
    },
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            // In case you imported plugins individually, you must also require them here:
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Tether: 'tether'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            mangle: {
                keep_fnames: true
            }
        }),

        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.resolve(__dirname, 'src'), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'body'
        }),
        new CleanWebpackPlugin(['dist', 'build'], {
            root: path.resolve(__dirname),
            verbose: true,
            dry: false,
            exclude: ['shared.js']
        }),
        new ExtractTextPlugin({
            filename: 'style.[contenthash].css',
            allChunks: true
        }),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./dist directory is being served
            host: 'localhost',
            port: 3000,
            https: true,
            server: {baseDir: ['dist']},
            middleware: [proxyPeel, proxyPeel2, proxyPeel3]
        })
    ]
};
