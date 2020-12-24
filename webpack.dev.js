const Dotenv = require('dotenv-webpack');
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
    entry: './src/client/index.js',  //1 
    mode: 'development',
    devtool: 'inline-source-map',
    output:{
        libraryTarget: 'var',
        library: 'Client'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,   // w/o this, ur scss files wont work
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
                    
        ]
    },
    plugins:[  
       new htmlWebpackPlugin({   //2 w/o this u wont be bale to see ur homepage (index.html)
            template: './src/client/views/index.html',
            filename: './index.html',
        }),
        new Dotenv()
    ]
}