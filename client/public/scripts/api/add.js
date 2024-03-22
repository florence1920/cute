import { fetchItems } from "./get-item";
// 모달
const dialog = document.querySelector(".modal--add");
const addBtn = document.querySelector(".category-list--add");
const categoryListRightElements = document.querySelectorAll(
  ".category-list__right"
);
//동적 처리.... 상위요소를 선택해서
categoryListRightElements.forEach((element) => {
  element.addEventListener("click", function (event) {
    if (event.target.closest(".category-list--add")) {
      dialog.showModal();
      document.body.classList.add("modal-open");
    }
  });
});
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

const fileInput = document.getElementById("file-add");
fileInput.addEventListener("click", function (event) {
  event.stopPropagation(); // 이벤트 버블링을 중단하여 모달이 닫히는 것을 방지합니다.
});

const uploadNameInput = document.querySelector(".upload");
const imagePreview = document.querySelector(".preview");

fileInput.addEventListener("change", function () {
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

// 점수
const rateItems = document.querySelectorAll(".modal__rateWrap li");
const rate = document.querySelector(".modal__rateWrap");

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

// form 전송
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".modal form");
  const scrollPosition = window.scrollY; // 폼 제출 전의 스크롤 위치 저장

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // 폼 기본 제출 동작 방지
    if (!validateForm(form)) return; // 유효성 검사
    // 폼 데이터 생성
    const formData = new FormData(form);
    // select 값
    const category = document
      .querySelector(".select-dropdown__button")
      .getAttribute("data-value");
    formData.append("category", category);
    const rateValue = rate.getAttribute("data-value");
    formData.append("rate", rateValue);
    // const requestData = Object.fromEntries(formData.entries());
    // console.log("form" + Object.fromEntries(formData.entries()));
    try {
      // 서버로 POST 요청 전송
      const response = await fetch("/cute", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // const data = await response.json();
        window.scrollTo(0, scrollPosition);
        dialog.close();
        form.reset();
        imagePreview.src = "/images/cat.png"; // 미리보기 이미지 초기화
        resetImage(); // 점수 초기화
        fetchItems();
      } else {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save data. Please try again.");
    }
  });
});

function validateForm(form) {
  // Picture 필드 유효성 검사
  const fileInput = form.querySelector("input[name='picture']");
  const selectedFile = fileInput.files[0];

  if (!selectedFile) {
    alert("파일을 첨부해주세요.");
    return false;
  }

  // 이름 필드 유효성 검사
  const nameInput = form.querySelector("input[name='name']");
  const nameValue = nameInput.value.trim();

  if (nameValue === "") {
    alert("이름을 입력해주세요.");
    return false;
  }

  // Category 필드 유효성 검사
  const categoryButton = form.querySelector(".select-dropdown__button");
  const selectedCategory = categoryButton.getAttribute("data-value");

  if (!selectedCategory) {
    alert("카테고리를 선택해주세요.");
    return false;
  }

  // 점수 필드 유효성 검사
  const rateValue = rate.getAttribute("data-value");
  if (!rateValue) {
    alert("점수를 선택해주세요.");
    return false;
  }

  // Cute Point 필드 유효성 검사
  const cutePointInput = form.querySelector("textarea[name='cutePoint']");
  const cutePointValue = cutePointInput.value.trim(); // 입력 값에서 공백 제거

  if (cutePointValue === "") {
    alert("설명 부분을 입력해주세요");
    return false;
  }

  return true;
}
