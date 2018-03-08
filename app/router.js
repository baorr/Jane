'use strict';

/**
 * 路由
 */
module.exports = app => {

	app.get('/', 'ui.indexView');
	app.get('/ui', 'ui.indexView');
	app.get('/musical', 'musical.indexView');
	app.get('/live', 'musical.liveView');
	
};