import {throttle} from 'lodash';

const videoWrap = document.querySelector('.header__videoWrap');
const cover = document.querySelector('.header__videoWrap img');
let ticking = false;

let fixedPosition = null;

function moveImage(){
  let top = window.scrollY/2;
  cover.style.top = `-${top}px`;
  // if (window.scrollY >= 1300) {
  //   if (fixedPosition === null) {
  //     // 1300 이상일 때 한 번만 계산하고 그 값을 고정
  //     fixedPosition = window.scrollY + window.innerHeight - videoWrap.clientHeight;
  //   }
  //   videoWrap.style.position = 'absolute';
  //   videoWrap.style.top = `${fixedPosition}px`; // 고정 위치 값으로 설정
  // } else {
  //   // 1300 이하일 때 원래대로 동작
  //   videoWrap.style.position = 'fixed';
  //   videoWrap.style.top = '50%';
  //   // 스크롤이 1300 이하로 내려갈 때마다 fixedPosition 초기화
  //   fixedPosition = null;
  // }
}

function update() {
  moveImage();
  ticking = false;
}

// 부드럽게 해준다는데 이해 못하고 일단 씀
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(update);
    ticking = true;
  }
}

const t_moveImage = throttle(requestTick,100);

window.addEventListener('scroll', t_moveImage)


