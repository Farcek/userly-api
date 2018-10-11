var path = require('path');
var nodeExternals = require('webpack-node-externals');
var CleanWebpackPlugin = require('clean-webpack-plugin');


var ourDir = path.resolve(__dirname, './dist.api');


module.exports = {
    target: "node",
    node: {
        fs: false,
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __dirname: false,
        __filename: false,
    },
    context: path.resolve(__dirname),
    entry: [
        './src/serve.ts',
    ],
    output: {
        filename: 'server.js',
        path: ourDir
    },
    externals: [
        nodeExternals({
            whitelist : ["classrouter"]
        })
        // /^(tedious|\$)$/i,
        // /config/i,
        // /sequelize/i,
        // /^(sqlite3|\$)$/i,
        // /^(pg-native|\$)$/i,
    ],

    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: [/node_modules/],
        }, {
            test: /\.sql$/,
            loader: "raw-loader",
            options: {
                name: '[path][name].[ext]?[hash]'
            }
        }]
    },
    resolve: {
        alias: {
            'core': path.resolve(__dirname, './core/'),
        },
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.js', '.html'] // note if using webpack 1 you'd also need a '' in the array as well
    },
    plugins: [
        new CleanWebpackPlugin(['**/*.*'], {
            root: ourDir,
            verbose: true,
            dry: false
        })
    ]
};