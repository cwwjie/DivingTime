 // 方法 - 获取时间返回201x-xx-xx
function returnDate(date) {
  if (date == null) {
    return ""
  }
  var newdate = new Date(date),
    thisString = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
  return thisString
}
function testDataNull(data) {
	if (data == null) {
		return "未填写"
	}else {
		return data
	}
}