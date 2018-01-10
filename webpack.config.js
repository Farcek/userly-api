var path = require('path');
var nodeExternals = require('webpack-node-externals');
var CleanWebpackPlugin = require('clean-webpack-plugin');







var ourDir = path.resolve(__dirname, './dist.api');

var externalApi = nodeExternals({
    modulesDir: path.join(__dirname, './node_modules')
});


// var externalConfig = function(context, request, callback) {
//     if (request === '../config/index') {
//         return callback(null, 'commonjs ' + request);
//     }
//     callback();
// };


module.exports = {
    target: "node",
    node: {
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
    externals: [externalApi],

    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader'
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