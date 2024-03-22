import { fetchItems } from "./get-item";
// 삭제 버튼 요소를 가져옵니다.
const deleteButton = document.querySelector(".modal--update .delete");
const dialog = document.querySelector(".modal--update");
// 삭제 버튼을 클릭할 때 DELETE 요청을 보내는 함수를 정의합니다.
async function deleteItem(itemId) {
  try {
    // 서버에 DELETE 요청을 보냅니다.
    const response = await fetch(`/cute/${itemId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Item deleted successfully");
      dialog.close();
      fetchItems();
    } else {
      throw new Error("Failed to delete item");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    alert("Failed to delete item. Please try again.");
  }
}

// 삭제 버튼을 클릭할 때 deleteItem 함수를 호출합니다.
deleteButton.addEventListener("click", async () => {
  const itemId = dialog.dataset.itemId.toString();
  console.log(itemId);
  await deleteItem(itemId);
});
