import { fetchItems } from "./get-item";
document
  .querySelector(".item__list")
  .addEventListener("click", async (event) => {
    const li = event.target.closest("li");
    if (li) {
      const itemId = li.dataset.itemId;
      try {
        const response = await fetch(`/cute/${itemId}`);

        if (response.ok) {
          const data = await response.json();
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
function openDialog(data, itemId) {
  dialog.dataset.itemId = itemId;
  const imgInput = dialog.querySelector(".preview");
  const nameInput = dialog.querySelector('input[name="name"]');
  const categorySelect = dialog.querySelector(".select-dropdown__button");
  const cateButtonText = document.querySelector(
    ".modal--update .select-dropdown__button span"
  );
  const cutePointTextarea = dialog.querySelector('textarea[name="cutePoint"]');

  imgInput.src = data.picture;

  nameInput.value = data.name;

  categorySelect.setAttribute("data-value", data.category);
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
  event.stopPropagation();
});

const uploadNameInput = document.querySelector(".modal--update .upload");
const imagePreview = document.querySelector(".modal--update .preview");

fileInput.addEventListener("change", function () {
  console.log("click");
  const fileName = fileInput.value.split("\\").pop();
  uploadNameInput.value = fileName;
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
  event.preventDefault();
  const scrollPosition = window.scrollY;
  try {
    const formData = new FormData(updateForm);

    const itemId = dialog.dataset.itemId.toString();
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
      console.log("Item updated successfully");
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
