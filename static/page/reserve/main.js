$(document).ready(function() {
    main();
});

function main() {
    init();
    UserInfor.init();
    subOrder.init();
}

function init() {
    initPage.ordeDetail();
    $.ms_DatePicker({
        YearSelector: ("#sel_year"),
        MonthSelector: ("#sel_month"),
        DaySelector: ("#sel_day"),
        FirstText: "--",
        FirstValue: 0
    });
}
/*
 * 确认订单
 */
var subOrder = function() {
    //提交的数据
    var data = {
            userInfoList: [],
            address: {}
        },
        submitting = false;
    // 初始化
    function init() {
        $("#ConfirmOrder").click(function() {
            // submitting = true 表示正在提交 ，不让他通关
            if (submitting == true) {
                return
            }
            // submitting = false 表示没有提交，继续执行
            submitting = true;
            $("#ConfirmOrder").text("正在提交");
            data.userInfoList = [];
            var _data = initPage.userInfoData,
                _select = UserInfor.data_select,
                tem_Obj = {};
            for (var i = 0; i < _data.length; i++) {
                if (_select[i] == true) {
                    tem_Obj = {};
                    tem_Obj.relId = null;
                    tem_Obj.orderId = null;
                    tem_Obj.chineseName = _data[i].chineseName;
                    tem_Obj.pinyinName = _data[i].pinyinName;
                    tem_Obj.gender = _data[i].gender;
                    tem_Obj.passportNo = _data[i].passportNo;
                    tem_Obj.email = _data[i].email;
                    tem_Obj.divingCount = _data[i].divingCount;
                    tem_Obj.divingRank = _data[i].divingRank;
                    tem_Obj.birthday = _data[i].birthday;
                    tem_Obj.age = _data[i].age;
                    tem_Obj.mobile = _data[i].mobile;
                    data.userInfoList.push(tem_Obj);
                }
            }
            submit();
        });
    }
    // 提交
    function submit() {
        var json = data;
        if (json.userInfoList.length < 1) {
            // 如果提交少于一人信息，函数终止 submitting = false;
            alert("至少提供一人信息");
            $("#ConfirmOrder").text("提交订单");
            submitting = false;
            return
        }
        /*
         * 获取URL 离开日期的方法
         */
        function departure_Date() {
            var date = new Date(loadPageVar("departureDate")),
                string = "";
            string += date.getFullYear();
            ((date.getMonth() + 1) < 10) ? (string += "0" + (date.getMonth() + 1)) : (string += (date.getMonth() + 1));
            (date.getDate() < 10) ? (string += "0" + date.getDate()) : (string += date.getDate());
            return string
        }
        $.ajax({
            type: "POST",
             
            url: URLbase + URLversion + "/order/" //
                + loadPageVar("productId") + "/" //
                + loadPageVar("productNum") + "/" //
                + departure_Date() + "/reserve.do",
             
            contentType: "application/json; charset=utf-8",
             
            data: JSON.stringify(json),
             
            dataType: "json",
             
            headers: {
                'token': $.cookie('token'),
                'digest': $.cookie('digest')
            },
            success: function(message) {
                submitting = false;
                if (message.result == "0") {
                    $("#ConfirmOrder").text('提交成功');
                    var Time = document.getElementById("_time");
                    Time.innerText = 30;
                    for (var i = 0; i < 30; i++) {
                        (function(x) {
                            setTimeout(function() {
                                Time.innerHTML = 30 - x;
                                if (x === 29) {
                                    window.location.href = "./../../user/account.html#Orders";
                                }
                            }, x * 1000)
                        })(i)
                    }
                    $('#reserve_Modal').modal({
                        backdrop: 'static',
                        show: true
                    });
                } else {
                    $("#ConfirmOrder").text("提交订单");
                }
            }
        });
    }
    // 接口
    var obj = {
        init: init
    }
    return obj;
}();
/*
 * 旅客信息
 */
var UserInfor = function() {
    // 初始化数据(旅客信息)
    var data = [],
        data_select = [],
        edit_select;

    function initInfor() {
        getdata();
        // 弹出模态框(旅客信息)
        $('#add_Passenger_1').click(function(event) {
            popModal1();
        });
        // 添加(旅客信息)
        $('#add_Infor').click(function(event) {
            addModal2();
        });
        // 提交(旅客信息)
        $('#sub_Infor').click(function(event) {
            subModal2();
        });
        // 验证 (模态框2)
        $('.line input').change(function() {
            judge();
        });
        $("#ChineseName").blur(function(event) {
            $("#EnglishName").val(ConvertPinyin($(this).val()));
            $("#EnglishName").trigger("blur");
            judge();
        });
        $("#time select").change(function(event) {
            if ($("select[class=sel_year]").val() != "0" && $("select[class=sel_month]").val() != "0" && $("select[class=sel_day]").val() != "0") {
                var nawDate = Date.parse(new Date());
                var selectDate = Date.parse(new Date(changeTime()));
                var outputDate = Math.ceil((nawDate - selectDate) / 31536000000);
                $("#Age").val(outputDate);
            }
            judge();
        });


        // 弹出 模态框(编辑添加旅客信息)
        $('#pop_Infor').click(function(event) {
            $("#add_Infor").css('display', 'block');
            $("#sub_Infor").css('display', 'none');
            clearModal2();
            popModal2();
        });
        // 输出渲染 (页面)
        $("#addPage").click(function(event) {
            addPage();
        });
    }
    // 弹出 模态框(旅客信息)
    function popModal1() {
        $('#InforModal').modal({ backdrop: "static", show: true });
        renderModal1();
    }
    // 弹出 模态框(编辑添加旅客信息)
    function popModal2() {
        $('#InforPopModal').modal({ backdrop: "static", show: true });
    }
    // 获取 (旅客信息)
    function getdata() {
        $.ajax({
            type: "GET",
             
            url: appConfig.userinfoFindByUserId,
             
            contentType: "application/json; charset=utf-8",
             
            headers: {
                'token': $.cookie('token'),
                'digest': $.cookie('digest')
            },
            success: function(message) {
                if (message.result == "0") {
                    data = message.data;
                    renderModal1();
                }
            }
        });
    }
    // 选择 (旅客信息)
    function selectList(num) {
        if (data_select[num] == true) {
            data_select[num] = false;
            $($(".list")[num]).children("#selecte_ico").removeClass('list_select');
            return
        }
        data_select[num] = true;
        $($(".list")[num]).children("#selecte_ico").addClass('list_select')
    }
    // 渲染 模态框(旅客信息)
    function renderModal1() {
        var _string = "";
        if (data.length == 0) {
            _string = "暂无旅客信息";
            $("#list_Render").html(_string);
            return
        }
        _string += "<div class='line_Render'></div>";
        for (var i = 0; i < data.length; i++) {
            if (data_select[i] == true) {
                _string += "<div class='list'><div class='list_unselected list_select' id='selecte_ico'><i></i></div>";
            } else {
                _string += "<div class='list'><div class='list_unselected' id='selecte_ico'><i></i></div>";
            }
            _string += "<div class='list_content'><div class='box_content' onclick='UserInfor.select(" + i + ")'>";
            _string += "</div><div class='cont_name'><span>" + data[i].chineseName + "</span>" + data[i].mobile + "</div>";
            _string += "<div class='cont_addr'>" + data[i].age + "岁 - " + returnGender(data[i].gender) + " - " + ((data[i].divingCount == null) ? 0 : data[i].divingCount) + "潜次</div></div>";
            _string += "<div class='list_edit' onclick='UserInfor.render2(" + i + ");'><i></i></div></div>";
        }
        $("#list_Render").html(_string);
    }
    // 渲染 模态框(编辑添加旅客信息)
    function renderModal2(num) {
        edit_select = data[num].userinfoId;
        clearModal2();

        var _data = data[num];
        $('.line input[name=ChineseName]').val(_data.chineseName);
        $('.line input[name=EnglishName]').val(_data.pinyinName);
        judgeGender(returnGender(_data.gender));
        var datetime = new Date(UTC2LocalTime(parseInt(_data.birthday)));
        $(".sel_year").val(datetime.getFullYear());
        $(".sel_month").val(datetime.getMonth() + 1);
        $(".sel_day").val(datetime.getDate());
        $('.line input[name=Age]').val(_data.age);
        $('.line input[name=PhoneNumber]').val(_data.mobile);
        $('.line input[name=Mailbox]').val(_data.email);
        $('.line input[name=Passport]').val(cNull(_data.passportNo));
        $('.line select[name=Divelevel]').val(cNull(_data.divingRank));
        $('.line input[name=DiveTimes]').val(cNull(_data.divingCount));

        $("#sub_Infor").css('display', 'block');
        $("#add_Infor").css('display', 'none');
        popModal2();
    }
    // 清除 模态框(编辑添加旅客信息)
    function clearModal2() {
        $('.line input[name=ChineseName]').val('')
        $('.line input[name=EnglishName]').val('')
        judgeGender('男士')
        var datetime = new Date();
        $(".sel_year").val(datetime.getFullYear())
        $(".sel_month").val(datetime.getMonth() + 1)
        $(".sel_day").val(datetime.getDate())
        $('.line input[name=Age]').val('')
        $('.line input[name=PhoneNumber]').val('')
        $('.line input[name=Mailbox]').val('')
        $('.line input[name=Passport]').val('')
        $('.line input[name=Divelevel]').val('')
        $('.line input[name=DiveTimes]').val('')
        $('.line input[name=ChineseName]').next().text('');
        $('.line input[name=EnglishName]').next().text('');
        $('.line input[name=Age]').next().text('');
        $('.line input[name=PhoneNumber]').next().text('');
        $('.line input[name=Mailbox]').next().text('');
    }
    // 验证 (输入内容) => true or false
    function judge() {
        var _chack = true;
        if ($('.line input[name=ChineseName]').val() == "") {
            $('.line input[name=ChineseName]').next().text('请输入姓名(中文)');
            _chack = false
        } else if (!(/^[\u2E80-\u9FFF]+$/.test($('.line input[name=ChineseName]').val()))) {
            $('.line input[name=ChineseName]').next().text('只限输入中文');
            _chack = false
        } else {
            $('.line input[name=ChineseName]').next().text('');
        }
        if ($('.line input[name=EnglishName]').val() == "") {
            $('.line input[name=EnglishName]').next().text('请输入姓名(拼音)');
            _chack = false
        } else if (!(/^[a-zA-Z]{0,10000}$/.test($('.line input[name=EnglishName]').val()))) {
            $('.line input[name=EnglishName]').next().text('请输入正确的姓名(不能带空格)');
            _chack = false
        } else {
            $('.line input[name=EnglishName]').next().text('');
        }
        if ($("select[class=sel_year]").val() == "0" || $("select[class=sel_month]").val() == "0" || $("select[class=sel_day]").val() == "0") {
            $("#sel_time").text('请选择年龄')
            _chack = false;
        } else {
            $("#sel_time").text('')
        }
        if ($('.line input[name=Age]').val() == "") {
            $('.line input[name=Age]').next().text('请输入年龄');
            _chack = false
        } else if (parseInt($('.line input[name=Age]').val()) >= 0 && parseInt($('.line input[name=Age]').val()) < 120) {
            $('.line input[name=Age]').next().text('');
        } else {
            $('.line input[name=Age]').next().text('年龄输入不正确');
            _chack = false
        }
        if ($('.line input[name=PhoneNumber]').val() == "") {
            $('.line input[name=PhoneNumber]').next().text('请输入手机号码')
            _chack = false
        } else if (!(/^1[34578]\d{9}$/.test($('.line input[name=PhoneNumber]').val()))) {
            $('.line input[name=PhoneNumber]').next().text('请输入正确的手机号码');
            _chack = false
        } else {
            $('.line input[name=PhoneNumber]').next().text('');
        }
        if ($('.line input[name=Mailbox]').val() == "") {
            $('.line input[name=Mailbox]').next().text('请输入邮箱');
            _chack = false
        } else if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($('.line input[name=Mailbox]').val()))) {
            $('.line input[name=Mailbox]').next().text('请输入正确的邮箱');
            _chack = false
        } else {
            $('.line input[name=Mailbox]').next().text('');
        }
        if (!(/^[0-9]*$/.test($('.line input[name=DiveTimes]').val()))) {
            $('.line input[name=DiveTimes]').next().text('请输入纯数字');
            _chack = false
        } else {
            $('.line input[name=DiveTimes]').next().text('');
        }
        if ($('.line input[name=DiveTimes]').val() == "") {} else {
            if (!(/^[0-9]*$/.test($('.line input[name=DiveTimes]').val()))) {
                $('.line input[name=DiveTimes]').next().text('请输入纯数字');
                _chack = false
            } else {
                $('.line input[name=DiveTimes]').next().text('');
            }
        }
        return _chack
    }
    // 添加 (旅客信息)
    function addModal2() {
        if (judge() == false) {
            return
        }
        $("#add_Infor").text("正在提交");
        var json = {
            "chineseName": $('.line input[name=ChineseName]').val(),
            "pinyinName": $('.line input[name=EnglishName]').val(),
            "gender": gender(),
            "birthday": changeTime(),
            "age": $('.line input[name=Age]').val(),
            "mobile": $('.line input[name=PhoneNumber]').val(),
            "email": $('.line input[name=Mailbox]').val(),
            "passportNo": ($('.line input[name=Passport]').val() == "") ? null : $('.line input[name=Passport]').val(),
            "divingRank": ($('.line input[name=Divelevel]').val() == "") ? null : $('.line input[name=Divelevel]').val(),
            "divingCount": ($('.line input[name=DiveTimes]').val() == "") ? null : $('.line input[name=DiveTimes]').val()
        }
        $.ajax({
            type: "POST",
             
            url: appConfig.userinfoAdd,
             
            contentType: "application/json; charset=utf-8",
             
            data: JSON.stringify(json),
             
            dataType: "json",
             
            headers: {
                'token': $.cookie('token'),
                'digest': $.cookie('digest')
            },
            success: function(message) {
                if (message.result == "0") {
                    $("#add_Infor").text("保存并使用");
                    $("#list_Render").html("正在加载...");
                    getdata();
                    $('#InforPopModal').modal('hide');
                } else {
                    alert("未知错误，可能是输入参数有误，请重试")
                    $("#add_Infor").text("保存并使用");
                }
            }
        });
    }
    // 提交 (编辑添加旅客信息)
    function subModal2() {
        if (judge() == false) {
            return
        }
        $("#sub_Infor").text("正在提交");
        var json = {
            "userinfoId": edit_select,
            "chineseName": $('.line input[name=ChineseName]').val(),
            "pinyinName": $('.line input[name=EnglishName]').val(),
            "gender": gender(),
            "birthday": changeTime(),
            "age": $('.line input[name=Age]').val(),
            "mobile": $('.line input[name=PhoneNumber]').val(),
            "email": $('.line input[name=Mailbox]').val(),
            "passportNo": ($('.line input[name=Passport]').val() == "") ? null : $('.line input[name=Passport]').val(),
            "divingRank": ($('.line select[name=Divelevel]').val() == "null") ? null : $('.line select[name=Divelevel]').val(),
            "divingCount": ($('.line input[name=DiveTimes]').val() == "") ? null : $('.line input[name=DiveTimes]').val()
        }
        $.ajax({
            type: "POST",
             
            url: appConfig.userupdate,
             
            contentType: "application/json; charset=utf-8",
             
            data: JSON.stringify(json),
             
            dataType: "json",
             
            headers: {
                'token': $.cookie('token'),
                'digest': $.cookie('digest')
            },
            success: function(message) {
                if (message.result == "0") {
                    $("#sub_Infor").text("保存并使用");
                    $("#list_Render").html("正在加载...");
                    getdata();
                    $('#InforPopModal').modal('hide');
                } else {
                    $("#sub_Infor").text("保存并使用");
                    alert("未知错误，可能是输入参数有误，请重试");
                }
            }
        });
    }
    // 新增 (页面)
    function addPage() {
        // 这个是必须的 因为data会刷新
        initPage.userInfoData = data;
        initPage.renderUserInfoList();
        $('#InforModal').modal('hide');
    }
    var obj = {
        init: function() {
            initInfor();
        },
        data_select: data_select,
        render2: function(num) {
            renderModal2(parseInt(num));
        },
        select: function(num) {
            selectList(parseInt(num));
        }
    }
    return obj
}();
/*
 * 初始化页面
 */
var initPage = {
    ordeDetail: function() {
        // 获取到时间戳
        var timestamp = Date.parse(loadPageVar("departureDate"));
        timestamp = timestamp / 1000;
        var newDate = new Date();
        newDate.setTime(timestamp * 1000);
        // 渲染产品信息
        function renderBasic(data) {
            var StartTime = data.promoteStartTime;
            var EndTime = data.promoteEndTime;
            var timestamp = Date.parse(new Date());
            if (data.promotePrice == null || data.promotePrice == 0) {
                /*
                 * 这里是不促销
                 */
                $("#productPrice span").text(data.productPrice)
                $("#totalPrice").text((parseInt(loadPageVar("productNum")) * (parseFloat(data.productPrice) * 100) / 100))
            } else {
                if (timestamp >= StartTime && timestamp <= EndTime) {
                    /*
                     * 这里表示促销
                     */
                    $("#productPrice span").text(data.promotePrice)
                    $("#totalPrice").text((parseInt(loadPageVar("productNum")) * (parseFloat(data.promotePrice) * 100) / 100))
                } else {
                    /*
                     * 这里是不促销
                     */
                    $("#productPrice span").text(data.productPrice)
                    $("#totalPrice").text((parseInt(loadPageVar("productNum")) * (parseFloat(data.productPrice) * 100) / 100))
                }
            }

            $("#productName").text(data.productName);
            $("#departureDate span").text(newDate.toLocaleDateString());
            $("#productNum").text(loadPageVar("productNum"));
        }
        $.ajax({
            type: "GET",
             
            url: URLbase + URLversion + "/product/" + loadPageVar("productId") + "/get.do",
             
            contentType: "application/json; charset=utf-8",
             
            success: function(message) {
                renderBasic(message.data);
            }
        });
    },
    userInfoData: [],
    renderUserInfoList: function() {
        var _data = this.userInfoData,
            _string = "";
        for (var i = 0; i < _data.length; i++) {
            if (UserInfor.data_select[i] == true) {
                _string += "<div class='Info_Deta User_info'><div class='InformationDetail' id='User_info1'><div class='CustomerInformationTitle userinfo'><div class='Info_Deta_title'>旅客" //
                    + "</div><div class='Info_Deta_close' onclick='initPage.deleteUserInfo(" //
                    + i + ")'>X</div></div><div class='line'><div class='row'><div class='col-md-2'>护照号码:</div><div class='col-md-4'><input type='text' value='" //
                    + (_data[i].passportNo == null ? "" : _data[i].passportNo) + "' disabled='disabled'></div><div class='col-md-6 prompt'>请确保护照的有效期在出行前6个月以上。</div></div></div><div class='line'><div class='row'><div class='col-md-2'>姓名(中文):</div><div class='col-md-4'><input type='text' value='" //
                    + _data[i].chineseName + "' disabled='disabled'></div><div class='col-md-6 prompt'>请依照护照姓名中文输入。例，张三</div></div></div><div class='line'><div class='row'><div class='col-md-2'>姓名(拼音):</div><div class='col-md-4'><input type='text' value='" //
                    + _data[i].pinyinName + "' disabled='disabled'></div><div class='col-md-6 prompt'>请依照护照拼音输入。例，ZHANGSAN</div></div></div><div class='line'><div class='row'><div class='col-md-2'>性别:</div><div class='col-md-5'>";
                _string += genderToString(_data[i].gender);
                _string += "</div></div></div><div class='line'><div class='row'><div class='col-md-2'>出生日期:</div>";
                _string += birthdayToString(UTC2LocalTime(_data[i].birthday));
                _string += "<div class='col-md-1'>年龄:</div><div class='col-md-4'><input type='text' value='" //
                    + _data[i].age + "' disabled='disabled'></div></div></div><div class='line'><div class='row'><div class='col-md-2'>手机号码:</div><div class='col-md-4'><input type='text' value='" //
                    + _data[i].mobile + "'  disabled='disabled'></div><div class='col-md-1'>邮箱:</div><div class='col-md-4'><input type='text' value='" //
                    + _data[i].email + "' disabled='disabled'></div></div></div><div class='line'><div class='row'><div class='col-md-2'>潜水等级:</div><div class='col-md-4'><input type='text' value='" //
                    + converlevel(_data[i].divingRank) + "' disabled='disabled'></div><div class='col-md-1'>潜次:</div><div class='col-md-4'><input type='text' value='" //
                    + (_data[i].divingCount == null ? "" : _data[i].divingCount) + "' disabled='disabled'></div></div></div></div></div>";
            }
        }
        $("#Render_Passenger").html(_string)
            /**
             * 性别转换
             * @param  gender {number} 0:保密1:男生2:女生
             * @return {string} 性别渲染的字符串
             */
        function genderToString(gender) {
            var _string = "";
            if (gender == 0) {
                _string = "<div><input type='radio' id='male1' disabled='disabled'><label for='male1'>男</label></div><div><input type='radio' id='female1' disabled='disabled'><label for='female1'>女</label></div><div style='display:none'><input type='radio' id='secret1' disabled='disabled' checked='checked'><label for='secret1'>保密</label></div>";
            } else if (gender == 1) {
                _string = "<div><input type='radio' id='male1' disabled='disabled' checked='checked'><label for='male1'>男</label></div><div><input type='radio' id='female1' disabled='disabled'><label for='female1'>女</label></div><div style='display:none'><input type='radio' id='secret1' disabled='disabled'><label for='secret1'>保密</label></div>";
            } else if (gender == 2) {
                _string = "<div><input type='radio' id='male1' disabled='disabled'><label for='male1'>男</label></div><div><input type='radio' id='female1' disabled='disabled' checked='checked'><label for='female1'>女</label></div><div style='display:none'><input type='radio' id='secret1' disabled='disabled'><label for='secret1'>保密</label></div>";
            }
            return _string
        }
        /**
         * 出生日期转换
         * @param  birthday {number} 字符串
         * @return {string} 性别渲染的字符串
         */
        function birthdayToString(birthday) {
            var _string = "",
                _birthday = new Date(birthday),
                _Year = _birthday.getFullYear(),
                _Month = _birthday.getMonth() + 1,
                _Day = _birthday.getDate();

            _string = "<div class='col-md-4'><select class='sel_year'disabled='disabled'><option value ='" //
                + _Year + "'>" + _Year + "</option></select><span>年</span><select class='sel_month' disabled='disabled'><option value ='" //
                + _Month + "'>" + _Month + "</option></select><span>月</span><select class='sel_day' disabled='disabled'><option value ='" //
                + _Day + "'>" + _Day + "</option></select><span>日</span></div>"

            return _string
        }
    },
    deleteUserInfo: function(num) {
        UserInfor.data_select[num] = false;
        this.renderUserInfoList();
    }
}





















/*
 * 获取URL键值
 * @param  sVar {string} url的?后面的参数;
 * @return {string} url的=后面参数;
 */
function loadPageVar(sVar) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
/*
 * 性别 ID 转换 文字
 * @param data {number} 0 1 2
 * @return {string} 保密 男士 女士
 */
function returnGender(data) {
    if (data == 0) {
        return "保密"
    } else if (data == 1) {
        return "男士"
    } else if (data == 2) {
        return "女士"
    }
}
/*
 * 性别 ID 转换 选择
 */
function judgeGender(data) {
    if (data == "保密") {
        $('#secret').prop('checked', true);
    } else if (data == "男士") {
        $('#male').prop('checked', true);
    } else if (data == "女士") {
        $('#female').prop('checked', true);
    }
}
/**
 * input框的性别 转换为数字
 * @return data {number} 0 1 2
 */
function gender() {
    if ($('#secret').prop('checked')) {
        return 0
    } else if ($('#male').prop('checked')) {
        return 1
    } else if ($('#female').prop('checked')) {
        return 2
    }
}
/**
 * 201x-xx-xx => 时间戳
 */
function changeTime() {
    var this_date = new Date(parseInt($("select[class=sel_year]").val()), (parseInt($("select[class=sel_month]").val()) - 1), parseInt($("select[class=sel_day]").val()));
    var birthday = Date.parse(this_date);
    return birthday
}
/*
 * 判断是否为空
 */
function cNull(data) {
    if (data == null) {
        return ""
    } else {
        return data
    }
}
// 方法 - 时间差  timestamp -> 时间戳
function UTC2LocalTime(timestamp) {
    //将 服务器UTC时间戳 转为Date
    var d = new Date(timestamp);
    //服务器UTC时间 与 GMT时间的时间 偏移差
    var offset = d.getTimezoneOffset() * 60000;
    return new Date(timestamp - offset);
}
/**
 * 潜水等级 转换
 * @param data {number} 1 2 3 4 5 …………
 * @return {string} OW(初级潜水员) AOW(开放水域进阶潜水员) EFR(第一紧急反应) ……
 */
function converlevel(number) {
    if (number == 1) {
        return "OW(初级潜水员)";
    } else if (number == 2) {
        return "AOW(开放水域进阶潜水员)";
    } else if (number == 3) {
        return "EFR(第一紧急反应)";
    } else if (number == 4) {
        return "RESCUE(救援潜水员)";
    } else if (number == 5) {
        return "MASTER SCUBA(名仕潜水员)";
    } else if (number == 6) {
        return "MASTER(潜水长)";
    } else if (number == 7) {
        return "OWSI(开放水域水肺教练)";
    } else if (number == 8) {
        return "MSDT(名仕潜水员训练官)";
    } else if (number == 9) {
        return "MASTER INSTRUCTOR(教练长)";
    } else {
        return "";
    }
}
