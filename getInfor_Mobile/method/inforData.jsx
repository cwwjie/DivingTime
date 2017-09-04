const inforData = {
	save:function(finaldata) {
		var tempData = {};
		tempData.time = Date.parse(new Date());
		tempData.data = finaldata;
		localStorage.setItem("Final_DATA", JSON.stringify(tempData));
	},
	get:function() {
		var timeNow = Date.parse(new Date()),
			mydataString = localStorage.getItem("Final_DATA");
		// 如果数据不存在
		if (!mydataString) {
			return false;
		}
		var mydata = JSON.parse(mydataString),
			dataTime = parseInt(mydata.time);
		// 如果数据超时
		if ( timeNow > (dataTime + 3600000) ) {
			this.clear();
			return false;
		}else {
			return mydata.data;
		}
	},
	clear:function() {
		localStorage.setItem("Final_DATA","");
	}
}
export default inforData;