import header from './../../Component/Navigation-Bar/index.js';
import scrollTop from './../../Component/ScrollTop/index.js';
import convertDate from './../../../utils/convertDate.js';
 
$(document).ready(() => {

  header.init(1);
  scrollTop.init();
  product.init();
});

// 工具类
var utilities = {
  loadPageVar: function(sVar) {
  }
}

let product = {
  'data': [
    // {
    //   'catDesc': null,
    //   'catId': 13,
    //   'catName': "潜游双人套餐",
    //   'createBy': null,
    //   'createTime': null,
    //   'isDelete': null,
    //   'isShow': null,
    //   'parentId': null,
    //   'sortOrder': null,
    //   'updateBy': null,
    //   'updateTime': null,
    //   'productList': [
    //     {
    //       'apartment': "邦邦 沙滩屋",
    //       'apartmentNum': 1,
    //       'bedType': null,
    //       'brandId': null,
    //       'clickCount': null,
    //       'createBy': null,
    //       'createTime': null,
    //       'isDelete': null,
    //       'isNew': "Y",
    //       'isOnsale': null,
    //       'period': 3,
    //       'productBrief': "未经雕琢的天然小岛--邦邦岛",
    //       'productDesc': null,
    //       'productId': 64,
    //       'productImg': "/source/image/product/thum/thum_34867ce5-d61a-4576-b4fb-060365c7d638.jpg",
    //       'productName': "天然小岛邦邦 3天2晚蜜月/闺蜜行",
    //       'productPrice': 5700,
    //       'productSn': "000006",
    //       'productThumb': "/source/image/product/thum/thum_34867ce5-d61a-4576-b4fb-060365c7d638.jpg",
    //       'productType': "package",
    //       'productView': null,
    //       'promoteEndTime': 0,
    //       'promotePrice': 0,
    //       'promoteStartTime': 0,
    //       'refundRuleId': null,
    //       'updateBy': null,
    //       'updateTime': null,
    //     }
    //   ],
    // }
  ],

  init() {
    const _this = this;

    this.getProduct()
    .then(val => {
      _this.data = val;
      _this.renderProduct();
    }, error => alert(error))
  },

  renderProduct() {
    const _this = this;
    let isinterval = false;

    $('#product').html(
      this.data.map((val, key) => {
        return val.productList.map((item, key) => {
          console.log(item);
          return [
            `<div class="product-item">`,
              `<div class="item-content">`,
                `<a href="./../index.html?productId=${item.productId}">`,
                  '<div class="item-img">',
                    `<img src="${appConfig.urlBase}${item.productThumb}" />`,
                    '<div class="img-label">',
                      _this.renderLabel(item),
                    '</div>',
                  '</div>',
                '</a>',
                '<div class="item-detail">',
                  `<div class="item-productName">${item.productName}</div>`,
                  `<div class="item-productBrief">${item.productName}</div>`,
                  _this.renderPrice(item),
                '</div>',
              '</div>',
            '</div>'
          ].join('');
        }).join('');
      }).join('')
    );
  },

  isPromoteHandle(item) {
    const promotePrice = item.promotePrice,
      productPrice = item.productPrice,
      promoteEndTimestamp = item.promoteEndTime,
      promoteStartTimestamp = item.promoteStartTime,
      nowTimestamp = Date.parse(new Date());

    // 如果促销
    if (promotePrice != null && promotePrice != 0) {
      // 当前时间 大于等于 促销开始时间
      // 并且
      // 当前时间 小于等于 促销结束时间
      if (
        nowTimestamp >= promoteStartTimestamp && 
        nowTimestamp <= promoteEndTimestamp
      ) {
        return true;
      }
    }

    // 其他情况都不是促销
    return false;
  },

  renderPrice(item) {
    let isPromote = this.isPromoteHandle(item);

    return [
      '<div class="item-price">',
        `<div class="price-left">${isPromote ? '优惠价格' : '套餐价格'}</div>`,
        '<div class="price-right">',
          `￥<span>${isPromote ? item.promotePrice : item.productPrice}</span> RMB`,
        '</div>',
      '</div>',
    ].join('');
  },

  renderLabel(item) {
    const isNew = item.isNew, // 'Y' 'N'
      promotePrice = item.promotePrice,
      promoteEndTimestamp = item.promoteEndTime,
      promoteStartTimestamp = item.promoteStartTime,
      nowTimestamp = Date.parse(new Date());

    // 如果促销
    if (promotePrice != null && promotePrice != 0) {
      // 当前时间 大于等于 促销开始时间
      // 并且
      // 当前时间 小于等于 促销结束时间
      if (
        nowTimestamp >= promoteStartTimestamp && 
        nowTimestamp <= promoteEndTimestamp
      ) {
        return '<div class="label-promote">限时促销</div>'
      }
    }

    // 如果不促销
    return isNew === 'Y' ? 
    '<div class="label-isNew">新品</div>' : 
    '<div class="label-product">度假套餐</div>';
  },

  getProduct() {
    return new Promise((resolve, reject) => {
      $.ajax({
        'type': 'GET',
        'url': `${appConfig.version}/product/listWithCat.do`,
        'contentType': 'application/json; charset=utf-8',
        success: val => {
          if (val.result === '0') {
            resolve(val.data);
          } else {
            reject(`请求服务器成功, 但是产品数据有误, 原因: ${val.message}`);
          }
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
          reject(`请求产品出错, 状态码: ${XMLHttpRequest.status}. 原因: ${errorThrown}`);
        }
      });

    })
  }
}
