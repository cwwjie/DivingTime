$(document).ready(function() {
    if (/^[0-9]*[1-9][0-9]*$/.test(window.location.hash.substr(1))) {
        productID = parseInt(window.location.hash.substr(1));
        sessionStorage.setItem('selectProductID', parseInt(window.location.hash.substr(1)));
    } else {
        productID = parseInt(sessionStorage.getItem('selectProductID'))
    }
    // BotSlide();
    // 滚动监听
    FloatTOP();
    // boostrap 日期选择
    Selectdays();
    // 渲染页面
    renderPage();
    // 提交请求
    submitRequest();
    // 登陆
    login();
});
// 产品 ID
var productID;
// 鼠标滚动监听
function FloatTOP() {
    var topLong = $("#carousel-example-generic"),
        Distance = 0,
        Alabel = $("#NC-L a"),
        part1 = $("#MContentTitle1")[0].offsetTop,
        part2 = $("#MContentTitle2")[0].offsetTop,
        part3 = $("#MContentTitle3")[0].offsetTop,
        part4 = $("#MContentTitle4")[0].offsetTop,
        part5 = $("#MContentTitle5")[0].offsetTop;
    for (var i = 0; i < Alabel.length; i++) {
        Alabel[i].onclick = function(ev) {
            var ev = ev || window.event,
                id = this.hash,
                thisId = document.querySelector(id);
            document.documentElement.scrollTop = document.body.scrollTop = thisId.offsetTop - 50;
            $(".NC-L a").css("border-bottom", "none")
            ev.preventDefault();
        }
    }
    $(window).scroll(function() {
        Distance = $(window).scrollTop();
        CarSelH = topLong[0].clientHeight;
        if (Distance > CarSelH) {
            if ($("nav").attr("data-display") == "show") {
                $("nav").css("display", "block")
                anchor();
                $("#Order").addClass('NewOrder');
            } else if ($("nav").attr("data-display") == "hide") {
                $("nav").css("display", "none");
            }
        } else {
            $("nav").css("display", "none")
            $("#Order").removeClass("NewOrder");
        }
    });

    function anchor() {
        if (Distance > part1 + topLong[0].clientHeight - 50 && Distance < part2 + topLong[0].clientHeight - 50) {
            $(".NC-L a").css("border-bottom", "none")
            $("#NC1").css("border-bottom", "4px solid #00a0ea");
        } else if (Distance > part2 + topLong[0].clientHeight - 50 && Distance < part3 + topLong[0].clientHeight - 50) {
            $(".NC-L a").css("border-bottom", "none")
            $("#NC2").css("border-bottom", "4px solid #00a0ea");
        } else if (Distance > part3 + topLong[0].clientHeight - 50 && Distance < part4 + topLong[0].clientHeight - 50) {
            $(".NC-L a").css("border-bottom", "none")
            $("#NC3").css("border-bottom", "4px solid #00a0ea");
        } else if (Distance > part4 + topLong[0].clientHeight - 50 && Distance < part5 + topLong[0].clientHeight - 50) {
            $(".NC-L a").css("border-bottom", "none")
            $("#NC4").css("border-bottom", "4px solid #00a0ea");
        } else if (Distance > part5 + topLong[0].clientHeight - 50) {
            $(".NC-L a").css("border-bottom", "none")
            $("#NC5").css("border-bottom", "4px solid #00a0ea");
        }
    }
}
// Boottrap 日期选择
function Selectdays() {
    $("#OrderDate").click(function(event) {
        $("#datetimepicker").css("display", "block");
        event.preventDefault();
    });
    var mydate = new Date();
    var str = "" + mydate.getFullYear() + "-" + (mydate.getMonth() + 1) + "-" + mydate.getDate();
    str = str.replace(/\b(\w)\b/g, '0$1');
    $('#datetimepicker').datetimepicker({
        format: "yyyy MM dd", //格式
        autoclose: true, //自动关闭
        todayBtn: true, //今天
        startDate: str,
        minuteStep: 10, //用于选择分钟
        language: 'zh-CN',
        weekStart: 1, //周一从那天开始
        todayHighlight: true, //高亮今天
        startView: 2, //日期时间选择器打开之后首先显示的视图
        minView: 2, //日期时间选择器打开之后最小的视图
    }).on('changeDate', function(ev) {
        var SelectDate = new Date(ev.date)
        var string = "" + SelectDate.getFullYear() + "-" + (SelectDate.getMonth() + 1) + "-" + SelectDate.getDate();
        string = string.replace(/\b(\w)\b/g, '0$1');
        $("#datetimepicker").css("display", "none");
        $("#OrderDate").text(string);
        $("#OrderDate").attr("data-title", ev.date);
        $("#packagNumber").css("display", "block");
        $("#totalPrice").css("display", "block");
        $("#OrderConfirm").text("预订套餐");
        event.preventDefault();
    });
}
// 渲染(页面)
function renderPage() {
    // 请求(轮播图)
    $.ajax({
        type: "GET",
         
        url: URLbase + URLversion + "/product/relProductGallery/" + productID + "/findByProductId.do",
         
        contentType: "application/json; charset=utf-8",
         
        success: function(message) {
            renderCarousel(message.data);
        }
    });
    // 渲染(轮播图)
    function renderCarousel(data) {
        var inner = "",
            indicators = "";
        for (var i = 0; i < data.length; i++) {
            if (i == 0) {
                inner += "<div class='item active'><img src=" + URLbase + data[i].gallery.imgUrl + "><div class='carousel-caption'></div></div>"
                indicators += "<li data-target='#carousel-example-generic' data-slide-to=" + i + " class='active'></li>"
            } else {
                inner += "<div class='item'><img src=" + URLbase + data[i].gallery.imgUrl + "><div class='carousel-caption'></div></div>"
                indicators += "<li data-target='#carousel-example-generic' data-slide-to=" + i + "></li>"
            }
        }
        $("#carousel").html(inner);
        $(".carousel-indicators").html(indicators);
        imgRespond();
    }
    // 请求(标题&产品详情)
    $.ajax({
        type: "GET",
         
        url: URLbase + URLversion + "/product/" + productID + "/get.do",
         
        contentType: "application/json; charset=utf-8",
         
        success: function(message) {
            if (message.data == null) {
                $("#SVG").css("display", "block");
            }
            Rule(message.data.refundRuleId);
            renderBasic(message.data);
        }
    });
    // 渲染(标题&产品详情)
    function renderBasic(data) {
        // "限时促销" > "新品" > "度假套餐"
        function judgtype() {

            var StartTime = data.promoteStartTime;
            var EndTime = data.promoteEndTime;
            var timestamp = Date.parse(new Date());
            if (data.promotePrice == null || data.promotePrice == 0) {} else {
                if (timestamp >= StartTime && timestamp <= EndTime) {
                    return "<span style='background: rgba(234,84,91,.87)'>限时促销</span>"
                }
            }
            if (data.isNew == "Y") {
                return "<span style='background: rgba(25,163,220,.87)'>新品</span>"
            } else {
                return "<span style='background: rgba(1,185,105,.87)'>度假套餐</span>"
            }
        }
        /*
         * 套餐价格
         */
        function pricePackage() {
            var StartTime = data.promoteStartTime;
            var EndTime = data.promoteEndTime;
            var timestamp = Date.parse(new Date());
            if (data.promotePrice == null || data.promotePrice == 0) {} else {
                if (timestamp >= StartTime && timestamp <= EndTime) {
                    // 表示促销
                    var _string = "<span style='text-decoration:line-through'>" + data.productPrice + "</span> " + data.promotePrice;
                    return _string
                }
            }
            // 表示不促销
            return data.productPrice
        }
        $("#product_Name").text(data.productName);
        $("#productPrice").html(pricePackage());

        var StartTime = data.promoteStartTime;
        var EndTime = data.promoteEndTime;
        var timestamp = Date.parse(new Date());
        if (data.promotePrice == null || data.promotePrice == 0) {
            // 表示不促销
            $("#promoteTime").html("暂无");
            // 计算价格
            $("#packagNumber .center").attr("data-price", data.productPrice);
            // 计算价格(废弃)
            $("#totalPrice .tright span").text(data.productPrice);
            // 响应式 价格
            $("aside .Aside-B span").text(data.productPrice);
        } else {
            if (timestamp >= StartTime && timestamp <= EndTime) {
                // 表示促销
                $("#promoteTime").html("<span>" + getdate(data.promoteStartTime) + "</span> 至 <span>" + getdate(data.promoteEndTime) + "</span>");
                // 计算价格
                $("#packagNumber .center").attr("data-price", data.promotePrice);
                // 计算价格(废弃)
                $("#totalPrice .tright span").text(data.promotePrice);
                // 响应式 价格
                $("aside .Aside-B span").text(data.promotePrice);
            } else {
                // 表示不促销
                $("#promoteTime").html("暂无");
                // 计算价格
                $("#packagNumber .center").attr("data-price", data.productPrice);
                // 计算价格(废弃)
                $("#totalPrice .tright span").text(data.productPrice);
                // 响应式 价格
                $("aside .Aside-B span").text(data.productPrice);
            }
        }
        // 标签
        $("#productName").html(data.productName + judgtype());
        // 简单描述
        $("#productDesc").html(data.productDesc);
        // 无所谓
        $("#totalPrice i").attr("title", data.promotePrice == null ? ("原价" + data.productPrice) : ("促销价" + data.promotePrice));
    }
    // 请求(套餐说明，交通信息)
    $.ajax({
        type: "GET",
         
        url: URLbase + URLversion + "/product/attribute/findByProductId.do?productId=" + productID,
         
        contentType: "application/json; charset=utf-8",
         
        success: function(message) {
            renderIncludes(message.data)
        }
    });
    // 渲染(套餐说明，交通信息)
    function renderIncludes(data) {
        var string = "";
        for (var i = 0; i < data.length; i++) {
            if (i == (data.length - 1)) {
                string += "<div class='MContentContent'><div class='MCCL'>" + data[i].attrName + "</div><div class='MCCR'>" + data[i].attrValue + "</div></div>";
            } else {
                string += "<div class='MContentContent MCLine'><div class='MCCL'>" + data[i].attrName + "</div><div class='MCCR'>" + data[i].attrValue + "</div></div>";
            }
        }
        string += "</div><div class='ContactUS-R'></div>";
        $("#renderIncludes").html(string);
    }
    // 请求(套餐行程)
    $.ajax({
        type: "GET",
         
        url: URLbase + URLversion + "/product/trip/findByProductId.do?productId=" + productID,
         
        contentType: "application/json; charset=utf-8",
         
        success: function(message) {
            $.ajax({
                type: "GET",
                 
                url: URLbase + URLversion + "/product/" + productID + "/get.do",
                 
                contentType: "application/json; charset=utf-8",
                 
                success: function(message2) {
                    renderTrip(message.data, message2.data.productName);
                }
            });
        }
    });
    // 渲染(套餐行程)
    function renderTrip(data, title) {
        function splitArray(data) {
            var dataArray = data.split(","),
                string = "";
            for (var i = 0; i < dataArray.length; i++) {
                string += "<p>" + dataArray[i] + "</p>";
            }
            return string
        }

        function renderNavigator() {
            var _string = "<div class='_nav'>";
            for (var j = 0; j < data.length; j++) {
                _string += "<div><a href='#_day" + (j + 1) + "'>第" + (j + 1) + "天</a></div>";
            }
            _string += "</div>";
            return _string;
        }
        var Content = "<div class='MContentform-row FormTitle'><div class='MContentform-row1'>日期</div><div class='MContentform-row2'>项目&amp;活动</div><div class='MContentform-row3'>入宿&amp;景点</div></div>",
            Modal = "<div class='modal-dialog'><div class='modal-content'>" //
            + renderNavigator() + "<div class='_content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'>" //
            + title + "</h4></div><div class='modal-body'><div class='journey'>";
        for (var i = 0; i < data.length; i++) {
            Content += "<div class='MContentform-row FormLists' data-toggle='modal' data-target='#myModal'><div class='MContentform-row1'>第" //
                + data[i].tripDay + "天</div><div class='MContentform-row2'>" //
                + splitArray(data[i].tripEvent) + "</div><div class='MContentform-row3'>" //
                + splitArray(data[i].tripPlace) + "</div></div>";
            Modal += "<div class='journey-title' id='_day" + (i + 1) + "'>第" //
                + data[i].tripDay + "天 " //
                + data[i].tripBrief + "</div><div class='journey-content'>" //
                + data[i].tripDesc + "</div>";
        }
        Modal += "</div></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button></div></div></div></div>";
        $("#renderTrip .MContentform").html(Content);
        $("#myModal").html(Modal);
    }
    // 请求(套餐包含)
    $.ajax({
        type: "GET",
         
        url: URLbase + URLversion + "/product/costIncludes/findByProductId.do?productId=" + productID,
         
        contentType: "application/json; charset=utf-8",
         
        success: function(message) {
            renderDescription(message.data);
        }
    });
    // 渲染(套餐包含)
    function renderDescription(data) {
        var string = "<div class='MContentRow'><div class='MContentTitle'>套餐包含</div></div>";
        for (var i = 0; i < data.length; i++) {
            if (i == (data.length - 1)) {
                string += "<div class='MContentContent'><div class='MCCL'>" + data[i].costTitle + "</div><div class='MCCR'>" + data[i].costContent + "</div></div>";
            } else {
                string += "<div class='MContentContent MCLine'><div class='MCCL'>" + data[i].costTitle + "</div><div class='MCCR'>" + data[i].costContent + "</div></div>";
            }
        }
        string += "</div><div class='ContactUS-R'></div>";
        $("#renderDescription").html(string);
    }
    /**
     * 渲染(退款说明)(新) 按照等比渲染
     * @param {refundRuleId} 退订规则id
     */
    function Rule(refundRuleId) {
        if (refundRuleId == null) {
            return
        }

        function renderRule(data) {
            $("#refundDesc").text("" /*data.refundDesc*/ );
            $("#refundName").text("" /*data.refundName*/ );
            var ruleItemList = data.ruleItemList,
                string = "",
                string2 = "";

            function judgDay(data) {
                if (data.endDay < 0) {
                    return data.beginDay + "天以上"
                } else {
                    return data.endDay + "天"
                }
            }

            function percentage(data) {
                var string = data.substring(0, data.length - 1);
                if (string == "100") {
                    return "1"
                } else {
                    string = "0." + string;
                    return string
                }
            }
            for (var i = 0; i < ruleItemList.length; i++) {
                var j = 1 - i * (1 / ruleItemList.length);

                string += "<div style='width:" + j * 100 + "%;background:rgba(69, 90, 100," //
                    + (i + 1) * (1 / ruleItemList.length) + ");'><span style='color:#4d5d77'>" //
                    + judgDay(ruleItemList[i]) + "</span><a style='color:#fff;position:absolute;z-index:2;top:2px;left:4px;'>扣" //
                    + ruleItemList[i].deductionRatio + "</a></div>";

                string2 += "<p>" + ruleItemList[i].ruleDesc + "</p>";
            }
            $("#ruleItemList").html(string);
            $("#ruleDesc").html(string2);
        }
        $.ajax({
            type: "GET",
             
            url: URLbase + URLversion + "/product/refundrule/" + refundRuleId + "/item/list.do",
             
            contentType: "application/json; charset=utf-8",
             
            success: function(message) {
                if (message.data == null) {
                    $("#NC5").css("display", "none");
                    $("#MContentTitle5").css("display", "none");
                } else {
                    renderRule(message.data);
                }
            }
        });
    }
}
// 提交(订单)
function submitRequest() {
    // 计算价格(data:"+"or"-") => 合计 && 套餐数量
    function changePrice(data) {
        var theNumber = parseFloat($("#packagNumber .center span").text());
        if (data == "-" && theNumber > 1) {
            $("#packagNumber .center span").text(theNumber - 1);
            $("#totalPrice .tright span").text(((theNumber - 1) * (parseFloat($("#packagNumber .center").attr("data-price")) * 100)) / 100);
        } else if (data == "+") {
            $("#packagNumber .center span").text(theNumber + 1);
            $("#totalPrice .tright span").text(((theNumber + 1) * (parseFloat($("#packagNumber .center").attr("data-price")) * 100)) / 100);
        }
    }
    // 预定套餐
    function orderConfirm() {
        if ($("#OrderDate").text() == "出发日期") {
            $("#OrderConfirm").text("请选择出发日期");
            return
        }
        if ($("#OrderConfirm").attr("data-cilck") == "doing") {
            return
        }
        $("#OrderConfirm").attr("data-cilck", "doing");
        $("#OrderConfirm").text("正在预定");
        $.ajax({
            type: "GET",
             
            url: appConfig.getUserInfo,
             
            contentType: "application/json; charset=utf-8",
             
            headers: {
                'token': $.cookie('token'),
                'digest': $.cookie('digest')
            },
            success: function(message) {
                $("#OrderConfirm").attr("data-cilck", "OK");
                if (message.result == "0") {
                    window.location.href = "./reserve/index.html?productId=" + productID + "&departureDate=" + $("#OrderDate").attr("data-title") + "&productNum=" + parseInt($("#packagNumber .center span").text());
                } else if (message.result == "401") {
                    $("#OrderConfirm").text("预定套餐");
                    log_fun.Show()
                } else {
                    $("#OrderConfirm").text("预定失败，" + message.message);

                }
            }
        });
    }

    function bindEvents() {
        $("#packagNumber .sL").click(function() {
            changePrice("-")
        });
        $("#packagNumber .sR").click(function() {
            changePrice("+")
        });
        $("#OrderConfirm").click(function() {
            orderConfirm();
        });
        $("#sideConfirm").click(function() {
            // 隐藏 <nav>
            if ($("nav").attr("data-display") == "show") {
                $("nav").css("display", "none");
                $("nav").attr("data-display", "hide")
            } else if ($("nav").attr("data-display") == "hide") {
                $("nav").css("display", "block");
                $("nav").attr("data-display", "show")
            }
            if ($("#sideConfirm").attr("title") == "Confirm") {
                $("#sideConfirm").text('预定套餐')
                $(".MContent-R").css('display', 'none');
                $("#sideConfirm").attr("title", "order")
            } else if ($("#sideConfirm").attr("title") == "order") {
                $(".MContent-R").css('display', 'block');
                $("#sideConfirm").attr("title", "Confirm")
                $("#sideConfirm").text('隐藏')
            }
        })
    }
    bindEvents();
}
/*
 * 轮播图响应式
 */
function imgRespond() {
    // 高是 720  px
    // 宽是 1680 px
    // 720px/1680px = 高/宽 = 求/clientWidth
    var nowHeight = document.body.clientWidth * 720 / 1680;
    $(".carousel-inner .item").css('height', nowHeight);
}
// 方法 - 时间差  timestamp -> 时间戳
function UTC2LocalTime(timestamp) {
    //将 服务器UTC时间戳 转为Date
    var d = new Date(timestamp);
    //服务器UTC时间 与 GMT时间的时间 偏移差
    var offset = d.getTimezoneOffset() * 60000;
    return new Date(timestamp - offset);
}
// 方法 - 获取时间返回201x-xx-xx
function getdate(date) {
    var newdate = new Date(UTC2LocalTime(date)),
        thisString = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
    return thisString
}
