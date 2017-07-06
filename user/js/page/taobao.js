/**
 * 个人中心
 * 初始化
 * 渲染所有订单
 */
var allTaobaoList = [];
function taobao() {
  // 初始化
  (function () {
    $.ajax({
      type: "GET", 
      url: URLbase+URLversion+"/gather/link/listOrder.do", 
      contentType: "application/json; charset=utf-8", 
      headers: {
        'token':$.cookie('token'),
        'digest':$.cookie('digest')
      },
      success: function (val) {
        if (val.result == "0") {
          allTaobaoList = val.data;
          Rendering();
        }else {
          alert("获取订单失败,原因:"+val.message);
        }
      }
    });

    // 初始化侧边栏
    var _clientWidth=document.body.clientWidth;
    if (_clientWidth < 500) {
      $(".Sidebar").css("right","-"+(_clientWidth+10)+"px");
      $(".Sidebar").css("width",(_clientWidth+10)+"px");
    }
    $("#closeSidebar").click(function(){
      if (_clientWidth < 500) {
        $(".Sidebar").animate({right:"-"+(_clientWidth+10)+"px"},70);
      }else{
        $(".Sidebar").animate({right:'-330px'},70);
      }
    })
    // 遇到问题
    $("#meetTrouble").click(function(){
      $(".Sidebar").animate({right:'0'},70);
    });
  })();
  // 渲染所有订单
  function Rendering() {
    if (allTaobaoList.length == 0) {
      return
    }
    // 渲染UI
    var item = "";
    for (var i = 0; i < allTaobaoList.length; i++) {
      item += "<div class='List-item'><div class='item-title'>订单号:<span>"//
      +allTaobaoList[i].orderSn+"</span>状态:<span>"//
      +paystatus(allTaobaoList[i].payStatus)+"</span></div><div class='item-content'><div class='content1'><div>"//
      +allTaobaoList[i].orderName+"</div><div class='orderDesc'>"//
      +allTaobaoList[i].orderDesc+"</div><div class='minor'>"//
      +dateToFormat(allTaobaoList[i].checkIn)+"到"//
      +dateToFormat(allTaobaoList[i].checkOut)+"</div><div class='minor'>"//
      +allTaobaoList[i].roomNum+"间房/"//
      +allTaobaoList[i].adultNum+"成人/"//
      +allTaobaoList[i].childNum+"儿童</div></div><div class='content2'><div class='minor'>产品总金额:<span>"//
      +allTaobaoList[i].productAmount+"</span>RMB</div><div class='minor'>优惠金额:<span>"//
      +allTaobaoList[i].discount+"</span>RMB</div><div class='minor'>订单总金额:<span>"//
      +allTaobaoList[i].orderAmount+"</span>RMB</div>"//
      +amountstatus(allTaobaoList[i].payStatus,allTaobaoList[i].payAmount,allTaobaoList[i].notPayAmount)+"</div><div class='content3'>"//
      +information(allTaobaoList[i].infoId,i)+"</div></div><div class='line'></div></div>"




      // item += "<div class='item'><div class='item1'>"//
      // +allTaobaoList[i].orderSn+"</div><div class='postion item2'>"//
      // +paystatus(allTaobaoList[i].payStatus)+"</div><div class='postion item3'>"//
      // +allTaobaoList[i].orderName+"</div><div class='postion item4'>"//
      // +dateToFormat(allTaobaoList[i].checkIn)+"</div><div class='postion item5'>"//
      // +dateToFormat(allTaobaoList[i].checkOut)+"</div><div class='postion item6'>"//
      // +information(allTaobaoList[i].isComplete,i)+"</div><div class='line'></div></div>";
    }
    $("#Render-item").html(item);
    // 绑定事件
    var supplementNum = 0;
    for (var j = 0; j < allTaobaoList.length; j++) {
      // 判断绑定什么事件
      if (allTaobaoList[j].infoId == null) {
        supplementNum++;
        $("#supplement"+j).click(function(event){
          var i = event.target.getAttribute("data-id");
          localStorage.setItem('_token',$.cookie('token'));
          localStorage.setItem('_digest',$.cookie('digest'));
          localStorage.setItem('_uniqueKey',allTaobaoList[i].uniqueKey);
          localStorage.setItem('loginSuccessful',JSON.stringify(allTaobaoList[i]));
          window.open("./../info/gather.html");
          $("#pop-up").click(function(event) {
            window.open("./../info/gather.html");
            location = "./../info/gather.html";
          });
          $('#taobaoModal').modal({backdrop:'static'});
        });
      }else {
        $("#checking"+j).click(function(event){
          var i = event.target.getAttribute("data-id");
          localStorage.setItem('_token',$.cookie('token'));
          localStorage.setItem('_digest',$.cookie('digest'));
          localStorage.setItem('_uniqueKey',allTaobaoList[i].uniqueKey);
          localStorage.setItem('loginSuccessful',JSON.stringify(allTaobaoList[i]));
          window.open("./../info/gather.html");
          $("#pop-up").click(function(event) {
            window.open("./../info/gather.html");
            location = "./../info/gather.html";
          });
          $('#taobaoModal').modal({backdrop:'static'});
        });
      }
    }
    if (supplementNum==1) {
      for (var F = 0; F < allTaobaoList.length; F++) {
        if (allTaobaoList[F].infoId == null) {
          localStorage.setItem('_token',$.cookie('token'));
          localStorage.setItem('_digest',$.cookie('digest'));
          localStorage.setItem('_uniqueKey',allTaobaoList[F].uniqueKey);
          localStorage.setItem('loginSuccessful',JSON.stringify(allTaobaoList[F]));
            window.open("./../info/gather.html");
          $("#pop-up").click(function(event) {
            window.open("./../info/gather.html");
            location = "./../info/gather.html";
          });
          $('#taobaoModal').modal({backdrop:'static'});
          return
        }
      }
    }else if (supplementNum > 1) {
      alert('您有多份信息收集未完成，请尽快完成')
    }




    function paystatus(val) {
      if (val == 1) {
        return "已付全款"
      }else if (val == 2) {
        return "已付定金"
      }
    }
    function amountstatus(payStatus,payAmount,notPayAmount) {
      if (payStatus == 1) {
        return ""
      }else if (payStatus == 2) {
        var _string = "<div class='minor'>已付金额:<span>"//
          +payAmount+"</span>RMB</div><div class='minor'>未付金额:<span>"//
          +notPayAmount+"</span>RMB</div>";
        return _string
      }
    }
    function information(infoId,i) {
      if (infoId == null) {
        return "<div class='supplement' id='supplement"+i+"' data-id="+i+">填写出行信息</div>"
      }else {
        return "<div class='checking' id='checking"+i+"' data-id="+i+">查看信息</div>"
      }
    }
  }
}





// stamp 转换 xxxx-xx-xx 字符串
function dateToFormat(stamp) {
  var _data = new Date(stamp);

  var year = _data.getFullYear();//获取完整的年份(4位,1970)

  var month = _data.getMonth()+1;//获取月份(0-11,0代表1月,用的时候记得加上1)

  if( month <= 9 ){
    month = "0"+month;
  }

  var date = _data.getDate();//获取日(1-31)

  if( date <= 9 ){
    date = "0"+date;
  }

  return year+"-"+month+"-"+date;
}

















