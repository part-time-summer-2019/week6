const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
require("babel-polyfill");

const projects = [
    'index', 'drum', 'clock', 'array', 'cssvars', 'flexpanels', 'typeahead', 'canvas', 'video',
    'checkbox', 'keysequence'
];

let entry = {};

projects.forEach(project => {
    entry[project] = ['babel-polyfill', `./src/js/${project}.js`];
});
entry['css'] = './src/styles/app.css';


const plugins = projects.map(project => {
    return new HtmlWebPackPlugin({
        template: `./src/${project}.html`,
        inject: true,
        chunks: [`${project}`, 'css'],
        filename: `${project}.html`
    });
});

module.exports = {
    entry: entry,
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|wav)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            }
        ]
    },
    plugins: plugins
};
