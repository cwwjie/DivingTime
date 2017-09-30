window.onload = function() {
  if ( versionSupport.check() === false ) { return }

  // 表示是测试状态
  if (myData.data === null) {

  } else {
    myData.get()
      .then(
        function(response) {
          return response.json()
        },function(error) {
          alert('加载数据错误, 错误代码: ' + error);
        }
      )
      .then(function(json) {
        if (json.result === '0') {
          myData.data = myData.dealwith(json.data);
        }else {
          alert('加载数据失败, 原因: ' + json.message);
        }
      })
  }
}
