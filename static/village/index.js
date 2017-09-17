$(document).ready(function() {
  myData.getAjax()
    .then(function(json) {
      myVillage.data = json;
      myVillage.init();
    },function(error) {
      alert(error);
    }
  );
});

var myData = {
  'getAjax': function() {
    return new Promise(function(resolve,reject){
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
      //   'brandId': 0,
      //   'brandName': '',
      //   'createBy': 0,
      //   'createTime': 0,
      //   'earnest': 0,
      //   'initiatePrice': 0,
      //   'isDelete': '', // 'N' 'Y'
      //   'label': '',
      //   'recommendation': '',
      //   'refundRuleId': 0,
      //   'resortCode': '', // 'KPL'
      //   'resortDesc': '',
      //   'resortId': 0,
      //   'resortImg': '',
      //   'resortName': '',
      //   'resortThumb': 0,
      //   'updateBy': null,
      //   'updateTime': null
      // }
    ],
    'pageNum': 0,
    'pageSize': 0,
    'pages': 0,
    'size': 0,
    'totalCount': 0
  },
  
  'init': function() {
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

  'template': function(data) {
    return [
      '<div class="village-block">',
        '<div class="village-content">',
          '<img src="' + URLbase + data.resortImg + '" />',
          '<div class="village-depiction">',
            '<div class="village-title">' + data.brandName + '</div>',
            '<div class="village-introduction">' + data.resortDesc + '</div>',
            '<div class="village-introduction">' + data.recommendation + '</div>',
            '<div class="village-price">预定价格: <span>' + data.initiatePrice + 'RMB</span> 起</div>',
            '<div class="village-confirm">预定度假村</div>',
          '</div>',
        '</div>',
        '<div class="village-line"></div>',
      '</div>'
    ].join('');
  },

  'bindEvent': function() {
    var dataList = this.data.list,
      myDomList = $('#village').find('.village-block');

    for (var i = 0; i < myDomList.length; i++) {(function(i){
      var myData = dataList[i];

      myDomList.click(function(){
        // localStorage.setItem('_token',$.cookie('token'));
        location = "./detail/index.html";
      });
    })(i);}
  }
}
