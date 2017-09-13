/**
 * 第三页
 */
// 初始化必要的信息,暂定
var allRoom = [];
// 获取到模态框数据 并且并入 allRoom 的临时数据
var dataModal = {};
var pageThird = (function(){

	// 初始化模态框使用到的最初数据
	function initiModal() {
		var obj = {"mobile":{allow:false,data:null},"email":{allow:false,data:null},"passportNo":{allow:true,data:null},"nationality":{allow:false,data:null},"chineseName":{allow:false,data:null},"pinyinName":{allow:false,data:null},"gender":{allow:true,data:1},"birthday":{allow:false,data:null},"isDive":{allow:true,data:"N"},"divingRank":{allow:true,data:null},"divingCount":{allow:true,data:null},"lastDiveTime":{allow:true,data:null},"anamnesis":{allow:true,data:"无"},"roomId":{allow:true,data:null},"divingNo":{allow:true,data:null}}
		return obj
	}
	function init() {
		/**
		 * 下方是数据的初始化
		 */
		 // 一间空房子
		 function outputRoom() {
		 	// 如果是模板 3 紧急联系人是必填
		 	if ( loaddata.template == 3 || loaddata.template == 9 ) {
				var obj = {
					"roomId":{allow:true,data:null},
					"bedType":{allow:false,data:null},
					"iceName":{allow:false,data:null},
					"iceRelation":{allow:false,data:null},
					"iceMobile":{allow:false,data:null},
					"iceEmail":{allow:false,data:null},
					"infoId":{allow:true,data:null},
					"customerInfoList":[]
				};
				return obj
		 	}else {
				var obj = {
					"roomId":{allow:true,data:null},
					"bedType":{allow:false,data:null},
					"iceName":{allow:true,data:null},
					"iceRelation":{allow:true,data:null},
					"iceMobile":{allow:true,data:null},
					"iceEmail":{allow:true,data:null},
					"infoId":{allow:true,data:null},
					"customerInfoList":[]
				};
				return obj
		 	}
		 }
		 // 一个空顾客
		 function outputCustomer() {
			var obj = {
	            "customerId":{allow:false,data:null},
	            "passportNo":{allow:false,data:null},
	            "nationality":{allow:false,data:null},
	            "chineseName":{allow:false,data:null},
	            "pinyinName":{allow:false,data:null},
	            "gender":{allow:false,data:null},
	            "birthday":{allow:false,data:null},
	            "mobile":{allow:false,data:null},
	            "email":{allow:false,data:null},
	            "isDive":{allow:false,data:null},
	            "divingRank":{allow:false,data:null},
	            "divingCount":{allow:false,data:null},
	            "lastDiveTime":{allow:false,data:null},
	            "anamnesis":{allow:false,data:"无"},
	            "roomId":{allow:true,data:null},
	            "divingNo":{allow:true,data:null}
			}
			return obj
		 }
		 // 当传进来的数据为空，渲染房间数！
		 if (loaddata.roomInfoList.length == 0) {
			var _Array = [];
			for (var i = 0; i < loaddata.roomNum; i++) {
				_Array.push(outputRoom());
			}
			allRoom = _Array;
		 }else {

		 	// 当传进来的数据不为空
			// 先创建临时对象
			var _Array = [];
			// 渲染空房间数
			for (var j = 0; j < loaddata.roomNum; j++) {
				_Array.push(outputRoom());
			}
			for (var i = 0; i < loaddata.roomInfoList.length; i++) {
				// 初始化 roomId infoId
				var _addID = outputRoom();
				_addID.roomId.data = i+1;
				_addID.infoId.data = loginSuccessful.infoId;
				// 初始化新房间,根据加载进来的数据
				_Array[i] = _addID;
				// 再看是否有顾客,根据加载进来的数据
				for (var j = 0; j < loaddata.roomInfoList[i].customerInfoList.length; j++) {
					// 初始化roomID
					var _roomId = outputCustomer();
					_roomId.roomId.data = i+1;
					// 如果有顾客就初始化进去
					_Array[i].customerInfoList.push(_roomId);
				}
			}
			// 进行数据转换！(如果有数据就转换)
			for (var i = 0; i < loaddata.roomInfoList.length; i++) {
				for(var _roomInfo in loaddata.roomInfoList[i]){
					// 将非 customerInfoList 的数据转换成为 临时对象数据
					if (_roomInfo != "customerInfoList") {
						_Array[i][_roomInfo].data = loaddata.roomInfoList[i][_roomInfo];
						// 只要数据不为空 或者 不为null 就让数据进行通过
						if (loaddata.roomInfoList[i][_roomInfo] == null) {
						}else {
							_Array[i][_roomInfo].allow = true;
						}
					}
				}
				for (var j = 0; j < loaddata.roomInfoList[i].customerInfoList.length; j++) {
					for(var _customerInfo in loaddata.roomInfoList[i].customerInfoList[j]){
						// 把age跳过
						if ( _customerInfo == "age" ) {continue}
						_Array[i].customerInfoList[j][_customerInfo].data = loaddata.roomInfoList[i].customerInfoList[j][_customerInfo];
						// 只要数据不为空 或者 不为null 就让数据进行通过
						if (loaddata.roomInfoList[i].customerInfoList[j][_customerInfo] != null ||loaddata.roomInfoList[i].customerInfoList[j][_customerInfo] != "" ) {
							_Array[i].customerInfoList[j][_customerInfo].allow = true;
						}
					}
				}
			}
			allRoom = _Array;
		 }
		 var _Num = 0;
		 for (var k = 0; k < loaddata.roomInfoList.length; k++) {
		 	_Num = _Num + loaddata.roomInfoList[k].customerInfoList.length;
		 }
		 _Num = loginSuccessful.peopleNum - _Num;
		 $("#_RoomNumber").text( "还可入住" + _Num + "人" )

		 // 渲染房间
		 RenderRoom();
		if (loaddata.roomInfoList.length!= 0) {
			if (loaddata.isRead == "N") {
			}else {
				$("#_ugName").val(allRoom[0].iceName.data);
				$("#_ugRelation").val(allRoom[0].iceRelation.data);
				$("#_ugPhone").val(allRoom[0].iceMobile.data);
				$("#_ugEmail").val(allRoom[0].iceEmail.data);
			}
		}



		/**
		 * 下方是事件的初始化
		 */
		// 初始化紧急联系人
		// 紧急联系人姓名并入到主数据
		$("#_ugName").blur(function(event) {
			allRoom[0].iceName.allow= false;
			if (event.target.value.trim() == "" || event.target.value.trim() == null) {
				$("#_ugNameText").text('不能为空');
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				return
			}else if ( !(/^[\u4E00-\u9FA5]+$/.test(event.target.value.trim())) ) {
				// 判断是否全是中中文
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				$("#_ugNameText").text('必须为中文');
				return
			}else if ( event.target.value.length >= 5 ) {
				// 判断是否小于5个汉字
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				$("#_ugNameText").text('不能超出5个汉字');
				return
			}
			$("#_ugNameText").text('');
			for (var i = 0; i < allRoom.length; i++) {
				allRoom[i].iceName.allow= true;
				allRoom[i].iceName.data = event.target.value.trim();
			}
		});
		// 紧急联系人关系并入到主数据
		$("#_ugRelation").change(function(event) {
			allRoom[0].iceRelation.allow = false;
			if (event.target.value == "0") {
				$("#_ugRelationText").text('紧急联系人关系是必选');
				return
			}
			$("#_ugRelationText").text('');
			for (var i = 0; i < allRoom.length; i++) {
				allRoom[i].iceRelation.allow= true;
				allRoom[i].iceRelation.data = event.target.value;
			}
		});
		// 紧急联系人手机(电话)并入到主数据
		$("#_ugPhone").blur(function(event) {
			allRoom[0].iceMobile.allow= false;
			if (event.target.value.trim() == "" || event.target.value.trim() == null) {
				$("#_ugPhoneText").text('不能为空');
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				return
			}
			if (!(/^1[34578]\d{9}$/.test(event.target.value.trim()))) {
				// 号码错误
				$("#_ugPhoneText").text('格式错误');
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				return
			}
			$("#_ugPhoneText").text('');
			for (var i = 0; i < allRoom.length; i++) {
				allRoom[i].iceMobile.allow= true;
				allRoom[i].iceMobile.data = event.target.value.trim();
			}
		});
		// 紧急联系人邮箱并入到主数据
		$("#_ugEmail").blur(function(event) {
			allRoom[0].iceEmail.allow= false;
			if (event.target.value.trim() == "" || event.target.value.trim() == null) {
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				$("#_ugEmailText").text('不能为空');
				return
			}
			if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(event.target.value))) {
			// 邮箱不正确
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				$("#_ugEmailText").text('格式不正确');
				return
			}
			$("#_ugEmailText").text('');
			for (var i = 0; i < allRoom.length; i++) {
				allRoom[i].iceEmail.allow= true;
				allRoom[i].iceEmail.data = event.target.value.trim();
			}
		});

		// 初始化 模态框保存
		$("#colseModal").click(function(event) {
			// 判断 dataModal 的数据，如果等于 false 不通过并且弹出警告
			if (chackTraveler() == false) {
				return
			}
			loding.show();
			// 判断 修改的是哪间房的 旅客信息
			var RoomID = parseInt($("#colseModal").attr('data-RoomID'));
			// 判断 data-type 是 add 新增数据 还是 change修改数据
			if ($("#colseModal").attr('data-type') == "add") {
				// 将 dataModal 的数据 混入 allRoom 里面
				allRoom[RoomID].customerInfoList.push(dataModal);
			}else {
				var CardID = parseInt($("#colseModal").attr('data-CardID'));
				allRoom[RoomID].customerInfoList.splice(CardID,1,dataModal);
			}
			RenderCard(RoomID);
			$('#RoomInformation').closeModal();
			clearModal();
			countRoom();
		});

		// 初始化模态框的事件
		// 护照号码
		$("#PassportNumber").change(function(event){
			dataModal.passportNo.data = event.target.value.trim();
		});
		// 国籍
		$("#_liveCountry").change(function(event){
			if (event.target.value == "0") {
				$(this).next().html('国籍为必选');
				dataModal.nationality.allow = false;
				return
			}
			$(this).next().html('');
			dataModal.nationality.data = event.target.value;
			dataModal.nationality.allow = true;
		});
		// 姓名(中文)
		$("#liveName").blur(function(event){
			if (event.target.value.trim() == "" || event.target.value.trim() == null) {
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				dataModal.chineseName.allow  = false;
				$(this).next().html('姓名为必填!');
				return
			}else if ( !(/^[\u4E00-\u9FA5]+$/.test(event.target.value.trim())) ) {
				// 判断是否全是中中文
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				dataModal.chineseName.allow  = false;
				$(this).next().html('必须为中文!');
				return
			}else if ( event.target.value.length >= 15 ) {
				// 判断是否小于5个汉字
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				$(this).next().html('不能超出15个汉字!');
				dataModal.chineseName.allow  = false;
				return
			}
			$(this).next().html('');
			dataModal.chineseName.allow  = true;
			dataModal.chineseName.data = event.target.value.trim();

			$("#livePinyin").val($(this).toPinyin());
			$("#livePinyin").next().attr('class', 'value active');
			dataModal.pinyinName.allow = true;
			dataModal.pinyinName.data  = $(this).toPinyin();
		})
		// 姓名(拼音)
		$("#livePinyin").blur(function(event){
			if ( event.target.value.length >= 32 ) {
				// 判断是否小于32个汉字
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				$(this).next().html('不能超过32位!');
				dataModal.pinyinName.allow  = false;
				return
			}else if (event.target.value.trim() == "" || event.target.value.trim() == null) {
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				$(this).next().html('不能为空!');
				dataModal.pinyinName.allow  = false;
				return
			}
			$(this).next().html('');
			dataModal.pinyinName.allow  = true;
			dataModal.pinyinName.data = event.target.value.trim();
		});
		// 性别
			$("#client_man").click(function(){
				dataModal.gender.allow = true;
				dataModal.gender.data  = 1;
			})
			$("#client_girls").click(function(){
				dataModal.gender.allow = true;
				dataModal.gender.data  = 2;
			})
		// 生日
		$("#liveBirthday").change(function(event){
			if (event.target.value == "") {
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				dataModal.birthday.allow = false;
				dataModal.birthday.data = null;
				return
			}
			dataModal.birthday.allow = true;
			document.getElementById('liveBirthday').setAttribute("class", "");
			dataModal.birthday.data = returnDatestamp(event.target.value);
		});
		// 判断 手机号码 是否正确
		$("#livePhone").blur(function(event){
			if (event.target.value == "" || event.target.value.trim() == null) {
				$(this).next().html('不能为空');
				dataModal.mobile.allow = false;
				return
			}
			$(this).next().html('');
			dataModal.mobile.data = event.target.value.trim();
			dataModal.mobile.allow = true;
		})
		// 判断 邮箱 是否正确
		$("#liveEmail").blur(function(event){
			if (event.target.value == "" || event.target.value.trim() == null) {
				$(this).next().html('不能为空');
				dataModal.email.allow = false;
				return
			}else if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(event.target.value.trim()))) {
				// 邮箱不正确
				$(this).next().html('邮箱不正确');
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				dataModal.email.allow = false;
				return
			}
			$(this).next().html('');
			dataModal.email.data = event.target.value.trim();
			dataModal.email.allow = true;
		})

		// 初始化选择度假潜水类型
			// 选择深潜
			$("#lever_Depth").click(function(){
				// 显示深潜
				document.getElementById("Diving_Depth").setAttribute("style","display:block;")
				dataModal.isDive.data="Y";
			});
			// 选择浮潜
			$("#lever_Simple").click(function(){
				// 隐藏浮潜
				document.getElementById("Diving_Depth").setAttribute("style","display:none;")
				dataModal.isDive.data="N";
				// 清空显示
				$("#_Depthlevel").val("0")
				$("#Depth_divingNo").val("")
				$("#Depth_time").val("")
				$("#Depth_Amount").val("")
				// 清空数据
				dataModal.divingRank.data=null;
				dataModal.divingNo.data=null;
				dataModal.lastDiveTime.data=null;
				dataModal.divingCount.data=null;
			});

		// 请选择潜水级别
		$("#_Depthlevel").change(function(event){
			if (event.target.value == "0") {
				dataModal.divingRank.data = null;
			}else{
				dataModal.divingRank.data = event.target.value;
			}
		});
		// 潜水证号
		$("#Depth_divingNo").change(function(event){
			// 长度不能超过 16位
			if (event.target.value.length > 16) {
				$(this).next().html('潜水证号长度不能超过 16位');
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				dataModal.divingNo.data = null;
				dataModal.divingNo.allow = false;
				return
			}
			$(this).next().html('');
			dataModal.divingNo.allow = true;
			dataModal.divingNo.data = event.target.value.trim();
		});
		// 上次潜水时间
		$("#Depth_time").change(function(event){
			if (event.target.value == "") {
				dataModal.lastDiveTime.data = null;
				return
			}
			dataModal.lastDiveTime.data = returnDatestamp(event.target.value);
		});
		// 潜水次数
		$("#Depth_Amount").change(function(event){
			if ( !(/^\d+$/.test(event.target.value.trim())) ) {
				// 判断是否全为数字
				if (event.target.value.trim() != "") {
					$(this).next().html('潜水次数必须全为数字');
					dataModal.divingCount.allow = false;
					setTimeout(function(){
						event.target.setAttribute("class","validate invalid");
					},100);
					dataModal.divingCount.data = null;
					return
				}
			}
			$(this).next().html('');
			dataModal.divingCount.allow = true;
			dataModal.divingCount.data = event.target.value.trim();
		});


		// 以往重大病史
		$("#MajorDisease").change(function(event){
			dataModal.anamnesis.data = event.target.value.trim();
		});

		// 关闭模态框
		$("#CloseTraModal").click(function(event) {
			clearModal();
			$('#RoomInformation').closeModal();
		});

		// 下一页 nextPage
		$("#toPageFourth").click(function(event) {
			nextPage();
		});
		$("#returnPageSecond").click(function(event) {
			$('ul.tabs').tabs('select_tab', 'test2');
			// 隐藏这一页按钮
			$("#returnPageSecond").css('display', 'none');
			$("#toPageFourth").css('display', 'none');
			// 显示上一页按钮
			$("#returnPageFirst").css('visibility', 'visible');
			$("#returnPageFirst").css('display', 'inline-block');
			$("#toPageThird").css('display', 'inline-block');
		});
	}
	// 清空模态框
	function clearModal() {
		// 清空数据
		dataModal = initiModal();

		// 通用清空样式
		$("#RoomInformation input").val("");
		$("#RoomInformation input").removeClass('invalid');
		$("#RoomInformation input").removeClass('valid');

		// 初始化国籍
		$("#_liveCountry").val("0")
		// 清空生日
		$("#liveBirthday").val("")

		// 初始化 隐藏选择度假潜水类型
		$("#lever_Simple").click();

		// 清空 潜水级别
		$("#_Depthlevel").val("0")
		// 清空 潜水级别
		$("#Depth_divingNo").val("")
		// 清空 潜水证号
		$("#Depth_time").val("")
		// 清空 潜水次数
		$("#Depth_Amount").val("")
	}
	// 渲染新的 房间
	function RenderRoom() {
		// 渲染 房间导航
		var _navString = '';
		for (var i = 0; i < allRoom.length; i++) { // 每间房间的唯一标示ID为 i+1
			if ( i == 0 ) {
				_navString += "<li class='tab collection-item'><a class='active' href='#room1'>房间1</a></li>";
			}else {
				_navString +="<li class='tab collection-item'><a href='#room"+(i+1)+"'>房间"+(i+1)+"</a></li>";
			}
		}
		$("#RoomNav").html(_navString);

		// 渲染 房间内容
		var _roomString = '';
		for (var i = 0; i < allRoom.length; i++) {
			var roomTempString = [
				"<div id='room"+ (i+1) +"' class='col s12'>",
					"<div class='card-title _title'>",
						"房间"+ (i+1), 
						"<a id='addTravelers"+ (i+1) +"' class='waves-effect waves-light btn tooltipped right addTravelers' data-position='bottom' data-delay='50' data-tooltip='点击添加旅客信息'>",
							"旅客信息",
							"<i class='mdi-content-add'></i>",
						"</a>",
					"</div>",
					"<div class='row'>",
						"<div class='newInput input-field col s12 bedtype' id='bedtype"+ (i+1) +"' style='padding:0px;'>",
						"</div>",
					"</div>",
					"<div class='_roomInfoList' id='Render"+ (i+1) +"'></div>",
				"</div>",
			].join("");
			_roomString += roomTempString;
		}
		$("._Travelers").html(_roomString);
		$('ul.tabs').tabs(); // 初始化导航栏

		// 如果 模板 3 ，不需要填写紧急联系人信息
		if (loaddata.template != 3 && loaddata.template != 9) {
			$(".EmergencyCT").css("display","none");
		}

		// 绑定新的房间 所有事件
		for (var i = 0; i < allRoom.length; i++) {

			$("#bedtype"+(i+1)).html(livebedToString(allRoom[i].bedType.data,(i+1)))
			// 初始化床型选择框
			// $('#livebed'+(i+1)).material_select();
			$('#livebed'+(i+1)).attr('data-RoomID',i);

			// 初始化所有旅客信息
			RenderCard(i);
			// 初始化添加旅客信息
			$("#addTravelers"+(i+1)).attr('data-RoomID',i);
			$("#addTravelers"+(i+1)).click(function(event) {
				var num = 0;
				for (var i = 0; i < allRoom.length; i++) {
					num += allRoom[i].customerInfoList.length
				}
				// 判断是否达到最大人数，如果是，不给继续添加！
				if (num >= loaddata.peopleNum) {
					myToast('达到最大人数', 4000);
					return
				}
				// 初始化模态框数据，指向新的数据、
				dataModal = initiModal();
				dataModal.roomId.data = allRoom[event.target.getAttribute("data-Roomid")].roomId.data;
				// 判断 编辑还是添加 旅客信息
				$("#colseModal").attr('data-type','add');
				// 判断 修改的是哪间房的 旅客信息
				$("#colseModal").attr('data-RoomID',event.target.getAttribute("data-Roomid"));
				// 打开模态框
				$('#RoomInformation').openModal({
					dismissible: false
				});
				SetModalHeight();
			});
			// 选择床型并入到主数据
			$('#livebed'+(i+1)).change(function(event) {
				$(this).addClass("selectDone");
				var RoomID = event.target.getAttribute("data-RoomID");
				allRoom[RoomID].bedType.allow= true;
				allRoom[RoomID].bedType.data = event.target.value.trim();
				$(".bedtype .showError").html("");
			});

		}
		// 渲染关系方法
		function renderurgentRelation(_id,_data) {
			if (!_data) {
				return "<select class='select selectadd' id='_urgentRelation"+(_id+1)+"' data-ID='urgentRelation'><option value ='0' selected>请选择关系</option><option value ='兄弟姐妹'>兄弟姐妹</option><option value='父母'>父母</option><option value='夫妻'>夫妻</option><option value='朋友'>朋友</option><option value='其他'>其他</option></select>"
			}if (_data == '兄弟姐妹') {
				return "<select class='select selectadd' id='_urgentRelation"+(_id+1)+"' data-ID='urgentRelation'><option value ='0'>请选择关系</option><option value ='兄弟姐妹' selected>兄弟姐妹</option><option value='父母'>父母</option><option value='夫妻'>夫妻</option><option value='朋友'>朋友</option><option value='其他'>其他</option></select>"
			}else if (_data == '父母') {
				return "<select class='select selectadd' id='_urgentRelation"+(_id+1)+"' data-ID='urgentRelation'><option value ='0'>请选择关系</option><option value ='兄弟姐妹'>兄弟姐妹</option><option value='父母' selected>父母</option><option value='夫妻'>夫妻</option><option value='朋友'>朋友</option><option value='其他'>其他</option></select>"
			}else if (_data == '夫妻') {
				return "<select class='select selectadd' id='_urgentRelation"+(_id+1)+"' data-ID='urgentRelation'><option value ='0'>请选择关系</option><option value ='兄弟姐妹'>兄弟姐妹</option><option value='父母'>父母</option><option value='夫妻' selected>夫妻</option><option value='朋友'>朋友</option><option value='其他'>其他</option></select>"
			}else if (_data == '朋友') {
				return "<select class='select selectadd' id='_urgentRelation"+(_id+1)+"' data-ID='urgentRelation'><option value ='0'>请选择关系</option><option value ='兄弟姐妹'>兄弟姐妹</option><option value='父母'>父母</option><option value='夫妻'>夫妻</option><option value='朋友' selected>朋友</option><option value='其他'>其他</option></select>"
			}else {
				return "<select class='select selectadd' id='_urgentRelation"+(_id+1)+"' data-ID='urgentRelation'><option value ='0'>请选择关系</option><option value ='兄弟姐妹'>兄弟姐妹</option><option value='父母'>父母</option><option value='夫妻'>夫妻</option><option value='朋友'>朋友</option><option value='其他' selected>其他</option></select>"
			}
		}
	}
	/**
	 * 渲染(模态框)(根据 RoomID 以及 CarID )
	 */
	function renderModal(RoomID,CarID) {
		// 数据部分
		var _data = allRoom[RoomID].customerInfoList[CarID];
		dataModal = allRoom[RoomID].customerInfoList[CarID];

		// 护照号码
		$("#PassportNumber").val(_data.passportNo.data)
		$("#PassportNumber").next().attr('class', 'value active');// 浏览器兼容
		// 国籍
		$('#_liveCountry').val(_data.nationality.data);
		// 姓名
		$("#liveName").val(_data.chineseName.data)
		$("#liveName").next().attr('class', 'value active');
		// 拼音
		$("#livePinyin").val(_data.pinyinName.data)
		$("#livePinyin").next().attr('class', 'value active');
		// 渲染性别
		if (_data.gender.data == 1) {
			$("#client_man").attr('checked','');
		}else {
			$("#client_girls").attr('checked','');
		}
		// 生日
		$("#liveBirthday").val(returnDate(_data.birthday.data))
		// 手机号码
		$("#livePhone").val(_data.mobile.data)
		$("#livePhone").next().attr('class', 'value active');
		// 邮箱
		$("#liveEmail").val(_data.email.data)
		$("#liveEmail").next().attr('class', 'value active');

		// 潜水类型
		if (_data.isDive.data == "Y") {
			$("#lever_Depth").click();
			document.getElementById("Diving_Depth").setAttribute("style","display:block;")

			// 级别
			$("#_Depthlevel").val(_data.divingRank.data);
			// 潜水证号
			$('#Depth_divingNo').val(_data.passportNo.data);
			$("#Depth_divingNo").next().attr('class', 'value active');
			// 上次潜水时间
			$('#Depth_time').val(_data.lastDiveTime.data);
			// 潜水次数
			$('#Depth_Amount').val(_data.divingCount.data);
			$("#Depth_Amount").next().attr('class', 'value active');
		}

		// 渲染以往重大病史
		$("#MajorDisease").val(_data.anamnesis.data);
		$("#MajorDisease").next().attr('class', 'value active');
	}
	/**
	 * 验证(模态框填写的所有数据)
	 * 判断 dataModal 的数据，如果等于 false 不通过并且弹出警告
	 */
	function chackTraveler() {
		for(var data in dataModal) {
			if (data == "customerId") {
				// 这个是例外，不需要进行判断！
			}else {
				if (dataModal[data].allow == false) {
					if (data == "mobile") {
						myToast('请填写手机号码');
						$("#livePhone").next().html('请填写手机号码');
						return false
					}else if (data == "email") {
						myToast('请填写邮箱');
						$("#liveEmail").next().html('请填写邮箱');
						return false
					}else if (data == "nationality") {
						myToast('请选择国籍');
						$("#_liveCountry").next().html('请选择国籍');
						return false
					}else if (data == "chineseName") {
						myToast('请填写中文名');
						$("#liveName").next().html('请填写中文名');
						return false
					}else if (data == "pinyinName") {
						myToast('请填写英文名');
						$("#livePinyin").next().html('请填写英文名');
						return false
					}else if (data == "birthday") {
						myToast('请选择生日日期');
						return false
					}else {
						myToast("获取数据"+data+"发生异常,请联系客服或更换浏览器.");
						return false
					}
				}
			}
		}
	}
	/**
	 * 渲染新的 客人信息
	 * @param    {number}  roomNum    渲染第几间房间下的的所有Card
	 */
	function RenderCard(roomNum) {
		var allCard = allRoom[roomNum].customerInfoList;
		var _carString = ""
		for (var i = 0; i < allCard.length; i++) {
			// 判断 深潜
			var _chack;
			if (allCard[i].isDive.data=="Y") {
				_chack = "block"
			}else {
				_chack = "none"
			}
			// 渲染
			_carString += "<div class='card-panel _part' id='card-panel"//
				+i+"'><div class='row delete'><a class='title'>旅客信息"//
				+(i+1)+"</a><i id='delete"//
				+i+"Room"+roomNum+"' class='mdi-navigation-close right'></i></div><div class='row'><div class='input-field col s6'>护照号:<span>"//
				+testDataNull(allCard[i].passportNo.data)+ "</span></div><div class='input-field col s6'>国籍:<span>"//
				+testDataNull(allCard[i].nationality.data)+"</span></div></div><div class='row'><div class='input-field col s6'>姓名(中文):<span>"//
				+testDataNull(allCard[i].chineseName.data)+"</span></div><div class='input-field col s6'>姓名(拼音):<span>"//
				+testDataNull(allCard[i].pinyinName.data)+"</span></div></div><div class='row'><div class='input-field col s6'>性别:<span>"//
				+(allCard[i].gender.data==1?"男":"女")+"</span></div><div class='input-field col s6'>生日:<span>"//
				+returnDate(testDataNull(allCard[i].birthday.data))+"</span></div></div><div class='row'><div class='input-field col s6'>手机(电话):<span>"//
				+testDataNull(allCard[i].mobile.data)+"</span></div><div class='input-field col s6'>邮箱:<span>"//
				+testDataNull(allCard[i].email.data)+"</span></div></div><div class='row'><div class='input-field col s6'>是否深潜:<span>"//
				+((allCard[i].isDive.data=="Y")?"深潜":"浮潜")+"</span></div><div class='input-field col s6' style='display:"//
				+_chack+";'>潜水证号:<span>"//
				+testDataNull(allCard[i].divingNo.data)+"</span></div></div><div class='row'><div class='input-field col s6' style='display:"//
				+_chack+";'>潜水级别:<span>"//
				+DivelevelToChinese(allCard[i].divingRank.data)+"</span></div><div class='input-field col s6' style='display:"//
				+_chack+";'>潜水次数:<span>"//
				+testDataNull(allCard[i].divingCount.data)+"</span></div></div><div class='row'><div class='input-field col s12' style='display:"//
				+_chack+";'>上次潜水:<span>"//
				+((allCard[i].lastDiveTime.data==""||allCard[i].lastDiveTime.data==null)?"未填写":returnDate(allCard[i].lastDiveTime.data))+"</span></div></div><div class='row'><div class='input-field col s12'>重大病史:<span>"//
				+((allCard[i].anamnesis.data==null||allCard[i].anamnesis.data=="")?"无":allCard[i].anamnesis.data)+"</span></div></div><div class='_editTravelers'><button id='_editTravelers"//
				+i+"Room"+roomNum+"' class='btn waves-effect waves-light right'>编辑</button></div></div>"
		}
		var RenderID = roomNum + 1 ;
		$("#Render"+RenderID).html(_carString);
		// 初始化 事件
		for (var i = 0; i < allCard.length; i++) {
			// 初始化 删除事件
			$("#delete"+i+"Room"+roomNum).attr('data-RoomID',roomNum);
			$("#delete"+i+"Room"+roomNum).attr('data-CardID',i);
			$("#delete"+i+"Room"+roomNum).click(function(event) {
				var RoomID = parseInt(event.target.getAttribute('data-RoomID')),
					CardID = parseInt(event.target.getAttribute('data-CardID'));
				var _Array = allRoom[RoomID].customerInfoList;
				_Array.splice(CardID,1);
				allRoom[RoomID].customerInfoList = _Array;
				RenderCard(RoomID);
				countRoom();
			});
			// 初始化编辑旅客信息
			$("#_editTravelers"+i+"Room"+roomNum).attr('data-RoomID',roomNum);
			$("#_editTravelers"+i+"Room"+roomNum).attr('data-CardID',i);
			$("#_editTravelers"+i+"Room"+roomNum).click(function(event) {
				// 初始化模态框数据，指向新的数据、
				dataModal = initiModal();
				dataModal.roomId.data = allRoom[event.target.getAttribute("data-RoomID")].roomId.data
				// 进行模态框渲染
				renderModal(event.target.getAttribute("data-RoomID"),event.target.getAttribute("data-CardID"));
				// 判断 编辑还是添加 旅客信息
				$("#colseModal").attr('data-type','change');
				// 判断 修改的是哪间房的 旅客信息
				$("#colseModal").attr('data-RoomID',event.target.getAttribute("data-RoomID"));
				// 判断 修改的是第几个 旅客信息
				$("#colseModal").attr('data-CardID',event.target.getAttribute("data-CardID"));
				// 打开模态框
				$('#RoomInformation').openModal({
					dismissible: false
				});
				SetModalHeight();
			});
		}
	}
	// 还剩下多少间房间
	function countRoom() {
		var _Num = 0;
		for (var k = 0; k < allRoom.length; k++) {
			_Num = _Num + allRoom[k].customerInfoList.length;
		}
		_Num = loginSuccessful.peopleNum - _Num;
		$("#_RoomNumber").text( "还可入住" + _Num + "人" )
	}
	function nextPage() {
		// 用来判断是否通过
		var _allow = true,
			_toast = '您有信息仍未完善';
		for (var i = 0; i < allRoom.length; i++) {
			for(var _roomInfo in allRoom[i]){
				if (_roomInfo == "customerInfoList") {
					// 将忽略掉 customerInfoList 客户信息验证
				}else{
					if (allRoom[i][_roomInfo].allow == false) {
						// 如果有一个验证不通过，不让通过
						if (_roomInfo == "bedType") {
							$(".bedtype .showError").html("每间房间必须选择床型");
							_toast = '每间房间必须选择床型';
						}else if (_roomInfo == "iceEmail") {
							$("#_ugNameText").text('填写有误');
							_toast = '每间房间必须填写紧急联系人邮箱'
						}else if (_roomInfo == "iceRelation") {
							$("#_ugRelationText").text('填写有误');
							_toast = '每间房间必须填写紧急的关系'
						}else if (_roomInfo == "iceMobile") {
							$("#_ugPhoneText").text('填写有误');
							_toast = '每间房间必须填写紧急联系人的手机'
						}else if (_roomInfo == "iceName") {
							$("#_ugEmailText").text('填写有误');
							_toast = '每间房间必须填写紧急联系人姓名'
						}
						_allow = false;
					}
				}
			}
			if (allRoom[i].customerInfoList.length == 0) {
				_allow = false;
				myToast('每间房间至少填写一人旅客信息');
				return
			}else{
				for (var j = 0; j < allRoom[i].customerInfoList.length; j++) {
					for(var _customerInfo in allRoom[i].customerInfoList[j]){
						if (_customerInfo == "roomId") {
							// 忽略掉 roomId
						}else{
							if (allRoom[i].customerInfoList[j][_customerInfo].allow == false) {
								// 如果有一个验证不通过，不让通过
								_allow = false;
							}
						}
					}
				}
			}
		}
		if (_allow == false) {
			myToast(_toast);
			return
		}
		loding.show();
		// 验证通过将数据并入主数据
		var temObj = [];
		for (var i = 0; i < allRoom.length; i++) {
			function creatRoom() {
				var obj = {"roomId":null,"iceName":null, "iceRelation":null,"iceMobile":null,"iceEmail":null,"bedType":null,"customerInfoList":[]}
				return obj
			}
			temObj.push(creatRoom())
			for(var _roomInfo in allRoom[i]){
				if (_roomInfo == "customerInfoList") {
					// 将忽略掉 customerInfoList 客户信息验证
				}else{
					temObj[i][_roomInfo] = allRoom[i][_roomInfo].data
				}
			}
			for (var j = 0; j < allRoom[i].customerInfoList.length; j++) {
				function creatCustomer() {
					var obj = {"customerId":null,"passportNo":null,"nationality":null,"chineseName":null,"pinyinName":null,"gender":null,"birthday":null,"mobile":null,"email":null,"isDive":null,"divingRank":null,"divingCount":null,"lastDiveTime":null,"anamnesis":null,"roomId":null}
					return obj
				}
				temObj[i].customerInfoList.push(creatCustomer())
				for(var _customerInfo in allRoom[i].customerInfoList[j]){
					temObj[i].customerInfoList[j][_customerInfo] = allRoom[i].customerInfoList[j][_customerInfo].data
				}

			}
		}
		finaldata.roomInfoList = temObj;
		if (_first == true) {
			inforData.save();
		}
		// 并入成功跳转下一页
		// 隐藏这一页按钮
		$("#returnPageSecond").css('visibility', 'hidden');
		$("#toPageFourth").css('display', 'none');
		// 显示下一页的两个个按钮
		$("#returnPageThird").css('display', 'inline-block');
		$("#toPageFives").css('display', 'inline-block');
		// 跳转到下一页
    	$('ul.tabs').tabs('select_tab', 'test4');
    	// 提交数据
    	// pageFourth.init();
    	pageEspecially.init();
		// for (var i = 0; i < allRoom.length; i++) {
		// 	for(var _roomInfo in allRoom[i]){
		// 		if (_roomInfo == "customerInfoList") {
		// 			// 将忽略掉 客户信息
		// 		}
		// 		finaldata.roomInfoList[i][_roomInfo] = allRoom[i][_roomInfo].data;
		// 	}
		// }
	}
	var obj = {
		init:function(){
			init();
		},
		RenderCard:function(roomNum){
			RenderCard(roomNum)
		}
	}
	return obj;
})();