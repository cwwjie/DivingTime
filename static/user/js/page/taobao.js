function taobao() {
  sidebar.init();
  myTaobaoOrder.init();
}

// 侧边栏
var sidebar = {
  'clientWidth': 1170,

  init: function () {
    this.clientWidth = document.body.clientWidth;

    if (this.clientWidth < 500) {
      $(".Sidebar").css("right","-"+(this.clientWidth+10)+"px");
      $(".Sidebar").css("width",(this.clientWidth+10)+"px");
    }

    $("#closeSidebar").click(function(){
      if (this.clientWidth < 500) {
        $(".Sidebar").animate({right:"-"+(this.clientWidth+10)+"px"},70);
      }else{
        $(".Sidebar").animate({right:'-330px'},70);
      }
    })

    // 遇到问题
    $("#meetTrouble").click(function(){
      $(".Sidebar").animate({right:'0'},70);
    });

    $(".meetTrouble").click(function(){
      $(".Sidebar").animate({right:'0'},70);
    });
  }

};

var myTaobaoOrder = {
  'pageNum': 1,
  'pageSize': 10, // 10
  'pages': null,
  'totalCount': null,

  'data': [

  ],

  init: function () {
    this.getData();
  },

  renderList: function() {
    var allTaobaoList = this.data;

    // 渲染UI
    var item = "";
    for (var i = 0; i < allTaobaoList.length; i++) {
      item += [
        '<div class="List-item">',
          '<div class="item-title">',
            '订单号:<span>'+allTaobaoList[i].orderSn+'</span>状态:<span>'+this.paystatus(allTaobaoList[i].payStatus)+'</span>',
          '</div>',
          '<div class="item-content">',
            '<div class="content1">',
              '<div>'+allTaobaoList[i].orderName+'</div>',
              '<div class="orderDesc">'+allTaobaoList[i].orderDesc+'</div>',
              '<div class="minor">'+this.dateToFormat(allTaobaoList[i].checkIn)+'到'+this.dateToFormat(allTaobaoList[i].checkOut)+'</div>',
              '<div class="minor">'+allTaobaoList[i].roomNum+'间房/'+allTaobaoList[i].adultNum+'成人/'+allTaobaoList[i].childNum+'儿童</div>',
              '<div class="minor">'+this.templateToString(allTaobaoList[i].template)+'</div>',
            '</div>',
            '<div class="content2">',
              this.amountstatus(allTaobaoList[i].payStatus,allTaobaoList[i].payAmount,allTaobaoList[i].notPayAmount),
              '<div class="minor">产品总金额:<span>'+allTaobaoList[i].productAmount+'</span>RMB</div>',
              '<div class="minor">优惠金额:<span>'+allTaobaoList[i].discount+'</span>RMB</div>',
              '<div class="minor">订单总金额:<span>'+allTaobaoList[i].orderAmount+'</span>RMB</div>',
            '</div>',
            '<div class="content3">',
              this.information(allTaobaoList[i].infoId,allTaobaoList[i].isConfirmed,i),
            '</div>',
          '</div>',
          '<div class="line"></div>',
        '</div>'
      ].join('');
    }
    if (allTaobaoList.length == 0) {
      $("#Render-item").html('淘宝订单为空');
      return
    }
    $("#Render-item").html(item);
    this.renderpageNavigation();

    // 绑定事件
    var supplementNum = 0;
    for (var j = 0; j < allTaobaoList.length; j++) {
      // 判断绑定什么事件
      if (allTaobaoList[j].infoId == null) {
        supplementNum++;
        // 第一次 填写信息收集
        $("#supplement"+j).click(function(event){
          var i = event.target.getAttribute("data-id");
          localStorage.setItem('_token',$.cookie('token'));
          localStorage.setItem('_digest',$.cookie('digest'));
          localStorage.setItem('_uniqueKey',allTaobaoList[i].uniqueKey);
          localStorage.setItem('loginSuccessful',JSON.stringify(allTaobaoList[i]));
          if (sidebar.clientWidth < 768) {
            window.open("./../info/mobile/index.html");
          }else {
            window.open("./../info/index.html");
          }
          $("#pop-up").click(function(event) {
            if (sidebar.clientWidth < 768) {// 手机端
              window.open("./../info/mobile/index.html");
              location = "./../info/mobile/index.html";
            }else {
              window.open("./../info/index.html");
              location = "./../info/index.html";
            }
          });
          // $('#taobaoModal').modal({backdrop:'static'});
        });
      }else {
        // 信息收集
        $("#checking"+j).click(function(event){
          var i = event.target.getAttribute("data-id");
          localStorage.setItem('_token',$.cookie('token'));
          localStorage.setItem('_digest',$.cookie('digest'));
          localStorage.setItem('_uniqueKey',allTaobaoList[i].uniqueKey);
          localStorage.setItem('loginSuccessful',JSON.stringify(allTaobaoList[i]));
          if (sidebar.clientWidth < 768) {// 手机端
            window.open("./../info/mobile/index.html");
          }else {
            window.open("./../info/view/index.html");
          }
          $("#pop-up").click(function(event) {
            if (sidebar.clientWidth < 768) {
              window.open("./../info/mobile/index.html");
              location = "./../info/mobile/index.html";
            }else {
              location = "./../info/view/index.html";
              window.open("./../info/view/index.html");
            }
          });
          // $('#taobaoModal').modal({backdrop:'static'});
        });
        // 如果有确认函，显示并绑定确认函
        if (allTaobaoList[j].isConfirmed == "Y") {
          $("#confirm"+j).click(function(event){
            var P = event.target.getAttribute("data-id");
            localStorage.setItem('confirmUniqueKey',allTaobaoList[P].uniqueKey);
            window.open("./../info/confirm/index.html");
            $("#pop-confirm").click(function(event) {
              window.open("./../info/confirm/index.html");
              location = "./../info/confirm/index.html";
            });
            // $('#confirmModal').modal({backdrop:'static'});
          });
        }
      }
    }
  },
  
  renderpageNavigation: function() {
    var _this = this,
        myPageNum = this.pageNum,
        mypages = this.pages,
        mytotalCount = this.totalCount;

    if (mypages === 1) { return }
    var pageNavigation = [
      "<nav aria-label='Page navigation'>",
        "<ul class='pagination'>",
          "<li id='PreviousPage'>",
            "<a aria-label='Previous'>",
              "<span aria-hidden='true'>&laquo;</span>",
            "</a>",
          "</li>",

          renderLi(),

          "<li id='NextPage'>",
            "<a aria-label='Next'>",
              "<span aria-hidden='true'>&raquo;</span>",
            "</a>",
          "</li>",
        "</ul>",
      "</nav>",
    ].join("");
    
    $('#pageNavigation').html(pageNavigation);

    for (var i = 1; i < ($('.pagination li').length - 1); i++) {(function (i) {
      $($('.pagination li')[i]).click(function (event) {
        if (i === _this.pageNum) { return }
        $('#renderOrders').html('正在加载...');
        _this.pageNum = i;
        _this.getData();
      })
    })(i)}

    // 返回上一页
    $('#PreviousPage').click(function () {
      if (_this.pageNum === 1) { return }
      $('#renderOrders').html('正在加载...');
      _this.pageNum--
      _this.getData();
    });
    // 跳转下一页
    $('#NextPage').click(function () {
      if (_this.pageNum >= _this.pages) { return }
      $('#renderOrders').html('正在加载...');
      _this.pageNum++
      _this.getData();
    });

    function renderLi() {
      var myString = '';

      for (var i = 0; i < mypages; i++) {
        var page = i + 1;

        if (page === myPageNum) {
          myString += "<li class='active'><a>" + page + "</a></li>";
        } else {
          myString += "<li><a>" + page + "</a></li>";
        }
      }

      return myString;
    }
  },

  getData: function (pageNum, pageSize) {
    var _this = this,
        myPageNum = pageNum || this.pageNum;
        myPageSize = pageSize || this.pageSize;

		$.ajax({
			'type': 'GET', 
			'url': URLbase + URLversion + '/gather/link/' + myPageNum + '/' + myPageSize + '/listOrder.do', 
			'contentType': 'application/json; charset=utf-8', 
			'headers': {
				'token': $.cookie('token'),
				'digest': $.cookie('digest')
			},
			success: function (json) {  
        if (json.result == "0") {
          _this.data = json.data.list;
					_this.pages = json.data.pages;
          _this.totalCount = json.data.totalCount;
          _this.renderList();
        }else {
          alert("获取订单失败,原因:"+ json.message);
        }
			},
      error: function(e) {
        alert('加载数据发生错误, 原因:' + e);
      }
		});
  },

  amountstatus: function (payStatus, payAmount, notPayAmount) {
    if (payStatus == 1) {
      return ""
    }else if (payStatus == 2) {
      var _string = "<div class='minor'>已付金额:<span>"//
        +payAmount+"</span>RMB</div><div class='minor'>未付金额:<span>"//
        +notPayAmount+"</span>RMB</div>";
      return _string
    }
  },

  paystatus: function (val) {
    return val === 1 ? '已付全款' : '已付定金';
  },

  information: function (infoId,isConfirmed,i) {
    if (infoId == null) {
      return "<div class='supplement' id='supplement"+i+"' data-id="+i+">填写出行信息</div>"
    }else {
      // 说明可以查看确认函
      if (isConfirmed == 'Y') {
        return "<div class='checking' id='checking"+i+"' data-id="+i+">查看信息</div><div class='checking' id='confirm"+i+"' data-id="+i+">查看确认函</div>"
      }else {
        return "<div class='checking' id='checking"+i+"' data-id="+i+">查看信息</div>"
      }
    }
  },

  // stamp 转换 xxxx-xx-xx 字符串
  dateToFormat: function (stamp) {
    var _data = new Date(stamp);

    var year = _data.getFullYear(); //获取完整的年份(4位,1970)

    var month = _data.getMonth()+1; //获取月份(0-11,0代表1月,用的时候记得加上1)

    if( month <= 9 ){
      month = "0"+month;
    }

    var date = _data.getDate(); //获取日(1-31)

    if( date <= 9 ){
      date = "0"+date;
    }

    return year+"-"+month+"-"+date;
  },

  templateToString: function (data) {
    if (data == 1) {
      return "马达京彩瑚度假村";
    }else if(data == 2) {
      return "MWB马步水上屋度假村";
    }else if(data == 3) {
      return "卡帕莱度假村";
    }else if(data == 4) {
      return "诗巴丹平台潜水度假村";
    }else if(data == 5) {
      return "邦邦岛龙珠度假村";
    }else if(data == 6) {
      return "Smart沙滩木屋度假村(马步木屋)";
    }else if(data == 7) {
      return "邦邦岛白珍珠度假村";
    }else if(data == 8) {
      return "马步岛婆罗度假村";
    }else if(data == 9) {
      return "兰卡央度假村";
    }else if(data == 11 || data == 12 || data == 13 || data == 14) {
      return "爱昵岛度假村";
    } else {
      return "度假村";
    }
  },

}
