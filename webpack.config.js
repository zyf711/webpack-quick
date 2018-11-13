const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader'); //vue-loader，15的版本需要再添加plugin的配置
const SpritesmithPlugin = require('webpack-spritesmith') //css雪碧图

const config = {
	mode: 'development', // 不设置默认production
	// entry,output均按默认路径和文件名设置，所以可以都不写。
	entry: {
		main:'./src/index.js'
	},
	output: {
		path:path.join(__dirname,'./dist'),
		publicPath:'/dist/', //指定资源文件引用目录，可以是CDN
		filename: 'main.js'
	},
	module:{
		rules:[
			{
				test:/\.vue$/,
				loader:'vue-loader',
				options:{
					loaders:{
						css:[
							'vue-style-loader',
							'mini-css-extract-plugin',
							'css-loader'
						],
						less:[
							'vue-style-loader',
							'mini-css-extract-plugin',
							'css-loader',
							'less-loader'
						]
					}
				}
			},
			{
				test: /\.html$/,
				use: [
						{
							loader: "html-loader",
							options: { minimize: true }
						}
				]
			},
			{
			    test: /\.css$/,
			    use: [ //数组形式的话，编译是从后往前。
					MiniCssExtractPlugin.loader,
					// 'style-loader',
					'css-loader'
				]
			  },
			{
			    test: /\.less$/,
			    use: [ //数组形式的话，编译是从后往前。
					MiniCssExtractPlugin.loader,
					// 'style-loader',
					'css-loader',
					'less-loader'
				]
      		},
			{
            	test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            	loader:'url-loader?limit=1024' //文件小于1k就以base64形式加载
			}
		]
	},
	plugins: [
	    //重命名提取后的css文件
		new MiniCssExtractPlugin('main.css'),
		//vue-loader，15的版本需要再添加plugin的配置
		new VueLoaderPlugin(),
		new SpritesmithPlugin({
			//设置源icons,即icon的路径，必选项
			src: {
			  cwd: path.resolve(__dirname, 'src/images/icons'),
			  glob: '*.png'
			},
			//设置导出的sprite图及对应的样式文件，必选项
			target: {
			  image: path.resolve(__dirname, 'src/images/sprites/sprite.png'),
			  css: path.resolve(__dirname, 'src/images/sprites/sprite.css')  //也可以为less, sass文件，需要先安装相关loader
			},
			//设置sprite.png的引用格式
			apiOptions: {
			  cssImageRef: './sprite.png'  //cssImageRef为必选项
			},
			//配置spritesmith选项，非必选
			spritesmithOptions: {
			  algorithm: 'top-down'//设置图标的排列方式
			}
		  })
	]
};

module.exports = config