
/**
 * 第二页
 */
var pageSecond = (function(){
	// 初始化 设置 所有数据
	var dataAllow = {
		signName:{
			// false 表示必填 才可以通过 true 表示不填 都可以通过
			allow:false,
			// data 表示数据
			data:null
		},
		payAccount:{
			allow:true,
			data:null
		},
		mobile:{
			allow:false,
			data:null
		},
		email:{
			allow:false,
			data:null
		},
		// 国际航班号
		outboundNum:{
			allow:true,
			data:null
		},
		landDate:{
			allow:true,
			data:null
		},
		landTime:{
			allow:true,
			data:null
		},
		// 到港航班号
		inboundNum:{
			allow:true,
			data:null
		},
		takeoffDate:{
			allow:true,
			data:null
		},
		takeoffTime:{
			allow:true,
			data:null
		},
		// 国际航班号
		inHarbourNum:{
			allow:true,
			data:null
		},
		hLandDate:{
			allow:true,
			data:null
		},
		hLandTime:{
			allow:true,
			data:null
		},
		// 离港航班号
		outHarbourNum:{
			allow:true,
			data:null
		},
		hTakeoffDate:{
			allow:true,
			data:null
		},
		hTakeoffTime:{
			allow:true,
			data:null
		},
		flightNote:{
			allow:true,
			data:''
		},
		// present:{ // 这个是赠送
		// 	allow:false,
		// 	data:""
		// },
		// insuranceBegin:{ // 保险开始日期
		// 	allow:true,
		// 	data:""
		// },
		// insuranceEnd:{ // 保险结束日期
		// 	allow:true,
		// 	data:""
		// },
		// transfersInfo:{ // 这个是接送信息
		// 	allow:true,
		// 	data:""
		// },
		attachmentList:{
			allow:true,
			data:[]
		}
	}
	function init() {
		// 初始化 dataAllow 数据
		for(var _cardperson in dataAllow){
			// 如果传进来的数据已经填写
			if (loaddata[_cardperson] != null) {
				// 那么赋值进去
				dataAllow[_cardperson].data = loaddata[_cardperson]
				// 如果这个数据必填 false
				if (dataAllow[_cardperson].allow == false) {
					dataAllow[_cardperson].allow = true;
				}
			}
		}
		// 初始化 time 选择器
		$('#landTime').pickatime({
			autoclose: false,
			twelvehour: false,
			default: '00:00:00'
		});
		$('#takeoffTime').pickatime({
			autoclose: false,
			twelvehour: false,
			default: '00:00:00'
		});
		$('#hLandTime').pickatime({
			autoclose: false,
			twelvehour: false,
			default: '00:00:00'
		});
		$('#hTakeoffTime').pickatime({
			autoclose: false,
			twelvehour: false,
			default: '00:00:00'
		});
		// 初始化新版 time 选择器
		$(".select-field").html(RenderingTime());

		// 绑定事件
		$("#_landTime select[name='hour']").change(function(event) {
			if (event.target.value == "null") {
				dataAllow.landTime.allow = false;
				$("#_landTime div").text('请选择正确的时间');
				return
			}
			if ($("#_landTime select[name='Minute']").val() == "null") {
				$("#_landTime select[name='Minute']").val("0");
			}
			var showdate = parseInt(event.target.value)*3600000 + parseInt($("#_landTime select[name='Minute']").val()) * 60000;
			dataAllow.landTime.data = showdate-28800000;
			$("#_landTime div").text('');
			dataAllow.landTime.allow = true;
		});
		$("#_landTime select[name='Minute']").change(function(event) {
			if (event.target.value == "null") {
				dataAllow.landTime.allow = false;
				$("#_landTime div").text('请选择正确的时间');
				return
			}
			if ($("#_landTime select[name='hour']").val() == "null") {
				$("#_landTime select[name='hour']").val("0");
			}
			var showdate = parseInt($("#_landTime select[name='hour']").val()) * 3600000 + parseInt(event.target.value) * 60000;
			dataAllow.landTime.data = showdate-28800000;
			$("#_landTime div").text('');
			dataAllow.landTime.allow = true;
		});

		$("#_hLandTime select[name='hour']").change(function(event) {
			if (event.target.value == "null") {
				dataAllow.hLandTime.allow = false;
				$("#_hLandTime div").text('请选择正确的时间');
				return
			}
			if ($("#_hLandTime select[name='Minute']").val() == "null") {
				$("#_hLandTime select[name='Minute']").val("0");
			}
			var showdate = parseInt(event.target.value)*3600000 + parseInt($("#_hLandTime select[name='Minute']").val()) * 60000;
			dataAllow.hLandTime.data = showdate-28800000;
			$("#_hLandTime div").text('');
			dataAllow.hLandTime.allow = true;
		});
		$("#_hLandTime select[name='Minute']").change(function(event) {
			if (event.target.value == "null") {
				dataAllow.hLandTime.allow = false;
				$("#_hLandTime div").text('请选择正确的时间');
				return
			}
			if ($("#_hLandTime select[name='hour']").val() == "null") {
				$("#_hLandTime select[name='hour']").val("0");
			}
			var showdate = parseInt($("#_hLandTime select[name='hour']").val()) * 3600000 + parseInt(event.target.value) * 60000;
			dataAllow.hLandTime.data = showdate-28800000;
			$("#_hLandTime div").text('');
			dataAllow.hLandTime.allow = true;
		});

		$("#_hTakeoffTime select[name='hour']").change(function(event) {
			if (event.target.value == "null") {
				dataAllow.hTakeoffTime.allow = false;
				$("#_hTakeoffTime div").text('请选择正确的时间');
				return
			}
			if ($("#_hTakeoffTime select[name='Minute']").val() == "null") {
				$("#_hTakeoffTime select[name='Minute']").val("0");
			}
			var showdate = parseInt(event.target.value)*3600000 + parseInt($("#_hTakeoffTime select[name='Minute']").val()) * 60000;
			dataAllow.hTakeoffTime.data = showdate-28800000;
			$("#_hTakeoffTime div").text('');
			dataAllow.hTakeoffTime.allow = true;
		});
		$("#_hTakeoffTime select[name='Minute']").change(function(event) {
			if (event.target.value == "null") {
				dataAllow.hTakeoffTime.allow = false;
				$("#_hTakeoffTime div").text('请选择正确的时间');
				return
			}
			if ($("#_hTakeoffTime select[name='hour']").val() == "null") {
				$("#_hTakeoffTime select[name='hour']").val("0");
			}
			var showdate = parseInt($("#_hTakeoffTime select[name='hour']").val()) * 3600000 + parseInt(event.target.value) * 60000;
			dataAllow.hTakeoffTime.data = showdate-28800000;
			$("#_hTakeoffTime div").text('');
			dataAllow.hTakeoffTime.allow = true;
		});

		$("#_takeoffTime select[name='hour']").change(function(event) {
			if (event.target.value == "null") {
				dataAllow.takeoffTime.allow = false;
				$("#_takeoffTime div").text('请选择正确的时间');
				return
			}
			if ($("#_takeoffTime select[name='Minute']").val() == "null") {
				$("#_takeoffTime select[name='Minute']").val("0");
			}
			var showdate = parseInt(event.target.value)*3600000 + parseInt($("#_takeoffTime select[name='Minute']").val()) * 60000;
			dataAllow.takeoffTime.data = showdate-28800000;
			$("#_takeoffTime div").text('');
			dataAllow.takeoffTime.allow = true;
		});
		$("#_takeoffTime select[name='Minute']").change(function(event) {
			if (event.target.value == "null") {
				dataAllow.takeoffTime.allow = false;
				$("#_takeoffTime div").text('请选择正确的时间');
				return
			}
			if ($("#_takeoffTime select[name='hour']").val() == "null") {
				$("#_takeoffTime select[name='hour']").val("0");
			}
			var showdate = parseInt($("#_takeoffTime select[name='hour']").val()) * 3600000 + parseInt(event.target.value) * 60000;
			dataAllow.takeoffTime.data = showdate-28800000;
			$("#_takeoffTime div").text('');
			dataAllow.takeoffTime.allow = true;
		});


		// 返回上一页
		$("#returnPageFirst").click(function(event) {
			// 隐藏这一页两个按钮
			$("#returnPageFirst").css('visibility', 'hidden');
			$("#toPageThird").css('display', 'none');
			// 显示上一页的一个按钮
			$("#toPageSecond").css('display', 'inline-block');
			// 跳转到上一页
    		$('ul.tabs').tabs('select_tab', 'test1');
		});
		// 进入下一页
		$("#toPageThird").click(function(event) {
			nextPage();
		})

		// 将数据 验证 并入主数据
		$("#signName").blur(function(event) {
			if (event.target.value.trim() == "" || event.target.value.trim() == null) {
				$("#signName").next().text("预定人姓名 不能为空");
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				dataAllow.signName.allow = false;
				return
			}
			$("#signName").next().text("")
			dataAllow.signName.data = event.target.value.trim();
			dataAllow.signName.allow = true;
		});
		$("#payAccount").blur(function(event) {
			dataAllow.payAccount.data = event.target.value.trim();
			dataAllow.payAccount.allow = true;
		});
		$("#BasicPhone").blur(function(event) {
			if (event.target.value == "" || event.target.value.trim() == null) {
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				$("#BasicPhone").next().text("不能为空");
				dataAllow.mobile.allow = false;
				return
			}else if ( !(/^[0-9]*$/.test(parseInt(event.target.value.trim()))) ) {
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				$("#BasicPhone").next().text("必须纯数字");
				dataAllow.mobile.allow = false;
				return
			}
			$("#BasicPhone").next().text("");
			dataAllow.mobile.data = event.target.value.trim();
			dataAllow.mobile.allow = true;
		});
		$("#BasicEmail").blur(function(event) {
			if (event.target.value.trim() == "" || event.target.value.trim() == null) {
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				$("#BasicEmail").next().text("不能为空");
				dataAllow.email.allow = false;
				return
			}
			if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(event.target.value.trim()))) {
				setTimeout(function(){
					event.target.setAttribute("class","validate invalid");
				},100);
				$("#BasicEmail").next().text("邮箱不正确");
				dataAllow.email.allow = false;
				return
			}
			$("#BasicEmail").next().text("");
			dataAllow.email.data = event.target.value.trim();
			dataAllow.email.allow = true;
		});
		// 国际航班号
		$("#outboundNum").blur(function(event) {
			dataAllow.outboundNum.data = event.target.value.trim();
			dataAllow.outboundNum.allow = true;
		})
		$("#landDate").change(function(event) {
			dataAllow.landDate.data = returnDatestamp(event.target.value.trim())
			dataAllow.landDate.allow = true;
		})
		// $("#landTime").change(function(event) {
		// 	dataAllow.landTime.data = Date.parse("Thu, 01 Jan 1970 "+event.target.value+":00");
		// 	dataAllow.landTime.allow = true;
		// })
		// 到港航班号
		$("#inboundNum").blur(function(event) {
			dataAllow.inboundNum.data = event.target.value.trim();
			dataAllow.inboundNum.allow = true;
		})
		$("#takeoffDate").change(function(event) {
			dataAllow.takeoffDate.data = returnDatestamp(event.target.value.trim())
			dataAllow.takeoffDate.allow = true;
		})
		// $("#takeoffTime").change(function(event) {
		// 	dataAllow.takeoffTime.data = Date.parse("Thu, 01 Jan 1970 "+event.target.value+":00");
		// 	dataAllow.takeoffTime.allow = true;
		// })
		// 国际航班号
		$("#inHarbourNum").blur(function(event) {
			dataAllow.inHarbourNum.data = event.target.value.trim();
			dataAllow.inHarbourNum.allow = true;
		})
		$("#hLandDate").change(function(event) {
			dataAllow.hLandDate.data = returnDatestamp(event.target.value.trim())
			dataAllow.hLandDate.allow = true;
		})
		// $("#hLandTime").change(function(event) {
		// 	dataAllow.hLandTime.data = Date.parse("Thu, 01 Jan 1970 "+event.target.value+":00");
		// 	dataAllow.hLandTime.allow = true;
		// })
		// 离港航班号
		$("#outHarbourNum").blur(function(event) {
			dataAllow.outHarbourNum.data = event.target.value.trim();
			dataAllow.outHarbourNum.allow = true;
		})
		$("#hTakeoffDate").change(function(event) {
			dataAllow.hTakeoffDate.data = returnDatestamp(event.target.value.trim())
			dataAllow.hTakeoffDate.allow = true;
		})
		// $("#hTakeoffTime").change(function(event) {
		// 	dataAllow.hTakeoffTime.data = Date.parse("Thu, 01 Jan 1970 "+event.target.value+":00");
		// 	dataAllow.hTakeoffTime.allow = true;
		// })
		$("#flightNote").change(function(event) {
			dataAllow.flightNote.data = event.target.value;
		})

		/**
		 * 初始化 添加附件信息模态框
		 */
		$('#openAnnex').click(function(event) {
			var file = document.getElementById("AnnexFile");
			file.outerHTML = file.outerHTML;
			$("#AnnexText").val("")
			$('#modalAnnex').openModal({
				dismissible: false
			});
		});
		$('#colseAnnex').click(function(event) {
			$('#modalAnnex').closeModal()
		});
		$('#UploadAnnex').click(function(event) {
			if ($("#selectAnnex").val() == null || $("#selectAnnex").val() == 'null') {
				Materialize.toast('你尚未选择证件类型', 4000)
				return
			}
			var AnnexFileList = document.getElementById("AnnexFile").files;
			if (AnnexFileList.length == 0) {
				Materialize.toast('你尚未选择任何文件', 4000)
				return
			}
			var AnnexFile = AnnexFileList[0]
			if ( AnnexFile.type != "image/jpeg" && AnnexFile.type != "image/png" && AnnexFile.type != "image/jpg" ) {
				Materialize.toast('请选择 jpg 或 png 格式的文件', 4000)
				return
			}
			var uploadForm = new FormData();
			uploadForm.append("attachFile", AnnexFile);
			$("#UploadAnnex").text('正在上传');
			// 上次新的
			if (loaddata.infoId == null || loaddata.infoId == '') {
				fetch(
					URLbase + URLversion + "/gather/attach/"+$("#selectAnnex").val()+"/add.do",{
					method: 'POST',
					headers: {
						token: localStorage.getItem('_token'),
						digest: localStorage.getItem('_digest')
					},
					body: uploadForm
				}).then(function(response) {
					return response.json()
				}).then(function(json) {
					dealwith(json);
				})
			// 覆盖原有的
			}else {
				fetch(
					URLbase + URLversion + "/gather/attach/"+$("#selectAnnex").val()+"/"+loaddata.infoId+"/add.do",{
					method: 'POST',
					headers: {
						token: localStorage.getItem('_token'),
						digest: localStorage.getItem('_digest')
					},
					body: uploadForm
				}).then(function(response) {
					return response.json()
				}).then(function(json) {
					dealwith(json);
				})
			}
			function dealwith(json) {
				if (json.result == "0") {
					var _data = dataAllow.attachmentList.data;
					var newArray = []
					for (var i = 0; i < _data.length; i++) {
						if (_data[i].attachId != null && _data[i].attachType != null && _data[i].attachThumb != null && _data[i].attachPath != null) {
							_data[i].infoId = loaddata.infoId;
							newArray.push(_data[i]);
						}
					}
					json.data.infoId = loaddata.infoId;
					newArray.push(json.data);
					dataAllow.attachmentList.data = newArray;
					renderAnnex();
					$('#modalAnnex').closeModal();
				}else {
					Materialize.toast('上传失败,原因:'+json.message, 4000);
				}
				$("#UploadAnnex").text('上传')
			}
		});
		// 渲染附件信息
		function renderAnnex() {
			var _data = dataAllow.attachmentList.data,
				_string = ""
			for (var i = 0; i < _data.length; i++) {
				if (_data[i].attachType == null) {return}
				if (_data[i].attachThumb == null) {return}
				_string += "<div class='theCar'><div>"//
					+(_data[i].attachType=='PT'?"机票":"结婚证")+"<span id='deleteAnnex"//
					+i+"' data-ID="//
					+_data[i].attachId+" data-Array="//
					+i+">X</span></div><img src='"//
					+URLbase + _data[i].attachThumb+"'></div>"
			}
			$("#annex").html(_string);
			for (var j = 0; j < _data.length; j++) {
				$("#deleteAnnex"+j).click(function(event) {
					var _confirm = confirm("确认要删除?");
					if (_confirm == true){
					}else{
						return
					}
					var _data = dataAllow.attachmentList.data
					$.ajax({ 
						type: "GET", 
						url: URLbase + URLversion + "/gather/attach/"+event.target.getAttribute('data-ID')+"/del.do", 
						contentType:"application/json; charset=utf-8",  
						headers: {
							'token':localStorage.getItem('_token'),
							'digest':localStorage.getItem('_digest')
						},
						success: function (message) {
							if (message.result == "0") {
								dataAllow.attachmentList.data.splice(parseInt(event.target.getAttribute('data-Array')),1)
								renderAnnex();
							}else {
							}
						}
					});
				});
			}
		}
		renderAnnex();
	}
	// 进入下一页
	function nextPage() {
		loding.show();
		// 进行判断是否可以下一页
		for(var _cardperson in dataAllow){
			if (dataAllow[_cardperson].allow == false) {
				if ( _cardperson == "signName" ) {
					Materialize.toast("预定人姓名为必填", 4000);
					$("#signName").next().text("必填");
					return
				}else if (_cardperson == "mobile" ) {
					Materialize.toast("预定人手机号码/电话为必填", 4000);
					$("#BasicPhone").next().text("有误");
					return
				}else if (_cardperson == "email" ) {
					Materialize.toast("预定人邮箱为必填", 4000);
					$("#BasicEmail").next().text("有误");
					return
				}
				return
			}
		}
		// 如果验证完毕 可以下一页，那么将数据并入主数据！
		for(var _cardperson2 in dataAllow){
			finaldata[_cardperson2] = dataAllow[_cardperson2].data
		}
		// 隐藏这一页两个按钮
		$("#returnPageFirst").css('visibility', 'hidden');
		$("#toPageThird").css('display', 'none');
		// 显示下一页的两个个按钮
		$("#returnPageSecond").css('display', 'inline-block');
		$("#toPageFourth").css('display', 'inline-block');
		// 跳转到下一页
		$('ul.tabs').tabs('select_tab', 'test3');
		if (_first == true) {
			$("#addTravelers1").trigger("click");
			$("#liveName").val(dataAllow.signName.data);
			$("#livePhone").val(dataAllow.mobile.data);
			$("#liveEmail").val(dataAllow.email.data);
			dataModal.chineseName.data = dataAllow.signName.data;
			dataModal.chineseName.allow  = true;
			dataModal.mobile.data = dataAllow.mobile.data;
			dataModal.mobile.allow = true;
			dataModal.email.data = dataAllow.email.data;
			dataModal.email.allow = true;
			$("#liveName").trigger("blur");
			$("#livePhone").trigger("blur");
			$("#liveEmail").trigger("blur");
			$("#liveName").trigger("click");
			$("#livePhone").trigger("click");
			$("#liveEmail").trigger("click");
		}
	}
	var obj = {
		init:function(){
			init();
		},
		data:dataAllow
	}
	return obj;
})();