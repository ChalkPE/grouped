import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', publicPath: '/grouped/dist/'
    },
    module: {
        rules: [
            {
                test:/\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        html: 'pug-loader',
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            }, {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            }, {
                test: /\.(png|jpe?g|gif|svg|ttf|woff2?|eot)$/,
                loader: 'file-loader',
                options: { name: '[name].[ext]?[hash]' }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("bundle.css"),
    ],
    resolve: {
        alias: { 'vue$': 'vue/dist/vue.common.js' }
    },
    devServer: {
        host: '0.0.0.0',
        historyApiFallback: true
    },
    performance: { hints: false },
    devtool: '#eval-source-map'
};
