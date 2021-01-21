let profileContainer = document.querySelector(".profile");
let nameProfile = profileContainer.querySelector(".profile__name");
let jobProfile = profileContainer.querySelector(".profile__job");

let placesContainer = document.querySelector(".places");

let editModal = document.querySelector("#modal__edit");
let nameInput = editModal.querySelector(".modal__item_type_name");
let jobInput = editModal.querySelector(".modal__item_type_job");

let addModal = document.querySelector("#modal__add");
let titleInput = addModal.querySelector(".modal__item_type_title");
let urlInput = addModal.querySelector(".modal__item_type_url");

const initialCards = [
  {
    title: "Yosemite Valley",
    url: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    title: "Lake Louise",
    url: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    title: "Bald Mountains",
    url: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    title: "Latemar",
    url: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    title: "Vanoise National Park",
    url: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    title: "Lago di Braies",
    url: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

function setProfile(data){
  nameProfile.textContent = data.name;
  jobProfile.textContent = data.job;
}

function createCard({ title, url }){
  const gridElement = placesContainer.querySelector(".places__grid");

  const cardTemplate = document.querySelector("#place_card").content;
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector(".places__image");
  const titleElement = cardElement.querySelector(".places__title");
  const heartButton = cardElement.querySelector(".places__heart");

  titleElement.textContent = title;
  imageElement.src = url;

  heartButton.addEventListener("click", toggleHeart(heartButton));

  gridElement.append(cardElement);
}

function toggleHeart(heartDOM){
  return function(){
    let isActive = heartDOM.classList.contains("places__heart_active");

    if (isActive) {
      heartDOM.classList.remove("places__heart_active");
    } else {
      heartDOM.classList.add("places__heart_active");
    }

  }
}

function openModal(modal){
  modal.classList.remove("modal_hidden");
}

function closeModal(modal){
  modal.classList.add("modal_hidden");
}

function handleEditSubmit(event){
  event.preventDefault();
  setProfile({ name: nameInput.value, job: jobInput.value })
  closeModal(editModal);
}

function handleAddSubmit(event){
  event.preventDefault();
  createCard({ title: titleInput.value, url: urlInput.value });
  closeModal(addModal);
}


function init(){

  let person = {
    name: 'Philliney Chandler',
    job: "Space Mobile Task Force Cadet"
  };

  let editButton = profileContainer.querySelector(".profile__edit-button");
  let addButton = profileContainer.querySelector(".profile__add-button");

  let closeEditButton = editModal.querySelector(".modal__close-button");
  let editForm = editModal.querySelector(".modal__form");

  let closeAddButton = addModal.querySelector(".modal__close-button");
  let addForm = addModal.querySelector(".modal__form"); // set event listener

  let hearts = placesContainer.querySelectorAll(".places__heart");

  for (var i = 0; i < initialCards.length; i++) {
    createCard(initialCards[i]);
  }

  editButton.addEventListener("click", () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openModal(editModal);
  });
  addButton.addEventListener("click", () => openModal(addModal));

  closeEditButton.addEventListener("click", () => closeModal(editModal));
  closeAddButton.addEventListener("click", () => closeModal(addModal));

  editForm.addEventListener("submit", handleEditSubmit);
  addForm.addEventListener("submit", handleAddSubmit);

  setProfile(person);
}

init();
