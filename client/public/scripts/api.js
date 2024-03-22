// 카테고리 목록을 가져와서 HTML에 추가하는 함수
async function fetchCategories() {
  try {
    const response = await fetch("/user");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const categories = await response.json();
    const categoryList = document.getElementById("categoryList");
    categoryList.innerHTML = ""; // 기존 목록 초기화
    categories.forEach((category) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${category.title} - ${category.count}`;
      categoryList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// 새로운 카테고리를 추가하는 함수
async function addCategory(event) {
  event.preventDefault(); // 폼 제출 이벤트 기본 동작 방지
  const form = event.target;
  const formData = new FormData(form);
  const requestData = Object.fromEntries(formData.entries());
  try {
    const response = await fetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      throw new Error("Failed to add category");
    }
    form.reset(); // 폼 초기화
    fetchCategories(); // 업데이트된 카테고리 목록 다시 가져오기
  } catch (error) {
    console.error("Error adding category:", error);
  }
}

// 페이지 로드 시 카테고리 목록을 가져옴
window.addEventListener("load", fetchCategories);

// 폼 제출 이벤트 리스너 추가
const addCategoryForm = document.getElementById("addCategoryForm");
addCategoryForm.addEventListener("submit", addCategory);
