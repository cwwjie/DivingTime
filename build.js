const fs = require('fs');
const path = require('path');

const fsExtra = require('fs-extra');
const renderHome = require('./controller/build');
const renderProduct = require('./controller/product/build');
const renderProductSubmit = require('./controller/product/submit/build');
const renderVillage = require('./controller/village/build');
const renderVillageDetail = require('./controller/village/detail/build');
const renderVillageSubmit = require('./controller/village/submit/build');
const renderOther = require('./controller/other/build');

let main = {
  URLbase: 'http://112.74.92.97:8080',
  URLversion: 'http://112.74.92.97:8080/dvtweb',
  URLvillage: 'http://112.74.92.97:8080/dvtreserve',

  urlConfig() {
    return Buffer.from(`var appConfig = { urlBase: "${this.URLbase}", version: "${this.URLversion}", village: "${this.URLvillage}" };`);
  },

  async init() {
    // 清空 build 文件夹
    await this.emptyDirBy(`${__dirname}\\build`);

    // 复制 dist 文件夹
    fs.mkdirSync(`${__dirname}\\build`);
    await this.copyDirBy(`${__dirname}\\static\\dist`, `${__dirname}\\build\\dist`);

    // 复制 appSource 文件夹
    await this.copyDirBy(`${__dirname}\\static\\appSource`, `${__dirname}\\build\\appSource`);
    
    // 渲染 appConfig 配置文件
    await this.renderConfigJSFile();

    // 渲染 index 首页
    await renderHome();

    // 渲染 product 首页 产品详情
    fs.mkdirSync(`${__dirname}\\build\\product`);
    await renderProduct();

    // 渲染 Submit 首页 产品提交
    fs.mkdirSync(`${__dirname}\\build\\product\\submit`);
    await renderProductSubmit();
    
    // 渲染 payment 产品付款成功
    fs.mkdirSync(`${__dirname}\\build\\page`);
    await this.copyDirBy(`${__dirname}\\static\\page\\payment`, `${__dirname}\\build\\page\\payment`);

    // 渲染 village 度假村直定
    fs.mkdirSync(`${__dirname}\\build\\village`);
    await renderVillage();

    // 渲染 detail 度假村直定 产品详情
    fs.mkdirSync(`${__dirname}\\build\\village\\detail`);
    await renderVillageDetail();

    // 渲染 submit 度假村直定 产品提交
    fs.mkdirSync(`${__dirname}\\build\\village\\submit`);
    await renderVillageSubmit();

    // 渲染 other 主页 关于更多
    fs.mkdirSync(`${__dirname}\\build\\other`);
    await renderOther();

    // 渲染 advertising 主页 广告页面
    await this.copyDirBy(`${__dirname}\\static\\other\\advertising`, `${__dirname}\\build\\other\\advertising`);

    // 渲染 info 信息收集页面
    await this.copyDirBy(`${__dirname}\\static\\info`, `${__dirname}\\build\\info`);
    await this.emptyDirBy(`${__dirname}\\build\\info\\mobile`);

    // 渲染 user 用户中心
    await this.copyDirBy(`${__dirname}\\static\\user`, `${__dirname}\\build\\user`);
  },

  async renderConfigJSFile() {
    try {
      await fsExtra.outputFile(`${__dirname}\\build\\dist\\js\\config.js`, this.urlConfig())
    } catch (err) {
      console.error(`渲染 config.js 配置文件出错! 原因: ${err}`)
    }
  },

  async copyDirBy(prevFile, targetFile) {
    try {
      await fsExtra.copy(prevFile, targetFile)
    } catch (err) {
      console.error(`复制 ${prevFile} 文件出错! 原因: ${err}`)
    }
  },

  async emptyDirBy(fileUrl) {
    try {
      await fsExtra.remove(fileUrl);
    } catch (err) {
      console.error(`删除 ${fileUrl} 文件出错! 原因: ${err}`)
    }
  }
}

main.init();
