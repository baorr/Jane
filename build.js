const webpack = require('webpack'); //to access webpack runtime
const configuration = require('./webpack.config.js');

let compiler = webpack(configuration);

compiler.run(function(err, stats) {
	if(err) console.log(err);
});