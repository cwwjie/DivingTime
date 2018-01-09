const Router = require('koa-router')();
const index = require('./index.js');
const info = require('./info/Router.js');

module.exports = (app) => {
	
	Router.get('/', index);
	Router.get('/index.html', index);
	
	Router.use('/info', info.routes());

	app.use(Router.routes());
}
