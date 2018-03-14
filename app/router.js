'use strict';

/**
 * 路由
 */
module.exports = app => {

	app.get('/', 'ui.indexView');
	app.get('/ui', 'ui.indexView');
	app.get('/v', 'ui.vueView');
	app.get('/r', 'ui.reactView');
	app.get('/h', 'ui.hackView')
	app.get('/musical', 'musical.indexView');
	app.get('/live', 'musical.liveView');
	
};