import header from './../../Component/Navigation-Bar/index.js';
import scrollTop from './../../Component/ScrollTop/index.js';
 
$(document).ready(() => {
  header.init();
  scrollTop.init();

  carousel.init();
  main.init();
});

let carousel = {
  data: [
    { 'imgUrl': './../static/detail/1.jpg' },
  ],

  init() {
    this.render();
  },
  
  render() {
    const _this = this;

    $('#carousel').html([
      '<div class="carousel-inner" role="listbox">',
        this.data.map((val, key) => ([
          `<div class="item${ key === 0? ' active' : ''}">`,
            `<img src="${val.imgUrl}">`,
          '</div>',
        ].join(''))).join(''),
      '</div>',

      '<div class="carousel-masking">',
      '</div>',
      '<div class="carousel-detail">',
        '<div>',
          '<h1>潜游时光</h1>',
          '<p>婚纱旅拍 - 度假级拍摄享受</p>',
          '<a href="https://traveldetail.taobao.com/item.htm?spm=a1z10.3-c-s.w4002-15809980522.53.428e260b1PA5l6&id=558295505163&" target="_blank" class="carousel-btn">定制婚拍</a>',
          '</div>',
      '</div>'

    ].join(''));

    $('#carousel').carousel();
  }
}

let main = {
  'data': [
     [
      { 'imgUrl': './../static/3sheetsMataking/1.jpg' },
      { 'imgUrl': './../static/3sheetsMataking/2.jpg' },
      { 'imgUrl': './../static/3sheetsMataking/3.jpg' },
    ], [
      { 'imgUrl': './../static/3sheetsPOMPOMIsland/1.jpg' },
      { 'imgUrl': './../static/3sheetsPOMPOMIsland/2.jpg' },
      { 'imgUrl': './../static/3sheetsPOMPOMIsland/3.jpg' },
    ], [
      { 'imgUrl': './../static/3sheetsLankayan/1.jpg' },
      { 'imgUrl': './../static/3sheetsLankayan/2.jpg' },
      { 'imgUrl': './../static/3sheetsLankayan/3.jpg' },
    ], [
      { 'imgUrl': './../static/3sheetsJesselton/1.jpg' },
      { 'imgUrl': './../static/3sheetsJesselton/2.jpg' },
      { 'imgUrl': './../static/3sheetsJesselton/3.jpg' },
    ],
  ],
  'select': [
    { 'imgUrl': './../static/3sheetsMataking/1.jpg' },
    { 'imgUrl': './../static/3sheetsMataking/2.jpg' },
    { 'imgUrl': './../static/3sheetsMataking/3.jpg' },
  ],
  'selectNum': 0,

  init() {
    this.bindjQueryEvent();
    this.selectNum = utilities.loadPageVar('selectNum') ? parseInt(utilities.loadPageVar('selectNum')) : 0;
    
    this.select = this.data[this.selectNum];
    this.render();
  },

  render() {
    const _this = this;

    $('#select-destination div').toArray().map((val, key) => {
      key === _this.selectNum ?
        $(val).addClass('active') : 
        $(val).removeClass('active');
    });

    $('#main-render').html(
      this.select.map(val => [
        '<div class="img-content">',
          `<img src="${val.imgUrl}">`,
        '</div>'
      ].join('')).join('')
    )
  },

  bindjQueryEvent() {
    const _this = this;

    // 绑定目的地选择
    $('#select-destination div').toArray().map((val, key) => {
      $(val).click(function() {
        _this.selectNum = key;
        _this.select = _this.data[key];
        _this.render();
      });
    });

    // 将元素固定
    $(".content-pin").pin({
      'containerSelector': ".main-content",
      'padding': {top: 75}
    });

    // 显示侧边栏
    $('#main-content-contact-us').click(function(){
      $('#side-bar').animate({
        'right': '0'
      }, 70);
    });

    // 平滑返回顶部
    $('#main-content-scrollTop').click(function(){
      $.smoothScroll({
        'direction': 'top',
        'offset': 0
      });
    });
  }
}

// 工具类
var utilities = {
  loadPageVar: function(sVar) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }
}
