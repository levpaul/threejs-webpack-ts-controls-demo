const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

module.exports = {
    entry: "./src/app.ts",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ]
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Three.js Sample App",
            template: 'src/html/template.html'
        }),
        new MiniCssExtractPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json']
    }
};
