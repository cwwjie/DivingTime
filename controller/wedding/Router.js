const router = require('koa-router')();
const index = require('./index.js');
const detail = require('./detail/Router');

router.get('/', index);
router.get('/index.html', index);
router.use('/detail', detail.routes());

module.exports = router;
