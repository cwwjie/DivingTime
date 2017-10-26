const xtpl = require('xtpl');
const Files = require('fs');

// 首页
xtpl.renderFile('./static/index.xtpl', {}, function(error, content) {
    Files.writeFile('./static/index.html', content, 'utf8', function() {
        console.log('index.html - OK')
    })
    Files.writeFile('./dist/index.html', content, 'utf8', function() {
        console.log('index.html - OK')
    })
});

// 详情页面
xtpl.renderFile('./static/page/index.xtpl', {}, function(error, content) {
    Files.writeFile('./static/page/index.html', content, 'utf8', function() {
        console.log('page.html - OK')
    })
    Files.writeFile('./dist/page/index.html', content, 'utf8', function() {
        console.log('page.html - OK')
    })
 });
 xtpl.renderFile('./static/page/reserve/index.xtpl', {}, function(error, content) {
    Files.writeFile('./static/page/reserve/index.html', content, 'utf8', function() {
        console.log('reserve.html - OK')
    })
    Files.writeFile('./dist/page/reserve/index.html', content, 'utf8', function() {
        console.log('reserve.html - OK')
    })
 });
 xtpl.renderFile('./static/page/payment/index.xtpl', {}, function(error, content) {
    Files.writeFile('./static/page/payment/index.html', content, 'utf8', function() {
        console.log('payment.html - OK')
    })
    Files.writeFile('./dist/page/payment/index.html', content, 'utf8', function() {
        console.log('payment.html - OK')
    })
});

// other 其他页面
xtpl.renderFile('./static/other/aboutus.xtpl', {}, function(error, content) {
    Files.writeFile('./static/other/aboutus.html', content, 'utf8', function() {
        console.log('aboutus.html - OK')
    })
    Files.writeFile('./dist/other/aboutus.html', content, 'utf8', function() {
        console.log('aboutus.html - OK')
    })
 });
 xtpl.renderFile('./static/other/teamstory.xtpl', {}, function(error, content) {
    Files.writeFile('./static/other/teamstory.html', content, 'utf8', function() {
        console.log('teamstory.html - OK')
    })
    Files.writeFile('./dist/other/teamstory.html', content, 'utf8', function() {
        console.log('teamstory.html - OK')
    })
 });
 xtpl.renderFile('./static/other/joinus.xtpl', {}, function(error, content) {
    Files.writeFile('./static/other/joinus.html', content, 'utf8', function() {
        console.log('joinus.html - OK')
    })
    Files.writeFile('./dist/other/joinus.html', content, 'utf8', function() {
        console.log('joinus.html - OK')
    })
 });
 xtpl.renderFile('./static/other/help.xtpl', {}, function(error, content) {
    Files.writeFile('./static/other/help.html', content, 'utf8', function() {
        console.log('help.html - OK')
    })
    Files.writeFile('./dist/other/help.html', content, 'utf8', function() {
        console.log('help.html - OK')
    })
 });
 xtpl.renderFile('./static/other/privacy.xtpl', {}, function(error, content) {
    Files.writeFile('./static/other/privacy.html', content, 'utf8', function() {
        console.log('privacy.html - OK')
    })
    Files.writeFile('./dist/other/privacy.html', content, 'utf8', function() {
        console.log('privacy.html - OK')
    })
 });
 xtpl.renderFile('./static/other/policy.xtpl', {}, function(error, content) {
    Files.writeFile('./static/other/policy.html', content, 'utf8', function() {
        console.log('policy.html - OK')
    })
    Files.writeFile('./dist/other/policy.html', content, 'utf8', function() {
        console.log('policy.html - OK')
    })
 });
    xtpl.renderFile('./static/other/advertising/index.xtpl', {}, function(error, content) {
        Files.writeFile('./static/other/advertising/index.html', content, 'utf8', function() {
            console.log('index.html - OK')
        })
        Files.writeFile('./dist/other/advertising/index.html', content, 'utf8', function() {
            console.log('policy.html - OK')
        })
});

// 度假村直定页面
xtpl.renderFile('./static/village/index.xtpl', {}, function(error, content) {
    Files.writeFile('./static/village/index.html', content, 'utf8', function() {
        console.log('village/index.html - OK')
    })
    Files.writeFile('./dist/village/index.html', content, 'utf8', function() {
        console.log('village/index.html - OK')
    })
 });
 xtpl.renderFile('./static/village/detail/index.xtpl', {}, function(error, content) {
    Files.writeFile('./static/village/detail/index.html', content, 'utf8', function() {
        console.log('village/index.html - OK')
    })
    Files.writeFile('./dist/village/detail/index.html', content, 'utf8', function() {
        console.log('village/index.html - OK')
    })
});


// 复制文件

    // 首页
    renderFile("./static/main.css","./dist/main.css");
    renderFile("./static/main.js","./dist/main.js");
    // 详情页面
    renderFile("./static/page/main.css","./dist/page/main.css");
    renderFile("./static/page/main.js","./dist/page/main.js");
    // 预定页面
    renderFile("./static/page/reserve/main.css","./dist/page/reserve/main.css");
    renderFile("./static/page/reserve/main.js","./dist/page/reserve/main.js");
    // 付款页面
    renderFile("./static/page/payment/main.css","./dist/page/payment/main.css");
    renderFile("./static/page/payment/main.js","./dist/page/payment/main.js");
    // other 其他页面
    copyDir("./static/other/img","./dist/other/img", function (err) { console.log("other/img - OK"); })
    renderFile("./static/other/main.css","./dist/other/main.css");
        // 广告页面
        copyDir("./static/other/advertising/img","./dist/other/advertising/img", function (err) { console.log(err) })
        renderFile("./static/other/advertising/index.css","./dist/other/advertising/index.css");
        renderFile("./static/other/advertising/h5.html","./dist/other/advertising/h5.html");

    // 用户中心
    copyDir("./static/user","./dist/user", function(err){  console.log("user/ - OK") })

    // PC 信息收集
    renderFile("./static/info/gather.html","./dist/info/gather.html");
    renderFile("./static/info/css/index.css","./dist/info/css/index.css");
    copyDir("./static/info/my","./dist/info/my", function(err){ console.log("info/my - OK") })
        // 确认函
        copyDir("./static/info/confirm","./dist/info/confirm", function(err){ console.log("info/confirm - OK") })
        // PC 查看
        copyDir("./static/info/view","./dist/info/view", function(err){ console.log("info/view - OK") })
        renderFile("./static/info/css/view.css","./dist/info/css/view.css");
    // 度假村直定页面
    copyDir("./static/village","./dist/village", function(err){ console.log("village - OK") })

// 复制单个文件
function renderFile(prevFile,targetFile) {
    Files.readFile(prevFile,'utf8',(err, data) => {
        if (err) {
            console.log(err);
            return
        };
        Files.writeFile(targetFile, data, 'utf8', function() {
            console.log(targetFile + ' - OK')
        })
    })
}
/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
  Files.access(dist, function(err){
    if(err){
      // 目录不存在时创建目录
      Files.mkdirSync(dist);
    }
    _copy(null, src, dist);
  });

  function _copy(err, src, dist) {
    if(err){
      callback(err);
    } else {
      Files.readdir(src, function(err, paths) {
        if(err){
          callback(err)
        } else {
          paths.forEach(function(path) {
            var _src = src + '/' +path;
            var _dist = dist + '/' +path;
            Files.stat(_src, function(err, stat) {
              if(err){
                callback(err);
              } else {
                // 判断是文件还是目录
                if(stat.isFile()) {
                  Files.writeFileSync(_dist, Files.readFileSync(_src));
                } else if(stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _dist, callback)
                }
              }
            })
          })
        }
      })
    }
  }
}