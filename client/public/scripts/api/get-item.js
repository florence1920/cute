async function fetchItems() {
  try {
    const response = await fetch("/cute");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const items = await response.json();
    makeList(items); // makeList 함수 호출하여 HTML 생성
    console.log("fetch");
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

const itemRate = document.querySelectorAll(".item-head__rate li");
function fillRate(rate) {
  for (let i = 0; i < rate; i++) {
    const img = itemRate[i].querySelector("img");
    if (img) {
      img.src = "/images/heart-black-fill.png";
    }
  }
}

function resetImage() {
  itemRate.forEach((item) => {
    const imgEl = item.querySelector("img");
    if (imgEl) {
      imgEl.src = "/images/heart-black.png";
    }
  });
}

function makeList(items) {
  const itemList = document.querySelector(".item__list");

  itemList.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.dataset.itemId = item._id;

    li.innerHTML = `
      <p class="item-list__name">${item.name}</p>
      <p class="item-list__cate">${item.category}</p>
    `;

    li.addEventListener("mouseenter", () => {
      const selectedItem = document.querySelector(".item");
      selectedItem.querySelector(".item-head__img").src = item.picture;
      selectedItem.querySelector(".item-head__name").textContent = item.name;
      selectedItem.querySelector(".item-head__cate").textContent =
        item.category;
      resetImage();
      fillRate(item.rate);
      selectedItem.querySelector(".item__bottom > p").textContent =
        item.cutePoint;

      selectedItem.style.display = "block";
    });

    li.addEventListener("mouseleave", () => {
      const selectedItem = document.querySelector(".item");
      selectedItem.style.display = "none";
    });

    itemList.appendChild(li);
  });
}

window.addEventListener("load", fetchItems);

export { fetchItems };
