var mainInfo = {};
var loademail = '';
var loadnickName = '';
var loadqrCode = '';
var template = '';
var loadwebChat = '';
var loadtype = '';

$(document).ready(function() {
  loadMessage();
});

function loadMessage() {
  var confirmUniqueKey = localStorage.getItem('confirmUniqueKey');
  $.ajax({
    type: "GET", 
    url: URLbase+URLversion+"/gather/confirmation/"+confirmUniqueKey+"/get.do", 
    contentType: "application/json; charset=utf-8", 
    success: function (val) {
      if (val.result == "0") {
        $(".content").css('display','block');

        mainInfo = val.data.mainInfo;
        loademail = val.data.email;
        loadnickName = val.data.nickName;
        loadqrCode = val.data.qrCode;
        template = val.data.template;
        loadwebChat = val.data.webChat;
        loadtype = val.data.type;


        // 付款确认函
        if (val.data.type == "P") {
          earnest();
        }else if (val.data.type == "T") {// 出行确认函
          fullamount();
        }

        if (val.data.type == "E") {
          earnest();
        }else if (val.data.type == "F") {
          fullamount();
        }
      }else {
        alert("确认函信息获取失败，原因:"+val.message+"。请联系客服！");
        location = "./../../index.html";
      }
    }
  });
}

// 付款确认函
function earnest() {
  $("title").html("潜游时光-付款确认函");
  $("#earnest").css("display","block");
  $("#part3-fullamount").css("display","none");
  var bedTypeString = "";
  var StringisDive = "浮潜套餐";
  for (var i = 0; i < mainInfo.roomInfoList.length; i++) {
    bedTypeString += mainInfo.roomInfoList[i].bedType+"、";
    for (var j = 0; j < mainInfo.roomInfoList[i].customerInfoList.length; j++) {
      if (mainInfo.roomInfoList[i].customerInfoList[j].isDive == "Y") {
        StringisDive = "浮潜+深潜套餐";
      }
    }
  }

  $(".part1").html(
    "<img class='mainlogo' src='./img/logo.png'>"
    +"<div><div class='earnest-title'>付款确认函</div></div>"
  );

  // part3

  // 淘宝订单号
  $("#orderSn").html(mainInfo.orderSn);
  // 订房码
  if (mainInfo.reservationCode) {
    $("#reservationCode").html(mainInfo.reservationCode);
  }else {
    $("#reservationCode").html("无");
  }
  // 入住人数
  $("#Occupancy").html(mainInfo.adultNum+"成人/"+mainInfo.childNum+"儿童");
  $("#OccupancyEN").html(mainInfo.adultNum+"adult，"+mainInfo.childNum+"kids");
  // 床型
  $("#bedType").html(bedTypeString.substring(0,(bedTypeString.length-1)));
  // 上岛日期
  $("#checkIn").html(stampToFormat(mainInfo.checkIn)+"(最早14:00入住)");
  // 房型&数量
  $("#roomNum").html(mainInfo.orderName+" / "+mainInfo.roomNum+"间");
  // 离岛日期
  $("#checkOut").html(stampToFormat(mainInfo.checkOut)+"(最晚11:00退房)");
  // 套餐&总价
  var jitianjiwan = Math.round((mainInfo.checkOut - mainInfo.checkIn)/86400000);
  $("#Package").html((jitianjiwan+1)+"天"+jitianjiwan+"晚 "+StringisDive);
  $("#TotalPrice").html(mainInfo.orderAmount);
  // 备注
  var Prepaid = 0;
  if (template == 3 || template == 7 || template == 9 ) {
    Prepaid = 86400000 * 36;
  }else {
    Prepaid = 86400000 * 47;
  }
  if (mainInfo.payStatus == 1) { // 付全款
    $("#Remarks").html(
      "<div>预定人："+mainInfo.signName+"</div>"
      +"<div>总价："+mainInfo.calMethod+"</div>"
    );
  }else if (mainInfo.payStatus == 2) {// 定金
    $("#Remarks").html(
      "<div>预定人："+mainInfo.signName+"</div>"
      +"<div>总价："+mainInfo.calMethod+"</div>"
      +"<div>定金："+mainInfo.payAmount+"元（已付）</div>"
      +"<div>余款："+mainInfo.notPayAmount+"元（未付，请于"+stampToFormat((mainInfo.checkIn-Prepaid))+"之前付清）</div>"
    );
  }
  // part4
  $("#qrCode").html(
    "<img src=" + URLbase +loadqrCode+"><div class='message'><div>预订、个人专享</div><div>24小时微服务伴您一路旅程</div><div>（微信号："+loadwebChat+"）</div></div>"
  );

  $(".part5").css('display','none');
  $(".part6").css('display','none');
  $(".part7").css('display','none');
  $(".part8").css('display','none');

}

// 全款确认函
function fullamount() {
  $("title").html("潜游时光-全款确认函");

  // part4
  $("#qrCode").html(
    "<img src=" + URLbase +loadqrCode+"><div class='message'><div>预订、个人专享</div><div>24小时微服务伴您一路旅程</div><div>（微信号："+loadwebChat+"）</div></div>"
  );

  var bedTypeString = "";
  var StringisDive = "浮潜套餐";
  var PersonalInformation = "";
  var PersonalNum = 1;
  var jitianjiwan = Math.round((mainInfo.checkOut - mainInfo.checkIn)/86400000);
  for (var i = 0; i < mainInfo.roomInfoList.length; i++) {

    bedTypeString += mainInfo.roomInfoList[i].bedType+"、";

    for (var j = 0; j < mainInfo.roomInfoList[i].customerInfoList.length; j++) {
      if (mainInfo.roomInfoList[i].customerInfoList[j].isDive == "Y") {
        StringisDive = "浮潜+深潜套餐";
      }

      // part5 个人信息部分
      var Gender = '';
      if (mainInfo.roomInfoList[i].customerInfoList[j].gender == 1) {
        Gender = '男';
      }else {
        Gender = '女';
      }
      var _passportNo = "";
      if (mainInfo.roomInfoList[i].customerInfoList[j].passportNo != null) {
        _passportNo = mainInfo.roomInfoList[i].customerInfoList[j].passportNo;
      }
      PersonalInformation += "<div class='part5-content'><div class='content-title'>"
        +"<div>"+PersonalNum+"</div><span>旅客信息"+PersonalNum+"</span>"
        +"</div><div class='row'><div class='row-left'>"
        +"<div class='row-top'>护照号码<span>"+_passportNo+"</span></div>"
        +"<div class='row-bottom'>Passport No<span></span></div></div><div class='row-right'>"
        +"<div class='row-top'>姓名<span>"+mainInfo.roomInfoList[i].customerInfoList[j].chineseName+"</span></div>"
        +"<div class='row-bottom'>Name<span></span></div></div></div><div class='row'><div class='row-left'>"
        +"<div class='row-top'>拼音<span>"+mainInfo.roomInfoList[i].customerInfoList[j].pinyinName+"</span></div>"
        +"<div class='row-bottom'>Pinyin<span></span></div></div><div class='row-right'>"
        +"<div class='row-top'>性别<span></span></div>"
        +"<div class='row-bottom'>Gender<span>"+Gender+"</span></div></div></div><div class='row'><div class='row-left'>"
        +"<div class='row-top'>出生年月日<span>"+stampToFormat(mainInfo.roomInfoList[i].customerInfoList[j].birthday)+"</span></div>"
        +"<div class='row-bottom'>Birthday<span></span></div></div></div></div>";
      PersonalNum++;
    }
  }
  $("#part5-PerInfor").html(PersonalInformation);
  
  $("#part6").html([
    "<div style='padding-bottom: 20px;'>",
    "<div class='part6-left'>",
      "<div>亚庇接送</div>",
      "<div class='EH'>Kota Kinabalu Transfer</div>",
    "</div>",
    "<div class='part6-right'>",
      "<div>"+mainInfo.transfersInfo+"</div>",
    "</div>",
    "</div>",
    "<div class='part6-left'>",
      "<div>度假村接送</div>",
      "<div class='EH'>Resort Transfer Details</div>",
    "</div>",
    "<div class='part6-right'>",
      "<div>"+mainInfo.resortShuttle+"</div>",
      "<div class='EH'></div>",
      "<div class='EH'>（机场出口寻找右上角度假村LOGO的工作人员，确认名单即可。）</div>",
    "</div>"
  ].join(''));

  $("#part7").html("<img src='./img/map1.png'>");
  $(".part8-Email").html(loademail);

  // 如果没有订房码,则显示无
  if (!mainInfo.reservationCode) {
    mainInfo.reservationCode = '无';
  }
  // 马达京
  if (template == 1) {
    $(".part1").html(
      "<img class='mainlogo' src='./img/logo.png'>"
      +"<div><div class='title'>马达京彩珊瑚度假村确认函</div>"
      +"<div class='subtitle'>Mataking Reef Dives Resort’</div>"
      +"<div class='subtitle'>Confirmation letter</div></div>"
      +"<img class='minorlogo' src='./img/Mataking.jpeg'>"
    );
    $("#part3-fullamount").html(
      "<div class='row'><div class='row-left'>"
      +"<div class='row-top'>订房码<span>"+mainInfo.reservationCode+"</span></div>"
      +"<div class='row-bottom'>ReservationCode<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>房型&数量<span>"+mainInfo.orderName+" / "+mainInfo.roomNum+"间"+"</span></div>"
      +"<div class='row-bottom'>Reservation No<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>入住人数<span>"+mainInfo.adultNum+"成人/"+mainInfo.childNum+"儿童"+"</span></div>"
      +"<div class='row-bottom'>Occupancy<span>"+mainInfo.adultNum+" adult, "+mainInfo.childNum+" kids"+"</span></div></div><div class='row-right'>"
      +"<div class='row-top'>床型<span>"+bedTypeString.substring(0,(bedTypeString.length-1))+"</span></div>"
      +"<div class='row-bottom'>Bed Type<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>上岛日期<span>"+stampToFormat(mainInfo.checkIn)+"(最早14:00入住)"+"</span></div>"
      +"<div class='row-bottom'>Check-in<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>备注<span>"+mainInfo.flightNote+"</span></div>"
      +"<div class='row-bottom'>Remarks<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>离岛日期<span>"+stampToFormat(mainInfo.checkOut)+"(最晚11:00退房)"+"</span></div>"
      +"<div class='row-bottom'>Check-out<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>套餐&总价<span>"+(jitianjiwan+1)+"天"+jitianjiwan+"晚 "+StringisDive+"</span></div>"
      +"<div class='row-bottom'>Package&Total Price<span>"+mainInfo.orderAmount+"元</span></div></div></div>"
    );


    $("#part8-template1").css("display","block");

  // MWB马步水上屋度假村
  }else if (template == 2) {
    $(".part1").html(
      "<img class='mainlogo' src='./img/logo.png'>"
      +"<div><div class='earnest-title'>MWB马步水上屋度假村</div></div>"
      +"<img class='minorlogo' src='./img/MWB.png'>"
    );
    $("#part3-fullamount").html(
      "<div class='row'><div class='row-left'>"
      +"<div class='row-top'>上岛日期<span>"+stampToFormat(mainInfo.checkIn)+"(最早14:00入住)"+"</span></div>"
      +"<div class='row-bottom'>Check-in<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>入住人数<span>"+mainInfo.adultNum+"成人/"+mainInfo.childNum+"儿童"+"</span></div>"
      +"<div class='row-bottom'>Occupancy<span>"+mainInfo.adultNum+" adult, "+mainInfo.childNum+" kids"+"</span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>离岛日期<span>"+stampToFormat(mainInfo.checkOut)+"(最晚11:00退房)"+"</span></div>"
      +"<div class='row-bottom'>Check-out<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>房型&数量<span>"+mainInfo.orderName+" / "+mainInfo.roomNum+"间"+"</span></div>"
      +"<div class='row-bottom'>Reservation No<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>套餐<span>"+(jitianjiwan+1)+"天"+jitianjiwan+"晚 "+StringisDive+"</span></div>"
      +"<div class='row-bottom'>Package<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>床型<span>"+bedTypeString.substring(0,(bedTypeString.length-1))+"</span></div>"
      +"<div class='row-bottom'>Bed Type<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>备注<span>"+mainInfo.flightNote+"</span></div>"
      +"<div class='row-bottom'>Remarks<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>总价<span>"+mainInfo.orderAmount+"元</span></div>"
      +"<div class='row-bottom'>Package&Total Price<span></span></div></div></div>"
    );

    $("#part8-template2").css("display","block");

  // 卡帕莱度假村
  }else if (template == 3) {

    $(".part1").html(
      "<img class='mainlogo' src='./img/logo.png'>"
      +"<div><div class='title'>卡帕莱度假村</div>"
      +"<div class='subtitle'>Sipan Kapalai Dive Resort</div></div>"
      +"<img class='minorlogo' src='./img/Kapalai.png'>"
    );

    $("#part3-fullamount").html(
      "<div class='row'><div class='row-left'>"
      +"<div class='row-top'>订房码<span>"+mainInfo.reservationCode+"</span></div>"
      +"<div class='row-bottom'>ReservationCode<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>房型&数量<span>"+mainInfo.orderName+" / "+mainInfo.roomNum+"间"+"</span></div>"
      +"<div class='row-bottom'>Reservation No<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>入住人数<span>"+mainInfo.adultNum+"成人/"+mainInfo.childNum+"儿童"+"</span></div>"
      +"<div class='row-bottom'>Occupancy<span>"+mainInfo.adultNum+" adult, "+mainInfo.childNum+" kids"+"</span></div></div><div class='row-right'>"
      +"<div class='row-top'>套餐<span>"+(jitianjiwan+1)+"天"+jitianjiwan+"晚 "+StringisDive+"</span></div>"
      +"<div class='row-bottom'>Package<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>上岛日期<span>"+stampToFormat(mainInfo.checkIn)+"(最早14:00入住)"+"</span></div>"
      +"<div class='row-bottom'>Check-in<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>床型<span>"+bedTypeString.substring(0,(bedTypeString.length-1))+"</span></div>"
      +"<div class='row-bottom'>Bed Type<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>离岛日期<span>"+stampToFormat(mainInfo.checkOut)+"(最晚11:00退房)"+"</span></div>"
      +"<div class='row-bottom'>Check-out<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>总价<span>"+mainInfo.orderAmount+"元</span></div>"
      +"<div class='row-bottom'>Total Price<span></span></div></div></div>"
    );

    $("#part8-template3").css("display","block");

  // 诗巴丹平台潜水度假村
  }else if (template == 4) {

    $(".part1").html(
      "<img class='mainlogo' src='./img/logo.png'>"
      +"<div><div class='title'>诗巴丹平台潜水度假村</div>"
      +"<div class='subtitle'>Seaventures Dive Resort</div></div>"
      +"<img class='minorlogo' src='./img/Seaventures.jpeg'>"
    );

    $("#part3-fullamount").html(
      "<div class='row'><div class='row-left'>"
      +"<div class='row-top'>上岛日期<span>"+stampToFormat(mainInfo.checkIn)+"(最早14:00入住)"+"</span></div>"
      +"<div class='row-bottom'>Check-in<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>入住人数<span>"+mainInfo.adultNum+"成人/"+mainInfo.childNum+"儿童"+"</span></div>"
      +"<div class='row-bottom'>Occupancy<span>"+mainInfo.adultNum+" adult, "+mainInfo.childNum+" kids"+"</span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>离岛日期<span>"+stampToFormat(mainInfo.checkOut)+"(最晚11:00退房)"+"</span></div>"
      +"<div class='row-bottom'>Check-out<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>房型&数量<span>"+mainInfo.orderName+" / "+mainInfo.roomNum+"间"+"</span></div>"
      +"<div class='row-bottom'>Room Number<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>套餐<span>"+(jitianjiwan+1)+"天"+jitianjiwan+"晚 "+StringisDive+"</span></div>"
      +"<div class='row-bottom'>Package<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>床型<span>"+bedTypeString.substring(0,(bedTypeString.length-1))+"</span></div>"
      +"<div class='row-bottom'>Bed Type<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>备注<span>"+mainInfo.flightNote+"</span></div>"
      +"<div class='row-bottom'>Remark<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>总价<span>"+mainInfo.orderAmount+"元</span></div>"
      +"<div class='row-bottom'>Total Price<span></span></div></div></div>"
    );

    $("#part8-template4").css("display","block");

  // 邦邦岛龙珠度假村
  }else if (template == 5) {

    $(".part1").html(
      "<img class='mainlogo' src='./img/logo.png'>"
      +"<div><div class='title'>邦邦岛龙珠度假村</div>"
      +"<div class='subtitle'>PomPom Island Resort</div></div>"
      +"<img class='minorlogo' src='./img/PomPom.jpeg'>"
    );

    $("#part3-fullamount").html(
      "<div class='row'><div class='row-left'>"
      +"<div class='row-top'>上岛日期<span>"+stampToFormat(mainInfo.checkIn)+"(最早14:00入住)"+"</span></div>"
      +"<div class='row-bottom'>Check-in<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>入住人数<span>"+mainInfo.adultNum+"成人/"+mainInfo.childNum+"儿童"+"</span></div>"
      +"<div class='row-bottom'>Occupancy<span>"+mainInfo.adultNum+" adult, "+mainInfo.childNum+" kids"+"</span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>离岛日期<span>"+stampToFormat(mainInfo.checkOut)+"(最晚11:00退房)"+"</span></div>"
      +"<div class='row-bottom'>Check-out<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>房型&数量<span>"+mainInfo.orderName+" / "+mainInfo.roomNum+"间"+"</span></div>"
      +"<div class='row-bottom'>Room Number<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>套餐<span>"+(jitianjiwan+1)+"天"+jitianjiwan+"晚 "+StringisDive+"</span></div>"
      +"<div class='row-bottom'>Package<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>床型<span>"+bedTypeString.substring(0,(bedTypeString.length-1))+"</span></div>"
      +"<div class='row-bottom'>Bed Type<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>备注<span>"+mainInfo.flightNote+"</span></div>"
      +"<div class='row-bottom'>Remark<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>总价<span>"+mainInfo.orderAmount+"元</span></div>"
      +"<div class='row-bottom'>Total Price<span></span></div></div></div>"
    );

    $("#part8-template5").css("display","block");

  // Smart沙滩木屋度假村
  }else if (template == 6) {
    $(".part1").html(
      "<img class='mainlogo' src='./img/logo.png'>"
      +"<div><div class='earnest-title'>Smart沙滩木屋度假村</div></div>"
      +"<img class='minorlogo' src='./img/MWB.png'>"
    );

    $("#part3-fullamount").html(
      "<div class='row'><div class='row-left'>"
      +"<div class='row-top'>上岛日期<span>"+stampToFormat(mainInfo.checkIn)+"(最早14:00入住)"+"</span></div>"
      +"<div class='row-bottom'>Check-in<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>入住人数<span>"+mainInfo.adultNum+"成人/"+mainInfo.childNum+"儿童"+"</span></div>"
      +"<div class='row-bottom'>Occupancy<span>"+mainInfo.adultNum+" adult, "+mainInfo.childNum+" kids"+"</span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>离岛日期<span>"+stampToFormat(mainInfo.checkOut)+"(最晚11:00退房)"+"</span></div>"
      +"<div class='row-bottom'>Check-out<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>房型&数量<span>"+mainInfo.orderName+" / "+mainInfo.roomNum+"间"+"</span></div>"
      +"<div class='row-bottom'>Room Number<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>套餐<span>"+(jitianjiwan+1)+"天"+jitianjiwan+"晚 "+StringisDive+"</span></div>"
      +"<div class='row-bottom'>Package<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>床型<span>"+bedTypeString.substring(0,(bedTypeString.length-1))+"</span></div>"
      +"<div class='row-bottom'>Bed Type<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>备注<span>"+mainInfo.flightNote+"</span></div>"
      +"<div class='row-bottom'>Remark<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>总价<span>"+mainInfo.orderAmount+"元</span></div>"
      +"<div class='row-bottom'>Total Price<span></span></div></div></div>"
    );

    $("#part8-template6").css("display","block");

  // 邦邦岛白珍珠度假村
  }else if (template == 7) {
    $(".part1").html(
      "<img class='mainlogo' src='./img/logo.png'>"
      +"<div><div class='earnest-title'>邦邦岛白珍珠度假村</div></div>"
      +"<img class='minorlogo' src='./img/MWB.png'>"
    );

    $("#part3-fullamount").html(
      "<div class='row'><div class='row-left'>"
      +"<div class='row-top'>上岛日期<span>"+stampToFormat(mainInfo.checkIn)+"(最早14:00入住)"+"</span></div>"
      +"<div class='row-bottom'>Check-in<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>入住人数<span>"+mainInfo.adultNum+"成人/"+mainInfo.childNum+"儿童"+"</span></div>"
      +"<div class='row-bottom'>Occupancy<span>"+mainInfo.adultNum+" adult, "+mainInfo.childNum+" kids"+"</span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>离岛日期<span>"+stampToFormat(mainInfo.checkOut)+"(最晚11:00退房)"+"</span></div>"
      +"<div class='row-bottom'>Check-out<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>房型&数量<span>"+mainInfo.orderName+" / "+mainInfo.roomNum+"间"+"</span></div>"
      +"<div class='row-bottom'>Room Number<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>套餐<span>"+(jitianjiwan+1)+"天"+jitianjiwan+"晚 "+StringisDive+"</span></div>"
      +"<div class='row-bottom'>Package<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>床型<span>"+bedTypeString.substring(0,(bedTypeString.length-1))+"</span></div>"
      +"<div class='row-bottom'>Bed Type<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>备注<span>"+mainInfo.flightNote+"</span></div>"
      +"<div class='row-bottom'>Remark<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>总价<span>"+mainInfo.orderAmount+"元</span></div>"
      +"<div class='row-bottom'>Total Price<span></span></div></div></div>"
    );

    $("#part8-template7").css("display","block");

  // 马步岛婆罗度假村
  }else if (template == 8) {
    $(".part1").html(
      "<img class='mainlogo' src='./img/logo.png'>"
      +"<div><div class='title'>马步岛婆罗度假村</div>"
      +"<div class='subtitle'>Mabul Borneo Divers Resort</div></div>"
      +"<img class='minorlogo' src='./img/Borneo.png'>"
    );

    $("#part3-fullamount").html(
      "<div class='row'><div class='row-left'>"
      +"<div class='row-top'>订房码<span>"+mainInfo.reservationCode+"</span></div>"
      +"<div class='row-bottom'>ReservationCode<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>房型&数量<span>"+mainInfo.orderName+" / "+mainInfo.roomNum+"间"+"</span></div>"
      +"<div class='row-bottom'>Reservation No<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>入住人数<span>"+mainInfo.adultNum+"成人/"+mainInfo.childNum+"儿童"+"</span></div>"
      +"<div class='row-bottom'>Occupancy<span>"+mainInfo.adultNum+" adult, "+mainInfo.childNum+" kids"+"</span></div></div><div class='row-right'>"
      +"<div class='row-top'>床型<span>"+bedTypeString.substring(0,(bedTypeString.length-1))+"</span></div>"
      +"<div class='row-bottom'>Bed Type<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>上岛日期<span>"+stampToFormat(mainInfo.checkIn)+"(最早14:00入住)"+"</span></div>"
      +"<div class='row-bottom'>Check-in<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>备注<span>"+mainInfo.flightNote+"</span></div>"
      +"<div class='row-bottom'>Remarks<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>离岛日期<span>"+stampToFormat(mainInfo.checkOut)+"(最晚11:00退房)"+"</span></div>"
      +"<div class='row-bottom'>Check-out<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>套餐&总价<span>"+(jitianjiwan+1)+"天"+jitianjiwan+"晚 "+StringisDive+"</span></div>"
      +"<div class='row-bottom'>Package&Total Price<span>"+mainInfo.orderAmount+"元</span></div></div></div>"
    );

    $("#part8-template8").css("display","block");

  // 兰卡央度假村
  }else if (template == 9) {
    $(".part1").html(
      "<img class='mainlogo' src='./img/logo.png'>"
      +"<div><div class='title'>兰卡央度假村</div>"
      +"<div class='subtitle'>Lankayan Island Dive Resort</div></div>"
      +"<img class='minorlogo' src='./img/Kapalai.png'>"
    );

    $("#part3-fullamount").html(
      "<div class='row'><div class='row-left'>"
      +"<div class='row-top'>订房码<span>"+mainInfo.reservationCode+"</span></div>"
      +"<div class='row-bottom'>ReservationCode<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>房型&数量<span>"+mainInfo.orderName+" / "+mainInfo.roomNum+"间"+"</span></div>"
      +"<div class='row-bottom'>Reservation No<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>入住人数<span>"+mainInfo.adultNum+"成人/"+mainInfo.childNum+"儿童"+"</span></div>"
      +"<div class='row-bottom'>Occupancy<span>"+mainInfo.adultNum+" adult, "+mainInfo.childNum+" kids"+"</span></div></div><div class='row-right'>"
      +"<div class='row-top'>套餐<span>"+(jitianjiwan+1)+"天"+jitianjiwan+"晚 "+StringisDive+"</span></div>"
      +"<div class='row-bottom'>Package<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>上岛日期<span>"+stampToFormat(mainInfo.checkIn)+"(最早14:00入住)"+"</span></div>"
      +"<div class='row-bottom'>Check-in<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>床型<span>"+bedTypeString.substring(0,(bedTypeString.length-1))+"</span></div>"
      +"<div class='row-bottom'>Bed Type<span></span></div></div></div>"

      +"<div class='row'><div class='row-left'>"
      +"<div class='row-top'>离岛日期<span>"+stampToFormat(mainInfo.checkOut)+"(最晚11:00退房)"+"</span></div>"
      +"<div class='row-bottom'>Check-out<span></span></div></div><div class='row-right'>"
      +"<div class='row-top'>总价<span>"+mainInfo.orderAmount+"元</span></div>"
      +"<div class='row-bottom'>Total Price<span></span></div></div></div>"
    );

    $("#part8-template8").css("display","block");

  } else if (template == 11 || template == 12 || template == 13 || template == 14) {
    $(".part1").html([
      "<img class='mainlogo' src='./img/logo.png'>",
      "<div>",
        "<div class='title'>爱昵岛度假村确认函</div>",
        "<div class='subtitle'>EL NIDO Resorts’</div>",
        "<div class='subtitle'>Confirmation letter</div>",
      "</div>",
      "<img class='minorlogo' src='./img/ELNIDO.png'>"
    ].join(''));

  
    $("#part3-fullamount").html([
      "<div class='row'>",
        "<div class='row-left'>",
          "<div class='row-top'>订房码<span>"+mainInfo.reservationCode+"</span></div>",
          "<div class='row-bottom'>Reservation No<span></span></div>",
        "</div>",
        "<div class='row-right'>",
          "<div class='row-top'>房型&数量<span>"+mainInfo.orderName+" / "+mainInfo.roomNum+"间"+"</span></div>",
          "<div class='row-bottom'>Room Number<span></span></div>",
        "</div>",
      "</div>",
      
      "<div class='row'>",
        "<div class='row-left'>",
          "<div class='row-top'>入住人数<span>"+mainInfo.adultNum+"成人/"+mainInfo.childNum+"儿童"+"</span></div>",
          "<div class='row-bottom'>Occupancy<span>"+mainInfo.adultNum+" adult, "+mainInfo.childNum+" kids"+"</span></div>",
        "</div>",
      "</div>",
      
      "<div class='row'>",
        "<div class='row-left'>",
          "<div class='row-top'>上岛日期<span>"+stampToFormat(mainInfo.checkIn)+"</span></div>",
          "<div class='row-bottom'>Check-in<span></span></div>",
        "</div>",
        "<div class='row-right'>",
          "<div class='row-top'>离岛日期<span>"+stampToFormat(mainInfo.checkOut)+"</span></div>",
          "<div class='row-bottom'>Check-out<span></span></div>",
        "</div>",
      "</div>",
      
      "<div class='row'>",
        "<div class='row-right'>",
          "<div class='row-top'>套餐&总价<span>" + mainInfo.period + "&" + mainInfo.package + "</span></div>",
          "<div class='row-bottom'>Package & Total Price<span>" + mainInfo.orderAmount + "元</span></div>",
        "</div>",
      "</div>"
    ].join(''));

    $("#part6").html([
      "<div class='part6-left'>",
        "<div>度假村接送</div>",
        "<div class='EH'>Resort Transfer Details</div>",
      "</div>",
      "<div class='part6-right'>",
        "<div>"+mainInfo.resortShuttle+"</div>",
        "<div class='EH'></div>",
        "<div class='EH'>（机场出口寻找右上角度假村LOGO的工作人员，确认名单即可。）</div>",
      "</div>"
    ].join(''));

    $("#part8-template11").css("display","block");
    $("#part8-template11").html([
      '<div class="part8-content">',
        '<div class="part8-left">',
          '<div>行程联系信息</div>',
          '<div class="EH">Contact Information</div>',
        '</div>',
        '<div class="part8-rigth">',
          '<div>顾问24小时紧急电话：' + mainInfo.mobile + '<br/>顾问 Email：<span class="part8-Email">' + mainInfo.email + '</span></div>',
          '<div>爱昵岛度假村联系电话：+632 902 5948/49/34</div>',
          '<div>爱昵岛度假村Email：holiday@elnidoresorts.com</div>',
        '</div>',
      '</div>',
      '<div class="part8-content">',
        '<div class="part8-left">',
          '<div>取消政策</div>',
          '<div class="EH">Cancellation policy</div>',
        '</div>',
        '<div class="part8-rigth">',
          '<div class="thered">收到此函表明我公司已向度假村支付款项并订房成功，请尽快到淘宝确认收货；</div>',
          '<div>入住日前46天以上退订，扣除定金；</div>',
          '<div>入住日前45-35天退订，需要扣除全款的30%</div>',
          '<div>入住日前34-16天退订，需要扣除全款的50%</div>',
          '<div>入住日前15- 8 天退订，需要扣除全款的75%</div>',
          '<div>入住日前7-入住日退订，需要扣除全款的100%</div>',
        '</div>',
      '</div>'
    ].join(''));
  }
  

}


