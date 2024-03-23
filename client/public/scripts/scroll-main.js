import { throttle } from "lodash";

const videoWrap = document.querySelector(".header__videoWrap");
const cover = document.querySelector(".header__videoWrap img");
let ticking = false;

let fixedPosition = null;

function moveImage() {
  let top = window.scrollY / 2;
  cover.style.top = `-${top}px`;
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

const t_moveImage = throttle(requestTick, 100);

window.addEventListener("scroll", t_moveImage);
