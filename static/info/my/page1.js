/**
 * 第一页
 */
var pageFirst = (function(){
	function init() {
		// 点击已经阅读以上条款
		$("#Terms").click(function(event) {
			if ($("#Terms").is(':checked')) {
				// 如果已经选中
				finaldata.isRead = "Y"
			}else {
				// 如果未选中
				finaldata.isRead = "N"
			}
		});
		// 点击下一页
		$("#toPageSecond").click(function(event) {
			nextPage();
		});
	}
	// 点击下一步
	function nextPage() {
		loding.show();
		if (!($("#Terms").is(':checked'))) {
			myToast('请仔细阅读条款');
			return
		}
		// 隐藏这一页按钮
		$("#toPageSecond").css('display', 'none');
		// 显示下一页按钮
		$("#returnPageFirst").css('visibility', 'visible');
		$("#returnPageFirst").css('display', 'inline-block');
		$("#toPageThird").css('display', 'inline-block');
		// 跳转到下一页
    	$('ul.tabs').tabs('select_tab', 'test2');
	}
	var obj = {
		init:function(){
			init();
		}
	}
	return obj;
})();