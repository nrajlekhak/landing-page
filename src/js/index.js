let pb = document.querySelector('.progress-bar-overlay');
let imgs = document.querySelectorAll('.cs-slider .slide');
let active = 0;
let progressLen = 1429;
let per = Math.round(progressLen/imgs.length)
let slot = Math.round(100 / imgs.length);
let count = 0;
var interval;
var autoTimer;
let auto = true;



var bufferFn = debounce(mainLogic,400);

window.addEventListener('mousewheel', bufferFn);


function startProgress() {
  interval = setInterval(() => {
    progressBar(count);
      count++;
  }, 125);
}

  
function progressBar(percent) {
  if (percent > progressLen) {
    count = 0;
    clearInterval(interval);
    changeSlide(0);
    startProgress(); 
  } else {
    if (percent % per == 0) {
      if (auto) {
        cent = Math.ceil(parseFloat(pb.style.width.replace('%',''))||0);
        changeSlide(cent);      
      }
    }
    pb.style.width = parseInt(percent)*0.07 + '%';
  }
}


function changeSlide(centScroll) {
  imgs.forEach(img => {
    if (img.classList.contains('hidden')) {
      
    } else {
      img.classList.add('hidden');
    }
  });
  let index = Math.floor(centScroll / slot);
  if (index >= imgs.length) index = 0;
  
  imgs[index].classList.remove('hidden');
}



function mainLogic(e) {
  auto = false;
  clearTimeout(autoTimer);
  let delta = e.wheelDelta;
  let n = Math.round((count / progressLen)*100);
    if (delta > 0) {
      if (count < per) {
        count = per * (imgs.length -1);
        n = slot * (imgs.length - 1);
        console.log(n, count,'loop');        
      } else {
        count = (Math.floor((n - slot) / slot))*per; 
        n = n - slot;
      }
      console.log(n, count,'prev');
      changeSlide(n);
      
    } else if (delta < 0) {
      count = (Math.floor((n+slot) / slot))*per;    
      console.log(n+slot, count, 'next');
      changeSlide(n+slot);    
    }
}


function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

startProgress();

autoTimer = setTimeout(() => {
  auto = true;
}, 10000);