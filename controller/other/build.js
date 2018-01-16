const path = require('path');
const babel = require('babel-core');

const RelativeToFilePath = require(path.relative(__dirname, './utils/RelativeToFilePath'));
const WriteToFille = require(path.relative(__dirname, './utils/WriteToFille'));

module.exports = async function renderOther(next) {

  const ReadeJavaScriptFilePath = RelativeToFilePath('./src/other/index.js');
  const WriteJavaScriptFilePath = RelativeToFilePath('./build/other/');
  let WriteJavaScriptToFille = WriteToFille.JavaScriptbyWebpack(
    ReadeJavaScriptFilePath, 
    WriteJavaScriptFilePath, 
    'index.js',
    true // 证明是生产环境
  );

  const ReadeCSSfilePath = RelativeToFilePath('./src/other/index.less');
  const WriteCSSfilePath = RelativeToFilePath('./build/other');
  const gulpLessfilePath = RelativeToFilePath('./src');
  let WriteCSStoFille = WriteToFille.CSS(
    ReadeCSSfilePath, 
    WriteCSSfilePath, 
    gulpLessfilePath
  );


  const Reade_aboutusfile_Path = './src/other/aboutus.xtpl';
  const Write_aboutusfile_Path = RelativeToFilePath('./build/other/aboutus.html');
  let Write_aboutusfile_ = WriteToFille.HTML(
    Reade_aboutusfile_Path, 
    Write_aboutusfile_Path
  );
  
  const Reade_helpfile_Path = './src/other/help.xtpl';
  const Write_helpfile_Path = RelativeToFilePath('./build/other/help.html');
  let Write_helpfile_ = WriteToFille.HTML(
    Reade_helpfile_Path, 
    Write_helpfile_Path
  );
  
  const Reade_joinusfile_Path = './src/other/joinus.xtpl';
  const Write_joinusfile_Path = RelativeToFilePath('./build/other/joinus.html');
  let Write_joinusfile_ = WriteToFille.HTML(
    Reade_joinusfile_Path, 
    Write_joinusfile_Path
  );
  
  const Reade_policyfile_Path = './src/other/policy.xtpl';
  const Write_policyfile_Path = RelativeToFilePath('./build/other/policy.html');
  let Write_policyfile_ = WriteToFille.HTML(
    Reade_policyfile_Path, 
    Write_policyfile_Path
  );
  
  const Reade_privacyfile_Path = './src/other/privacy.xtpl';
  const Write_privacyfile_Path = RelativeToFilePath('./build/other/privacy.html');
  let Write_privacyfile_ = WriteToFille.HTML(
    Reade_privacyfile_Path, 
    Write_privacyfile_Path
  );
  
  const Reade_teamstoryfile_Path = './src/other/teamstory.xtpl';
  const Write_teamstoryfile_Path = RelativeToFilePath('./build/other/teamstory.html');
  let Write_teamstoryfile_ = WriteToFille.HTML(
    Reade_teamstoryfile_Path, 
    Write_teamstoryfile_Path
  );

  await Promise.all([
    WriteJavaScriptToFille,
    WriteCSStoFille,

    Write_aboutusfile_,
    Write_helpfile_,
    Write_joinusfile_,
    Write_policyfile_,
    Write_privacyfile_,
    Write_teamstoryfile_
  ]).then((val) => {
    // console.log('渲染主页的关于更多成功!');
  }, (error) => {
    console.error(`渲染 主页的关于更多 出错! 原因: ${error}`);
  });
}
