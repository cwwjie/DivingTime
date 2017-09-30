// 判断浏览器是否支持方法
var versionSupport = {
  checkIEversion:function() {
    function isIE(ver) {
      var b = document.createElement('b')
      b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
      return b.getElementsByTagName('i').length === 1
    }
    if (isIE(6) || isIE(7) || isIE(8)) {
      return false
    }else {
      return true
    }
  },
  checkLocalStorage:function() {
    var testKey = 'test',
      storage = window.localStorage;
    try {
      storage.setItem(testKey, 'testValue');
      storage.removeItem(testKey);
      return true
    } catch (error) {
      return false
    }
  },
  check:function() {
    if (this.checkIEversion() === false) {
      alert('因为IE8（及以下）由于存在安全风险，已被本站禁止，请升级到IE11或使用Chrome浏览器。')
      return false
    }
    if ( !this.checkLocalStorage() ) {
      alert('非常抱歉，暂不支持此浏览器，请更换您的浏览器或联系客服。');
      return false
    }
    return true
  }
}