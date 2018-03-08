var path = require("path");
var I18nPlugin = require("i18n-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('./app/public/css/portal.css');

var languages = {
	"en-US": require("./config/locales/en-US.js"),
	"zh-CN": require("./config/locales/zh-CN.js")
};
var configs = Object.keys(languages).map(function(language) {
	let sourcePath = path.join(__dirname, "app/public/js/locales/");
	return {
		name: language,
		entry: `./config/locales/${language}.js`,
		output: {
			path: sourcePath,
			filename: `${language.toLowerCase()}.js` 
		},
		plugins: [
			new I18nPlugin(
				languages[language]
			)
		],
		module: {
			rules: [
				{
					test: /\.js?$/,
					exclude: /(node_modules|bower_components)/,
					use: [{
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					}]
				}
			]
		}
	};
});

configs.push({
		entry: `./app/public/sass/`,
		module: {
			rules: [
			      {
			        test: /\.scss$/,
			        use: ExtractTextPlugin.extract({
			          fallback: 'style-loader',
			          use: ['css-loader', 'sass-loader']
			        })
			      }
			    ]
		},
	    plugins: [
	        extractCSS
	    ]
	});

module.exports = configs;