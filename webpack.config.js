const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

let html = new htmlWebpackPlugin({
    title: 'microswag.online',
    hash: false,
    template: path.resolve(__dirname + "/html/template.html")

});

module.exports = {
    mode: "development",
    entry: {
        index: './src/index'
    },
    output: {
        path: path.resolve(__dirname + "/dist"),
        filename: 'script/[name].bundle.js'
    },
    plugins: [html],
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /(.css)/,
                include: [
                    path.resolve(__dirname + "/src")
                ],
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ],
    },
    resolve: {
        extensions: [
            '.js', '.tsx', '.ts', '.jsx'
        ]
    }
};

// optimization: {
//     splitChunks: {
//         chunks: 'all'
//     }
// },