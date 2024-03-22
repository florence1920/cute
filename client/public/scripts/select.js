document
  .querySelectorAll(".select-dropdown__button")
  .forEach(function (button) {
    button.addEventListener("click", function () {
      const list = this.nextElementSibling; // 클릭된 버튼 다음에 오는 .select-dropdown__list를 찾습니다.
      list.classList.toggle("active");
    });
  });

document
  .querySelectorAll(".select-dropdown__list-item")
  .forEach(function (item) {
    item.addEventListener("click", function () {
      const itemValue = this.getAttribute("data-value");
      const buttonText = this.closest(".select-dropdown").querySelector(
        ".select-dropdown__button"
      ); // 클릭된 .select-dropdown__list-item의 부모 요소에서 가장 가까운 .select-dropdown 안의 .select-dropdown__button을 찾습니다.
      buttonText.style.color = "#fff";
      buttonText.querySelector("span").textContent = this.textContent;
      buttonText.setAttribute("data-value", itemValue);
      this.closest(".select-dropdown__list").classList.toggle("active"); // 클릭된 .select-dropdown__list-item의 부모 요소에서 가장 가까운 .select-dropdown__list를 찾아서 active 클래스를 토글합니다.
    });
  });
