let pb = document.querySelector('.progress-bar-overlay');
let imgs = document.querySelectorAll('.cs-slider .slide');
let slot = Math.round(100 / imgs.length);
let active = 0;


window.scrollTo(0, 0);
  
  
  window.addEventListener('scroll', function (e) {
    pb.style.width = getScrollPercent() + '%';
    if (parseInt(getScrollPercent()) % slot == 0) {
      centScroll = getScrollPercent();
      changeSlide(centScroll);
    }
  });




function changeSlide(centScroll) {
  imgs.forEach(img => {
    if (img.classList.contains('hidden')) {
      
    } else {
      img.classList.add('hidden');
    }
  });
  let index = Math.floor(centScroll / slot) % imgs.length;
  
  imgs[index].classList.remove('hidden');
}


function getScrollPercent() {
  var h = document.documentElement, 
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
  return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

function pageScroll() {
  window.scrollBy(0, 1);
  scrolldelay = setTimeout(pageScroll, 50);
  if (getScrollPercent() >= 100) {
    window.scrollTo(0,0);
  }
}

setTimeout(() => {
  pageScroll();
}, 2000);


