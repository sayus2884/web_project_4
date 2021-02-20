import Card from './Card.js'
// import FormValidator from './FormValidator.js'

(function(){


const profileContainer = document.querySelector(".profile");
const nameProfile = profileContainer.querySelector(".profile__name");
const jobProfile = profileContainer.querySelector(".profile__job");

const placesContainer = document.querySelector(".places");
const gridElement = placesContainer.querySelector(".places__grid");

const editModal = document.querySelector("#modal__edit");
const nameInput = editModal.querySelector(".form__item_type_name");
const jobInput = editModal.querySelector(".form__item_type_job");

const addModal = document.querySelector("#modal__add");
const titleInput = addModal.querySelector(".form__item_type_title");
const urlInput = addModal.querySelector(".form__item_type_url");

const imagePopupContainer = document.querySelector(".image-popup");
const imageElement = imagePopupContainer.querySelector(".image-popup__image");
const titleElement = imagePopupContainer.querySelector(".image-popup__title");

function setProfile(data){
  nameProfile.textContent = data.name;
  jobProfile.textContent = data.job;
}

// function setPopupImage(src, title) {
//   imageElement.src = src;
//   titleElement.textContent = title;
// }

// function createCard({ title, url }){
//
//   const cardTemplate = document.querySelector("#place_card").content;
//   const cardElement = cardTemplate.cloneNode(true);
//   const imageElement = cardElement.querySelector(".places__image");
//   const titleElement = cardElement.querySelector(".places__title");
//   const heartButton = cardElement.querySelector(".places__heart");
//   const deleteButton = cardElement.querySelector(".places__delete");
//
//   titleElement.textContent = title;
//   imageElement.src = url;
//
//   heartButton.addEventListener("click", toggleHeart);
//   deleteButton.addEventListener("click", deleteCard);
//   imageElement.addEventListener("click", () => {
//     setPopupImage(url, title);
//     openPopup(imagePopupContainer, "image-popup_hidden");
//   });
//
//   return cardElement;
// }

// function deleteCard(event){
//   event.target.closest(".places__card").remove();
// }

// function toggleHeart(event){
//   event.target.classList.toggle("places__heart_active");
// }

function openPopup(popup, hiddenClassName="modal_hidden"){
  popup.classList.remove(hiddenClassName);
  const formElement = popup.querySelector(".form");
  document.addEventListener("keydown", handleEscPress(formElement, popup, hiddenClassName));
}

function closePopup(popup, hiddenClassName="modal_hidden"){
  popup.classList.add(hiddenClassName);
  const formElement = popup.querySelector(".form");
  document.removeEventListener("keydown", handleEscPress(formElement, popup, hiddenClassName));
}

function handleEditSubmit(event){
  event.preventDefault();
  setProfile({ name: nameInput.value, job: jobInput.value })
  closePopup(editModal);
}

function handleAddSubmit(event){
  event.preventDefault();

  const card = new Card(titleInput.value, urlInput.value).createCard();
  gridElement.prepend(card);

  closePopup(addModal);
}

function hasClass(element, classname){
  return Array.from(element.classList).includes(classname.replace(".", ""));
}

function closeAndResetModalForm(formElement, modalElement, hiddenClass) {
  closePopup(modalElement);
  formElement.reset();
}

function handleEscPress(formElement, modalElement, hiddenClass){
  return (event) => {
    if (event.keyCode === 27 && !hasClass(modalElement, hiddenClass)) {

      formElement ?
      closeAndResetModalForm(formElement, modalElement, hiddenClass) :
      closePopup(modalElement, hiddenClass);
    }
  }
}

function init(){

  const person = {
    name: 'Philliney Chandler',
    job: "Space Mobile Task Force Cadet"
  };

  const selectors = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit-button",
    inactiveButtonClass: "form__submit-button_inactive",
    inputErrorClass: "form__input-error_active",
    activeInputErrorClass: "form__item_error_active"
  }

  const editButton = profileContainer.querySelector(".profile__edit-button");
  const addButton = profileContainer.querySelector(".profile__add-button");

  const editForm = editModal.querySelector(".modal__form");
  const addForm = addModal.querySelector(".modal__form");

  const closeImagePopupButton = imagePopupContainer.querySelector(".image-popup__close-button");
  const popupOverlay = imagePopupContainer.querySelector(".image-popup__overlay");

  const modalList = document.querySelectorAll(".modal");

  initialCards.forEach(({ title, url }) => {
    const cardElement = new Card(title, url).createCard()
    gridElement.append( cardElement );
  });

  editButton.addEventListener("click", () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;

    openPopup(editModal);
    enableValidation(selectors);
  });

  addButton.addEventListener("click", () => {
    openPopup(addModal)
    enableValidation(selectors);
  });

  modalList.forEach((modalElement) => {
    const overlayElement = modalElement.querySelector(".modal__overlay");
    const closeButton = modalElement.querySelector(".modal__close-button");
    const formElement = modalElement.querySelector(".modal__form");

    overlayElement.addEventListener("click", () => closeAndResetModalForm(formElement, modalElement));
    closeButton.addEventListener("click", () => closeAndResetModalForm(formElement, modalElement));
  });

  editForm.addEventListener("submit", handleEditSubmit);
  addForm.addEventListener("submit", handleAddSubmit);

  popupOverlay.addEventListener("click", () => {
    closePopup(imagePopupContainer, "image-popup_hidden");
  });
  closeImagePopupButton.addEventListener("click", () => closePopup(imagePopupContainer, "image-popup_hidden"));

  setProfile(person);
}

init();

})();
