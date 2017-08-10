const time = {
  // Date 转换 xxxx-xx-xx 字符串
  dateToFormat:function(_data) {
    const year = _data.getFullYear();//获取完整的年份(4位,1970)

    let month = _data.getMonth()+1;//获取月份(0-11,0代表1月,用的时候记得加上1)

    if( month <= 9 ){
      month = "0"+month;
    }

    let date = _data.getDate();//获取日(1-31)

    if( date <= 9 ){
      date = "0"+date;
    }

    return year+"-"+month+"-"+date;
  },
  // Timestamp 转换 xxxx-xx-xx 字符串
  stampToFormat:function(stamp) {
    let _data = new Date(stamp);

    //获取四位数字返回年份。
    const year = _data.getFullYear();

    //获取月份 (0 ~ 11)。
    let month = _data.getMonth() + 1;
    if( month <= 9 ){
      month = "0"+month;
    }

    //获取一个月中的某一天 (1 ~ 31)。
    let date = _data.getDate();
    if( date <= 9 ){
      date = "0"+date;
    }

    return year+"-"+month+"-"+date;
  },
  // Date 转换 YYYY-MM-DD HH:mm
  dateToMoment:function(_data) {

    //获取四位数字返回年份。
    const year = _data.getFullYear();

    //获取月份 (0 ~ 11)。
    let month = _data.getMonth()+1;

    //获取一个月中的某一天 (1 ~ 31)。
    let date = _data.getDate();

    //获小时 (0 ~ 23)。
    let hours = _data.getHours();

    //获分钟 (0 ~ 59)
    let minutes = _data.getMinutes();

    return year + "-" + month + "-" + date + " " + hours + ":" + minutes;
  }
}


export default time