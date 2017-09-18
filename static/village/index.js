$(document).ready(function() {
  myData.getAjax()
    .then(function(json) {
      myVillage.data = json;
      myVillage.init();
    }, function(error) {
      alert(error);
    }
  );
});

var myData = {
  getAjax: function() {
    return new Promise(function(resolve, reject){
      $.ajax({
        type: "GET",
        url: URLbase + '/Dvt-reserve/product/resort/1/1/list.do',
        contentType: "application/json; charset=utf-8",
        success: function(value) {
          if (value.result === '0') {
            resolve(value.data);
          } else {
            reject('接收数据发生错误, 原因: ' + value.message);
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          reject('接收数据发生错误, 原因: ' + errorThrown);
        }
      });
    });
  }
}

var myVillage = {
  'data': {
    'list': [
      // {
      // 'brandId': 25,
      // 'brandName': "潜游沙巴·仙本那",
      // 'createBy': 33,
      // 'createTime': 1503252103000,
      // 'earnest': 500,
      // 'initiatePrice': 1000,
      // 'isDelete': "N",
      // 'label': "热卖",
      // 'recommendation': "<p>2222222222222</p>",
      // 'refundRuleId': 29,
      // 'resortCode': "KPL",
      // 'resortDesc': "<p>111111111111111111</p>",
      // 'resortId': 1,
      // 'resortImg': "/source/image/product/thum/thum_8f217c44-f783-408a-9cc1-9c230c680769.JPG",
      // 'resortName': "卡帕莱",
      // 'resortThumb': "/source/image/product/thum/thum_8f217c44-f783-408a-9cc1-9c230c680769.JPG",
      // 'updateBy': null,
      // 'updateTime': null
      // }
    ],
    'pageNum': 0,
    'pageSize': 0,
    'pages': 0,
    'size': 0,
    'totalCount': 0
  },
  
  init: function() {
    var dataList = this.data.list,
      domString = '';

    if (dataList.length === 0) {
      domString = '暂无数据';
    } else {
      for (var i = 0; i < dataList.length; i++) {
        domString += this.template(dataList[i]);
      }
    }

    $('#village').html(domString);
    this.bindEvent();
  },

  template: function(data) {
    return [
      '<div class="village-block">',
        '<div class="village-content">',
          '<img src="' + URLbase + data.resortImg + '" />',
          '<div class="village-depiction">',
            '<div class="village-title">' + data.brandName + '</div>',
            '<div class="village-introduction">' + data.resortDesc + '</div>',
            '<div class="village-introduction">' + data.recommendation + '</div>',
            '<div class="village-price">预定价格: <span>' + data.earnest + 'RMB</span> 起</div>',
            '<div class="village-confirm">预定度假村</div>',
          '</div>',
        '</div>',
        '<div class="village-line"></div>',
      '</div>'
    ].join('');
  },

  bindEvent: function() {
    var dataList = this.data.list,
      myDomList = $('#village').find('.village-block');

    for (var i = 0; i < myDomList.length; i++) {(function(i) {
      var myData = dataList[i];

      myDomList.click(function() {
        localStorage.setItem('village',JSON.stringify(myData));
        localStorage.setItem('resortCode',myData.resortCode);
        localStorage.setItem('resortId',myData.resortId);
        location = "./detail/index.html";
      });
    })(i)}
  }
}
