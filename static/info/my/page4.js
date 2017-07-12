
/**
 * 新增特别注意页面
 */
var pageEspecially = (function(){
	function init() {
		// 下一页 nextPage
		$("#toPageFives").click(function(event) {
			nextPage();
		});
		$("#returnPageThird").click(function(event) {
			$('ul.tabs').tabs('select_tab', 'test3');
			// 隐藏这一页按钮
			$("#returnPageThird").css('display', 'none');
			$("#toPageFives").css('display', 'none');
			// 显示上一页按钮
			$("#returnPageSecond").css('visibility', 'visible');
			$("#returnPageSecond").css('display', 'inline-block');
			$("#toPageFourth").css('display', 'inline-block');
		});
	}
	// 点击下一步
	function nextPage() {
	// 隐藏这一页两个按钮
	$("#returnPageThird").css('display', 'none');
	$("#toPageFives").css('display', 'none');
		// 跳转到下一页，并且提交数据
		$('ul.tabs').tabs('select_tab', 'test5');
		pageFourth.init();
	}
	var obj = {
		init:function(){
			init();
		}
	}
	return obj;
})();