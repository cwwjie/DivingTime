const path = require('path');
const babel = require('babel-core');

const RelativeToFilePath = require(path.relative(__dirname, './utils/RelativeToFilePath'));
const WriteToFille = require(path.relative(__dirname, './utils/WriteToFille'));

module.exports = async function renderWedding(next) {

  const ReadeJavaScriptFilePath = RelativeToFilePath('./src/wedding/index.js');
  const WriteJavaScriptFilePath = RelativeToFilePath('./build/wedding/');
  let WriteJavaScriptToFille = WriteToFille.JavaScriptbyWebpack(
    ReadeJavaScriptFilePath, 
    WriteJavaScriptFilePath, 
    'index.js',
    true // 证明是生产环境
  );

  const ReadeCSSfilePath = RelativeToFilePath('./src/wedding/index.less');
  const WriteCSSfilePath = RelativeToFilePath('./build/wedding');
  const gulpLessfilePath = RelativeToFilePath('./src');
  let WriteCSStoFille = WriteToFille.CSS(
    ReadeCSSfilePath, 
    WriteCSSfilePath, 
    gulpLessfilePath
  );

  const ReadeHTMLfilePath = './src/wedding/index.xtpl';
  const WriteHTMLfilePath = RelativeToFilePath('./build/wedding/index.html');
  let WriteHTMLtoFille = WriteToFille.HTML(
    ReadeHTMLfilePath, 
    WriteHTMLfilePath
  );

  await Promise.all([
    WriteJavaScriptToFille,
    WriteCSStoFille,
    WriteHTMLtoFille
  ]).then((val) => {
    // console.log('渲染主页的产品详情成功!');
  }, (error) => {
    console.error(`渲染 主页的产品详情 出错! 原因: ${error}`);
  });
}
