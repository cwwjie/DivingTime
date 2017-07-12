const koa = require('koa');
//xtemplate模板引擎对koa的适配
const xtpl = require('xtpl/lib/koa');
const Routes = require("./routes")
const static = require('koa-static');
const app = new koa();
const fs = require('fs');


//xtemplate模板渲染 http://book.apebook.org/minghe/koa-action/xtemplate/layout.html
xtpl(app, {
    //配置模板目录，指向工程的view目录
    views: './views'
});


// 配置路由进行拦截
app.use(Routes.routes());


// 开启静态资源一定要这样做的
app.use(static("static"));


app.listen(3000);

console.log('端口已启动在3000端口');
