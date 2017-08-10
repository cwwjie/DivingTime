const fs = require('fs');

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

let mobileInfo =  async (ctx) => {
	let webpackPromise = new Promise(function(resolve, reject){
		let compiler = webpack({
		  entry: { "index": path.resolve(__dirname, './../static/info/mobile/src/index') },

		  output: {
		    filename: '[name].js',
		    chunkFilename: '[id].chunk.js',
		    path: path.join(__dirname, './../static/info/mobile/dist'),
		    publicPath: '/dist/'
		  },

		  resolve: {
		    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
		    extensions: ['', '.web.js', '.jsx', '.js', '.json'],
		  },

		  module: {
		    noParse: [/moment.js/],
		    loaders: [
		      {
		        test: /\.jsx$/, exclude: /node_modules/, loader: 'babel',
		        query: {
		          plugins: [
		            'external-helpers', // why not work?
		            ["transform-runtime", { polyfill: false }],
		            ["import", [{ "style": "css", "libraryName": "antd-mobile" }]]
		          ],
		          presets: ['es2015', 'stage-0', 'react']
		        }
		      },
		      { test: /\.(jpg|png)$/, loader: "url?limit=8192" },
		      // svg-sprite for antd-mobile@1.0
		      { test: /\.(svg)$/i, loader: 'svg-sprite', include: [
		        require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
		        // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 自己私人的 svg 存放目录
		      ]},
		      // { test: /\.css$/, loader: 'style!css' }, // 把css处理成内联style，动态插入到页面
		      { test: /\.less$/i, loader: ExtractTextPlugin.extract('style', 'css!postcss!less') },
		      { test: /\.css$/i, loader: ExtractTextPlugin.extract('style', 'css!postcss') }
		    ]
		  },
		  postcss: [
		    autoprefixer({
		      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
		    }),
		    pxtorem({ rootValue: 100, propWhiteList: [] })
		  ],
		  externals: {
		    "react": "React",
		    "react-dom": "ReactDOM"
		  },
		  plugins: [
		    // new webpack.optimize.CommonsChunkPlugin('shared.js'),
		    new webpack.optimize.CommonsChunkPlugin({
		      // minChunks: 2,
		      name: 'shared',
		      filename: 'shared.js'
		    }),
		    new ExtractTextPlugin('[name].css', { allChunks: true })
		    // 生产环境就要加入这个
	        // new webpack.optimize.UglifyJsPlugin({
	        //     compress:{
	        //         warnings:false
	        //     },
	        //     mangle:{
	        //         except:['$super','$','exports','require']
	        //     }
	        // })
		  ]
		});

		compiler.run((err, stats) => {
			resolve(stats);
		});
	});

	await webpackPromise.then(function(successMessage){
		console.log('打包成功');
	});

	let readFilePromise = new Promise(function(resolve, reject){
		fs.readFile(path.resolve(__dirname, './../static/info/mobile/index.html'), 'utf8', (err, data) => {
		  if (err) {
		  	resolve('错误');
			return
		  };
		  resolve(data);
		});
	});
	await readFilePromise.then(function(successMessage){
		if (successMessage == '错误') {
			ctx.body = '读取文件出错';
		}else {
			ctx.body = successMessage;
		}
	});
}




module.exports = mobileInfo;
