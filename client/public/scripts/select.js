document
  .querySelectorAll(".select-dropdown__button")
  .forEach(function (button) {
    button.addEventListener("click", function () {
      const list = this.nextElementSibling;
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
      );
      buttonText.style.color = "#fff";
      buttonText.querySelector("span").textContent = this.textContent;
      buttonText.setAttribute("data-value", itemValue);
      this.closest(".select-dropdown__list").classList.toggle("active");
    });
  });
