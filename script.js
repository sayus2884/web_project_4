let profileContainer = document.querySelector(".profile");
let nameProfile = profileContainer.querySelector(".profile__name");
let jobProfile = profileContainer.querySelector(".profile__job");

let placesContainer = document.querySelector(".places");
const gridElement = placesContainer.querySelector(".places__grid");

let editModal = document.querySelector("#modal__edit");
let nameInput = editModal.querySelector(".modal__item_type_name");
let jobInput = editModal.querySelector(".modal__item_type_job");

let addModal = document.querySelector("#modal__add");
let titleInput = addModal.querySelector(".modal__item_type_title");
let urlInput = addModal.querySelector(".modal__item_type_url");

let imagePopupContainer = document.querySelector(".image-popup");

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

function setPopupImage(src, title) {
  let imageElement = imagePopupContainer.querySelector(".image-popup__image");
  let titleElement = imagePopupContainer.querySelector(".image-popup__title");

  imageElement.src = src;
  titleElement.textContent = title;
}

function createCard({ title, url }){

  const cardTemplate = document.querySelector("#place_card").content;
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector(".places__image");
  const titleElement = cardElement.querySelector(".places__title");
  const heartButton = cardElement.querySelector(".places__heart");
  const deleteButton = cardElement.querySelector(".places__delete");

  titleElement.textContent = title;
  imageElement.src = url;
  deleteButton.id = Date.now() + Math.floor(Math.random() * 100);

  heartButton.addEventListener("click", toggleHeart(heartButton));
  deleteButton.addEventListener("click", deleteCard(deleteButton.id));
  imageElement.addEventListener("click", () => {
    setPopupImage(url, title);
    toggleImagePopup(imagePopupContainer);
  });

  gridElement.append(cardElement);
}

function deleteCard(id){
  return () => {
    const cards = gridElement.querySelectorAll(".places__card");
    const card = Array.from(cards).find((card) => {
      return card.querySelector(".places__delete").id === id;
    });

    card.remove();
  };
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

function toggleModal(modal){
  modal.classList.toggle("modal_hidden");
}

function toggleImagePopup(popup){
  popup.classList.toggle("image-popup_hidden");
}

function handleEditSubmit(event){
  event.preventDefault();
  setProfile({ name: nameInput.value, job: jobInput.value })
  toggleModal(editModal);
}

function handleAddSubmit(event){
  event.preventDefault();
  createCard({ title: titleInput.value, url: urlInput.value });
  toggleModal(addModal);
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
  let addForm = addModal.querySelector(".modal__form");

  let closeImagePopupButton = imagePopupContainer.querySelector(".image-popup__close-button");

  initialCards.forEach((card) => createCard(initialCards[i]) );


  editButton.addEventListener("click", () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    toggleModal(editModal);
  });

  addButton.addEventListener("click", () => toggleModal(addModal));

  closeEditButton.addEventListener("click", () => toggleModal(editModal));
  closeAddButton.addEventListener("click", () => toggleModal(addModal));

  editForm.addEventListener("submit", handleEditSubmit);
  addForm.addEventListener("submit", handleAddSubmit);

  closeImagePopupButton.addEventListener("click", () => toggleImagePopup(imagePopupContainer));

  setProfile(person);
}

init();
