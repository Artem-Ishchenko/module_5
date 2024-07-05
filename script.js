/* Данный обработчик убирает слайдер, когда расширение экрана становится 
больше заданного, а также возвращает его при уменьшении*/

window.addEventListener('DOMContentLoaded', () => {

    const resizableSwiper = (breakpoint, swiperClass, swiperSettings) => {
      let swiper;
  
      breakpoint = window.matchMedia(breakpoint);
  
      const enableSwiper = function(className, settings) {
        swiper = new Swiper(className, settings);
      }
  
      const checker = function() {
        if (breakpoint.matches) {
          return enableSwiper(swiperClass, swiperSettings);
        } else {
          if (swiper !== undefined) swiper.destroy(true, true);
          changFlex(point);
          return;
        }
      };
  
      breakpoint.addEventListener('change', checker);
      checker();
    }
  
    resizableSwiper(
      '(max-width: 767px)',
      '.image-slider',
      {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        slidesPerView: 'auto',   
        dynamicMainBullets: 10,    
      }
    );
  });


let btnCardAll = document.querySelector('.block-repair__button-next');
let listSlidesAll = document.querySelectorAll('.image-slider__slide');
let point = listSlidesAll.length;
let activeText = document.querySelectorAll('.block-repair__text'); 
let decoratedButton = document.querySelector('.block-repair__arrow');

let changFlex = function (point) {
  for(let i = 0; i < listSlidesAll.length; i++) {
    listSlidesAll[i].style.display = 'flex';
  }
  if (point !== listSlidesAll.length){
    for(let i = 0; (point + i) < listSlidesAll.length; i++) {
      listSlidesAll[point + i].style.display = 'none';
      if (btnCardAll.classList.contains('activeAll')) {
        listSlidesAll[point + i].style.display = 'flex';
      }
    }
}
};

let widthWindow = function() {
  if (window.innerWidth < 768) {
    point = listSlidesAll.length; 
    changFlex(point);
  } 
  else if ((window.innerWidth >= 768) && (window.innerWidth < 1120)) {
    point = 6; 
    changFlex(point);
  }
  else if ((window.innerWidth >= 1120) && (window.innerWidth < 1664)) {
    point = 8;
    changFlex(point);
  }
  else {
    point = listSlidesAll.length;
    changFlex(point);
  }
  return point;
}

btnCardAll.addEventListener('click', function () {
  if (btnCardAll.classList.contains('activeAll')) {
    btnCardAll.classList.remove('activeAll');
    changFlex(point);
  }
  else {
    btnCardAll.classList.add('activeAll');
    changFlex(point);
  }

  for (let item of activeText) {
    if (item.classList.contains('disable')) {
      item.classList.remove('disable');
      decoratedButton.style.transform = 'rotateX(180deg)'; 
    }
    else {
      item.classList.add('disable');
      decoratedButton.style.transform = 'rotateX(0deg)';
    }
  }
})

widthWindow();
window.addEventListener('resize', () => widthWindow(), true);














