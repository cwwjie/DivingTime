const Files = require('fs');

copyDir("./src","./../DivingTime/getInfor_Mobile");
renderFile("./save.js","./../DivingTime/getInfor_Mobile/save.js");
renderFile("./package.json","./../DivingTime/getInfor_Mobile/package.json");
renderFile("./webpack.config.js","./../DivingTime/getInfor_Mobile/webpack.config.js");
renderFile("./webpack.dev.config.js","./../DivingTime/getInfor_Mobile/webpack.dev.config.js");
renderFile("./webpack.pro.config.js","./../DivingTime/getInfor_Mobile/webpack.pro.config.js");
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