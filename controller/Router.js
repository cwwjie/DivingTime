const Router = require('koa-router')();
const index = require('./index.js');
const product = require('./product/Router.js');
const village = require('./village/Router.js');
const other = require('./other/Router.js');
const wedding = require('./wedding/Router.js');
const equipment = require('./equipment/Router.js');

module.exports = (app) => {
	
	Router.get('/', index);
	Router.get('/index.html', index);

	Router.use('/product', product.routes());
	Router.use('/village', village.routes());
	Router.use('/other', other.routes());
	Router.use('/wedding', wedding.routes());
	Router.use('/equipment', equipment.routes());
	
	app.use(Router.routes());
}
