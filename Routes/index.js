const KoaRouter = require('koa-router');
const router = new KoaRouter();
const mobileInfo = require('./mobileInfo');
const xtpl = require('xtpl');



router.get('/', function*() { yield this.render('index') });

router.get('/page/', function*() { yield this.render('page/index') });
router.get('/page/reserve/', function*() { yield this.render('page/reserve/index') });
router.get('/page/payment/', function*() { yield this.render('page/payment/index') });



router.get('/index.html', function*() { yield this.render('index') });

router.get('/page/index.html', function*() { yield this.render('page/index') });
router.get('/page/reserve/index.html', function*() { yield this.render('page/reserve/index') });
router.get('/page/payment/index.html', function*() { yield this.render('page/payment/index') });

router.get('/other/aboutus.html', function*() { yield this.render('other/aboutus') });
router.get('/other/teamstory.html', function*() { yield this.render('other/teamstory') });
router.get('/other/joinus.html', function*() { yield this.render('other/joinus') });
router.get('/other/help.html', function*() { yield this.render('other/help') });
router.get('/other/privacy.html', function*() { yield this.render('other/privacy') });
router.get('/other/policy.html', function*() { yield this.render('other/policy') });

router.get('/village/index.html', function*() { yield this.render('village/index') });
router.get('/village/detail/index.html', function*() { yield this.render('village/detail/index') });




// 手机端信息收集
// router.get('/info/mobile/index.html', function *(next) {
// 	let _this = this;
// 	yield mobileInfo(_this);
// });




module.exports = router;
