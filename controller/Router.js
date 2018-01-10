const Router = require('koa-router')();
const index = require('./index.js');
const product = require('./product/Router.js');

// 这个是测试
const info = require('./info/Router.js');

module.exports = (app) => {
	
	Router.get('/', index);
	Router.get('/index.html', index);

	Router.use('/product', product.routes());
	
	Router.use('/info', info.routes());

	app.use(Router.routes());
}
