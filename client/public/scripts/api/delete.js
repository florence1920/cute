import { fetchItems } from "./get-item";
const deleteButton = document.querySelector(".modal--update .delete");
const dialog = document.querySelector(".modal--update");
async function deleteItem(itemId) {
  try {
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

deleteButton.addEventListener("click", async () => {
  const itemId = dialog.dataset.itemId.toString();
  console.log(itemId);
  await deleteItem(itemId);
});
