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
  const itemList = document.querySelector(".item__list"); // item__list 요소 선택

  // itemList 내용 초기화
  itemList.innerHTML = "";

  // items 배열 순회하면서 각각의 아이템에 대한 HTML 생성
  items.forEach((item) => {
    const li = document.createElement("li"); // 새로운 <li> 요소 생성
    li.dataset.itemId = item._id;

    // <li> 내부 HTML 생성
    li.innerHTML = `
      <p class="item-list__name">${item.name}</p>
      <p class="item-list__cate">${item.category}</p>
    `;

    // 마우스 이벤트 추가
    li.addEventListener("mouseenter", () => {
      // 선택된 아이템 표시 요소 선택
      const selectedItem = document.querySelector(".item");
      selectedItem.querySelector(".item-head__img").src = item.picture;
      // 선택된 아이템 내부 요소에 정보 채우기
      selectedItem.querySelector(".item-head__name").textContent = item.name;
      selectedItem.querySelector(".item-head__cate").textContent =
        item.category;
      resetImage();
      fillRate(item.rate);
      selectedItem.querySelector(".item__bottom > p").textContent =
        item.cutePoint;

      // 선택된 아이템 표시
      selectedItem.style.display = "block";
    });

    // 마우스가 <li>를 벗어나면 선택된 아이템 숨기기
    li.addEventListener("mouseleave", () => {
      const selectedItem = document.querySelector(".item");
      selectedItem.style.display = "none";
    });

    itemList.appendChild(li); // 생성한 <li>를 itemList에 추가
  });
}

// 페이지 로드 시 카테고리 목록을 가져오고 이미지 표시 함수 호출
window.addEventListener("load", fetchItems);

export { fetchItems };
