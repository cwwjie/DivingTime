import header from './../../Component/Navigation-Bar/index.js';
import scrollTop from './../../Component/ScrollTop/index.js';
 
$(document).ready(() => {
  header.init();
  scrollTop.init();

});

// 工具类
var utilities = {
  loadPageVar: function(sVar) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }
}
