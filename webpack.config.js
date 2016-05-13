var path = require('path');
module.exports = {
    entry: './src/main',
    output: {
        path: './',
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        port: 3334
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'es2015-loose']
                },
                include: [
        			path.resolve(__dirname, "src")
      			]
                  },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            }, {
                test: /\.png$/,
                loaders: [
                    'file?name=[path][name].[ext]',
                ]
            }]
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    }
}