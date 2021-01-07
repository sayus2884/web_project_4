let page = document.querySelector(".page");
let edit = page.querySelector(".edit");
let editButton = page.querySelector(".profile__edit-button");
let closeButton = page.querySelector(".edit__close");

function openEditModal(){
  edit.classList.remove("edit_hidden");
}

function closeEditModal(){
  edit.classList.add("edit_hidden");
}

editButton.addEventListener("click", openEditModal);
closeButton.addEventListener("click", closeEditModal);
