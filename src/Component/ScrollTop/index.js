export default {
  init() {
    this.scrollTop();
    this.siderBar();
  },

  siderBar() {
    let myclientWidth = document.body.clientWidth;

    $('#showSidebar').click(function(){
      $('#side-bar').animate({
        'right': '0'
      }, 70);
    });

    $("#closeSidebar").click(function(){
      $('#side-bar').animate({'right': '-330px'}, 70);
    });
  },

  scrollTop() {
    let scrollTopTimer = null,
        isshowScrollIcon = false,
        scrollTopNumber;
    
    window.onscroll= () => {
      scrollTopNumber = document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollTopNumber > 600) {
        if (isshowScrollIcon == false) {
          isshowScrollIcon = true;
          $('#scroll-icon-top').css('visibility', 'visible');
          $('#scroll-icon-top').animate({
            'opacity': ' 1'
          }, 500);
        }

      } else if (scrollTopNumber < 600) {
        if (isshowScrollIcon == true) {
          isshowScrollIcon = false;

          $('#scroll-icon-top').animate({
            'opacity': '0'
          }, 500);

          setTimeout(() => {
            $('#scroll-icon-top').css('visibility', 'hidden');
          }, 500);
        }
      }

      return scrollTopNumber;
    }

    $('#scroll-icon-top').click(() => {
      clearInterval(scrollTopTimer);

      scrollTopTimer = setInterval(() => {

        let nowScroll = scrollTopNumber;
        let speed= ( 0 - nowScroll ) / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if(scrollTopNumber <= 10){
          clearInterval(scrollTopTimer);
        }
        document.documentElement.scrollTop = scrollTopNumber + speed;
        document.body.scrollTop = scrollTopNumber + speed;
      }, 10);

    });
  }
}
