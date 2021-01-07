let page = document.querySelector(".page");

let profile = page.querySelector(".profile");
let nameProfile = page.querySelector(".profile__name");
let jobProfile = page.querySelector(".profile__job");

let edit = page.querySelector(".edit");
let nameInput = edit.querySelector(".edit__item_type_name");
let jobInput = edit.querySelector(".edit__item_type_job");

let person = {
  name: "Mike Izenhower",
  job: "Priest"
};

function openEditModal(){
  edit.classList.remove("edit_hidden");
}

function closeEditModal(){
  edit.classList.add("edit_hidden");
}

function setProfile(){
  nameProfile.innerHTML = nameInput.value;
  jobProfile.innerHTML = jobInput.value;

  closeEditModal();
}

function init(){

  let editButton = profile.querySelector(".profile__edit-button");
  let closeButton = edit.querySelector(".edit__close-button");
  let saveButton = edit.querySelector(".edit__save-button");

  editButton.addEventListener("click", openEditModal);
  closeButton.addEventListener("click", closeEditModal);
  saveButton.addEventListener("click", setProfile);

  nameInput.value = person.name;
  jobInput.value = person.job;

  setProfile();
}

init();
