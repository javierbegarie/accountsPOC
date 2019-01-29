const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const envConfig = require(path.join(__dirname, '../environment/', 'dev.config.json'))

let config = env =>{

    console.log(__dirname);
    return {
        entry: ["./src/index.tsx","./src/styles/index.scss"],
        output: {
            filename: "bundle.js",
            path: path.join(__dirname, '../dist')
        },
    
        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",
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
        optimization: {
            minimizer:  [
                new TerserPlugin(),
                new OptimizeCSSAssetsPlugin({})
            ]
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
                        MiniCssExtractPlugin.loader,
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
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ]
    };
}

module.exports = config;