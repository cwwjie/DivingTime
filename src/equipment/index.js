import header from './../Component/Navigation-Bar/index.js';
import scrollTop from './../Component/ScrollTop/index.js';
 
$(document).ready(() => {
  header.init(3);
  scrollTop.init();

  equipment.init();
});

var equipment = {
  'data': [
    // {
    //   "productId": 87,
    //   "brandId": 27,
    //   "refundRuleId": 41,
    //   "productSn": "000029",
    //   "productName": "【租借】大疆航拍机",
    //   "productBrief": "高清航拍",
    //   "productImg": "/source/image/product/thum/thum_2f3ab26d-a16a-459e-a016-ab36c79e60c3.jpg",
    //   "productThumb": "/source/image/product/thum/thum_2f3ab26d-a16a-459e-a016-ab36c79e60c3.jpg",
    //   "productPrice": 3500.0,
    //   "promotePrice": 0.0,
    //   "promoteStartTime": null,
    //   "promoteEndTime": null,
    //   "clickCount": null,
    //   "isNew": "N",
    //   "isOnsale": "Y",
    //   "period": 1,
    //   "apartment": "",
    //   "apartmentNum": 1,
    //   "bedType": "",
    //   "createBy": 31,
    //   "createTime": 1517271696000,
    //   "updateBy": null,
    //   "updateTime": null,
    //   "isDelete": "N",
    //   "productDesc": null,
    //   "productType": "equipment",
    //   "productView": null
    // }
  ],

  init() {
    const _this = this;

    this.getData().then(val => {
      _this.data = val.productList;
    }, error => alert(error));
  },

  getData() {
    return new Promise((resolve, reject) => {
      $.ajax({
        'type': 'GET',
        'url': `${appConfig.version}/product/list.do?productType=equipment`,
        'contentType': 'application/json; charset=utf-8',
        success: val => {
          if (val.result === '0') {
            resolve(val.data);
          } else {
            reject(`请求服务器成功, 接收的产品信息数据有误, 原因: ${val.message}`);
          }
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
          reject(`请求产品信息发生错误, 状态码: ${XMLHttpRequest.status}. 原因: ${errorThrown}`);
        }
      });
    });
  }
}

// 工具类
let utilities = {
}
