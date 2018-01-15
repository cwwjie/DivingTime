const fs = require('fs');
const path = require('path');

const fsExtra = require('fs-extra');
const renderHome = require('./controller/build');
const renderProduct = require('./controller/product/build');
const renderProductSubmit = require('./controller/product/submit/build');
const renderVillage = require('./controller/village/build');

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

    // 将 dist 文件夹复制过去、
    fs.mkdirSync(`${__dirname}\\build\\dist`);
    await this.copyDirBy(`${__dirname}\\static\\dist`, `${__dirname}\\build\\dist`);

    // 将 dist 文件夹复制过去、
    fs.mkdirSync(`${__dirname}\\build\\appSource`);
    await this.copyDirBy(`${__dirname}\\static\\appSource`, `${__dirname}\\build\\appSource`);
    
    // 渲染配置文件
    await this.renderConfigJSFile();

    // 渲染首页
    await renderHome();

    // 创建 product 空目录 并且 渲染首页 产品详情
    fs.mkdirSync(`${__dirname}\\build\\product`);
    await renderProduct();

    // 创建 Submit 空目录 并且 渲染首页 产品详情
    fs.mkdirSync(`${__dirname}\\build\\product\\submit`);
    await renderProductSubmit();

    // 创建 product 空目录 并且 渲染度假村直定
    fs.mkdirSync(`${__dirname}\\build\\village`);
    await renderVillage();
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
      fs.mkdirSync(fileUrl);
    } catch (err) {
      console.error(`删除 ${fileUrl} 文件出错! 原因: ${err}`)
    }
  }
}

main.init();
