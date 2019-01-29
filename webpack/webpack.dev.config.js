const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const cp = require('child_process');
const envConfig = require(path.join(__dirname, '../environment/', 'dev.config.json'))

let config = env =>{

    let mock_back = cp.fork('./server/server.js');
    console.log(__dirname);
    return {
        entry: ["./src/index.tsx","./src/styles/index.scss"],
        output: {
            filename: "bundle.js",
            path: path.join(__dirname, '/dist')
        },
    
        // Enable sourcemaps for debugging webpack's output.
        devtool: "cheap-source-map",
        devServer: {
            contentBase: './dist',
            hot: true  
        },
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"],
            alias:{
                Components: path.resolve(__dirname, '../src/components/'),
                Shared: path.resolve(__dirname, '../src/shared/'),
                Services: path.resolve(__dirname, '../src/services/'),
                Model:  path.resolve(__dirname, '../src/model/')
            }
        },
    
        optimization:{
            sideEffects: true
        },

        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
    
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        "css-loader", // translates CSS into CommonJS
                        "sass-loader" // compiles Sass to CSS, using Node Sass by default
                    ]
                }
            ]
        },
        plugins:[
            new CleanWebpackPlugin(['dist']),
            new webpack.DefinePlugin({
                ENV: JSON.stringify(envConfig)
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html'
              }),
            new webpack.HotModuleReplacementPlugin()
        ]
    };
}

module.exports = config;