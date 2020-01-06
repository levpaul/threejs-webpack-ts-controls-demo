const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require("path");

module.exports = {
    entry: "./src/app.tsx",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Three.js Sample App",
            template: 'src/html/template.html'
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin([
            { from: 'src/assets', to: 'assets' },
        ]),
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json', '.tsx']
    }
};
