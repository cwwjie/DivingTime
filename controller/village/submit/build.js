const path = require('path');
const babel = require('babel-core');

const RelativeToFilePath = require(path.relative(__dirname, './utils/RelativeToFilePath'));
const WriteToFille = require(path.relative(__dirname, './utils/WriteToFille'));

module.exports = async function renderVillageSubmit(next) {

  const ReadeJavaScriptFilePath = RelativeToFilePath('./src/village/submit/index.js');
  const WriteJavaScriptFilePath = RelativeToFilePath('./build/village/submit/');
  let WriteJavaScriptToFille = WriteToFille.JavaScriptbyWebpack(
    ReadeJavaScriptFilePath, 
    WriteJavaScriptFilePath, 
    'index.js',
    true // 证明是生产环境
  );

  const ReadeCSSfilePath = RelativeToFilePath('./src/village/submit/index.less');
  const WriteCSSfilePath = RelativeToFilePath('./build/village/submit');
  const gulpLessfilePath = RelativeToFilePath('./src');
  let WriteCSStoFille = WriteToFille.CSS(
    ReadeCSSfilePath, 
    WriteCSSfilePath, 
    gulpLessfilePath
  );

  const ReadeHTMLfilePath = './src/village/submit/index.xtpl';
  const WriteHTMLfilePath = RelativeToFilePath('./build/village/submit/index.html');
  let WriteHTMLtoFille = WriteToFille.HTML(
    ReadeHTMLfilePath, 
    WriteHTMLfilePath
  );

  await Promise.all([
    WriteJavaScriptToFille,
    WriteCSStoFille,
    WriteHTMLtoFille
  ]).then((val) => {
    // console.log('渲染主页的产品提交成功!');
  }, (error) => {
    console.error(`渲染 主页的产品提交 出错! 原因: ${error}`);
  });
}
