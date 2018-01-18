import header from './../Component/Navigation-Bar/index.js';
import scrollTop from './../Component/ScrollTop/index.js';
import convertDate from './../../utils/convertDate.js';
 
$(document).ready(() => {
  header.init(2);
  scrollTop.init();

  video.init();
  myCarousel.init();
});

let video = {
  init() {
    if (flvjs.isSupported()) { // 如果支持 自动播放视频, 如果不支持则 放置图片
      let videoElement = document.getElementById('videoElement');
      let flvPlayer = flvjs.createPlayer({
        'type': 'flv',
        'url': './../dist/video/demo.flv',
        'hasAudio': false
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
    }
  }
}

let myCarousel = {
  'mataking': [
    { 'imgUrl': './static/3sheetsMataking/1.jpg' },
    { 'imgUrl': './static/3sheetsMataking/2.jpg' },
    { 'imgUrl': './static/3sheetsMataking/3.jpg' },
  ],
  'PompomIsland': [
    { 'imgUrl': './static/3sheetsPOMPOMIsland/1.jpg' },
    { 'imgUrl': './static/3sheetsPOMPOMIsland/2.jpg' },
    { 'imgUrl': './static/3sheetsPOMPOMIsland/3.jpg' },
  ],
  'lankayan': [
    { 'imgUrl': './static/3sheetsLankayan/1.jpg' },
    { 'imgUrl': './static/3sheetsLankayan/2.jpg' },
    { 'imgUrl': './static/3sheetsLankayan/3.jpg' },
  ],
  'Jesselton': [
    { 'imgUrl': './static/3sheetsJesselton/1.jpg' },
    { 'imgUrl': './static/3sheetsJesselton/2.jpg' },
    { 'imgUrl': './static/3sheetsJesselton/3.jpg' },
  ],

  init() {
    let mataking = new Carousel(this.mataking, '马达京婚拍', 0);
    mataking.render('carousel-mataking');

    let PompomIsland = new Carousel(this.PompomIsland, '邦邦岛婚拍', 1);
    PompomIsland.render('carousel-POMPOMIsland');

    let lankayan = new Carousel(this.lankayan, '兰卡央婚拍', 2);
    lankayan.render('carousel-lankayan');

    let Jesselton = new Carousel(this.Jesselton, '亚庇婚拍', 3);
    Jesselton.render('carousel-Jesselton');
  }
}

class Carousel {
  data = [
    // {
    //   'imgUrl': './../../dist/img/404.jpg'
    // }
  ];
  title;
  selectNum;
  constructor(data, title, selectNum) {
    this.data = data;
    this.title = title;
    this.selectNum = selectNum;
  }

  render(DOMname) {
    const _this = this;

    $(`#${DOMname}`).html([
      '<div class="carousel-inner" role="listbox">',
        this.data.map((val, key) => ([
          `<div class="item${ key === 0? ' active' : ''}">`,
            `<a href="./detail/index.html?selectNum=${_this.selectNum}">`,
              `<img src="${val.imgUrl}">`,
            '</a>',
          '</div>',
        ].join(''))).join(''),
      '</div>',

      `<a class="left carousel-control" href="#${DOMname}" role="button" data-slide="prev">`,
        '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>',
        '<span class="sr-only">Previous</span>',
      '</a>',
      `<a class="right carousel-control" href="#${DOMname}" role="button" data-slide="next">`,
        '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>',
        '<span class="sr-only">Next</span>',
      '</a>',
      `<div class="carousel-masking">${_this.title}</div>`
    ].join(''));
  }
}

// 工具类
let utilities = {
}
