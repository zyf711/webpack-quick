const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');
webpackBaseConfig.plugins = [];

// 压缩js，css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

//压缩图片
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = merge(webpackBaseConfig,{
	mode: 'production',
	output:{
		publicPath:'/dist/',
		filename:'[name].[chunkhash].js',
	},
	optimization: {
	    minimizer: [
			new UglifyJsPlugin({
			    cache: true,
			    parallel: true,
			    sourceMap: true 
			  }),
			new OptimizeCSSAssetsPlugin({}) 
	    ]
	},
	plugins:[
		new MiniCssExtractPlugin({
			filename:'[name].[chunkhash].css'
		}),
		new HtmlWebpackPlugin({
			filename:'./index_prod.html',
			template:'./index.ejs',
			inject:false
		}),
		new VueLoaderPlugin(),
		new ImageminPlugin({ 
				test: /\.(jpe?g|gif|png|svg)$/i,
				optipng: {
				optimizationLevel:6
				}	
    	})
	]
});