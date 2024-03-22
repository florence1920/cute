import { fetchItems } from "./get-item";
// 부모 요소인 .item__list에 클릭 이벤트를 추가합니다.
document
  .querySelector(".item__list")
  .addEventListener("click", async (event) => {
    // 클릭된 요소가 li 요소인지 확인합니다.
    const li = event.target.closest("li");
    if (li) {
      const itemId = li.dataset.itemId;
      try {
        // 해당 아이템의 정보를 가져오기 위해 서버에 GET 요청을 보냅니다.
        const response = await fetch(`/cute/${itemId}`);

        if (response.ok) {
          // 서버에서 받은 데이터를 JSON으로 파싱합니다.
          const data = await response.json();
          // 받은 데이터를 사용하여 다이얼로그를 엽니다.
          openDialog(data, itemId);
        } else {
          throw new Error("Failed to fetch item information");
        }
      } catch (error) {
        console.error("Error fetching item information:", error);
        alert("Failed to fetch item information. Please try again.");
      }
    }
  });

const dialog = document.querySelector(".modal--update");
// 다이얼로그를 열기 위한 함수입니다.
function openDialog(data, itemId) {
  // 받아온 데이터를 이용하여 요소에 채웁니다.
  dialog.dataset.itemId = itemId;
  const imgInput = dialog.querySelector(".preview");
  const nameInput = dialog.querySelector('input[name="name"]');
  const categorySelect = dialog.querySelector(".select-dropdown__button");
  const cateButtonText = document.querySelector(
    ".modal--update .select-dropdown__button span"
  );
  const cutePointTextarea = dialog.querySelector('textarea[name="cutePoint"]');

  // 데이터를 요소에 채웁니다.
  imgInput.src = data.picture;

  nameInput.value = data.name;

  categorySelect.setAttribute("data-value", data.category); // 예시 데이터에 따라서 category가 어디에 있는지 정확히 지정해주세요.
  cateButtonText.textContent = data.category;
  cateButtonText.style.color = "#fff";

  resetImage();
  fillHeart(data.rate);

  cutePointTextarea.value = data.cutePoint;

  dialog.showModal();
  document.body.classList.add("modal-open");
}

dialog.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
});

dialog.addEventListener("click", function (event) {
  const target = event.target;
  const rect = target.getBoundingClientRect();
  if (
    rect.left > event.clientX ||
    rect.right < event.clientX ||
    rect.top > event.clientY ||
    rect.bottom < event.clientY
  ) {
    dialog.close();
  }
});

const rateItems = document.querySelectorAll(
  ".modal--update .modal__rateWrap li"
);
const rate = document.querySelector(".modal--update .modal__rateWrap");
rateItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    resetImage();
    let score = index + 1;
    fillHeart(score);
    rate.setAttribute("data-value", score);
  });
});
function fillHeart(score) {
  for (let i = 0; i < score; i++) {
    const img = rateItems[i].querySelector("img");
    if (img) {
      img.src = "/images/heart-fill.png";
    }
  }
}
function resetImage() {
  rateItems.forEach((item) => {
    const imgEl = item.querySelector("img");
    if (imgEl) {
      imgEl.src = "/images/heart.png";
    }
  });
}

const fileInput = document.getElementById("file-update");

fileInput.addEventListener("click", function (event) {
  event.stopPropagation(); // 이벤트 버블링을 중단하여 모달이 닫히는 것을 방지합니다.
});

const uploadNameInput = document.querySelector(".modal--update .upload");
const imagePreview = document.querySelector(".modal--update .preview");

fileInput.addEventListener("change", function () {
  console.log("click");
  const fileName = fileInput.value.split("\\").pop(); // 파일 경로에서 파일 이름만 추출
  uploadNameInput.value = fileName;
  // 미리보기
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (event) {
      imagePreview.src = event.target.result;
    };

    reader.readAsDataURL(file);
  } else {
    imagePreview.src = "/images/cat.png";
  }
});

const updateForm = document.getElementById("update-form");

updateForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // 기본 동작(페이지 새로고침) 방지
  const scrollPosition = window.scrollY; // 폼 제출 전의 스크롤 위치 저장
  try {
    const formData = new FormData(updateForm); // 폼 데이터 생성

    // 클라이언트에서 받은 아이템의 ID
    const itemId = dialog.dataset.itemId.toString();
    // 서버에 PUT 요청을 보냅니다.
    // select 값
    const category = document
      .querySelector("#update-form .select-dropdown__button")
      .getAttribute("data-value");
    formData.append("category", category);
    const rateValue = rate.getAttribute("data-value");
    if (rateValue) {
      formData.append("rate", rateValue);
    }
    const response = await fetch(`/cute/${itemId}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      // 수정이 성공했을 경우
      console.log("Item updated successfully");
      // 여기에 추가적으로 할 일을 작성합니다.
      window.scrollTo(0, scrollPosition);
      dialog.close();
      fetchItems();
    } else {
      throw new Error("Failed to update item");
    }
  } catch (error) {
    console.error("Error updating item:", error);
    alert("Failed to update item. Please try again.");
  }
});
