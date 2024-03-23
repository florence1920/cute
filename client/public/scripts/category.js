const active = document.querySelector(".active");
const category = document.querySelector(".category");

category.addEventListener("click", function (e) {
  const target = e.target.closest(".category__list");
  const isCategoryClosed = category.classList.contains("closed");
  const isActive = target.classList.contains("active");
  if ((isCategoryClosed && isActive) || (!isCategoryClosed && isActive)) {
    category.classList.toggle("closed");
  } else if (!isCategoryClosed && !isActive) {
    Array.from(target.parentNode.children).forEach((sibling) => {
      sibling.classList.remove("active");
    });
    target.classList.add("active");
    changeEl();
    category.classList.toggle("closed");
  }
});

const activeEl = `
      <div class="category-list--search">
        <p class="label">Search</p>
        <input type="text" placeholder="입력 후 ENTER" />
      </div>
      <div class="category-list--add">
        <p class="label">Add Cuteness</p>
        <button></button>
      </div>
    `;
const deactiveEl = `
      <span class="category-list--go material-symbols-outlined">
        arrow_right_alt
      </span>
    `;
const lists = document.querySelectorAll(".category__list");
function changeEl() {
  lists.forEach((list) => {
    const rightEl = list.querySelector(".category-list__right");
    if (list.classList.contains("active")) {
      rightEl.innerHTML = activeEl;
    } else {
      rightEl.innerHTML = deactiveEl;
    }
  });
}

const categoryListRightElements = document.querySelectorAll(
  ".category-list__right"
);

categoryListRightElements.forEach((element) => {
  element.addEventListener("click", function (event) {
    event.stopPropagation(); // 이벤트 전파 중지
  });
});
