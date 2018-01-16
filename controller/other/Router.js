const router = require('koa-router')();

const index = require('./index.js');

router.get('/help.html', index);
router.get('/joinus.html', index);
router.get('/policy.html', index);
router.get('/aboutus.html', index);
router.get('/privacy.html', index);
router.get('/teamstory.html', index);

module.exports = router;
