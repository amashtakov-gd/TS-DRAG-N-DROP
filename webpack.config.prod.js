const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/app.ts',
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: [
          {
            directory: path.join(__dirname),
          },
        ],
    },    
    module: {
        rules: [
            {
                test: /\.ts/,
                use: 'ts-loader',
                exclude: /node-modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()
    ]
};