import Card from './components/Card.js'
import FormValidator from './components/FormValidator.js'
import Section from './components/Section.js'
import UserInfo from './components/UserInfo.js'
import { openPopup, closePopup, closeAndResetModalForm } from "./utils.js"
import { initialCards } from "./data.js";

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

let userProfile;

function handleEditSubmit(event){
  event.preventDefault();
  userProfile.setUserInfo({ name: nameInput.value, job: jobInput.value });
  closePopup(editModal);
}

function handleAddSubmit(event){
  event.preventDefault();

  const card = new Card(titleInput.value, urlInput.value).createCard();
  gridElement.prepend(card);

  closePopup(addModal);
}

function init(){

  const person = {
    name: 'Philliney Chandler',
    job: "Space Mobile Task Force Cadet"
  };

  // init here locally, set handlers lcoally too
  userProfile = new UserInfo(person);


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

  const gridSection =  new Section({
    items: initialCards,
    renderer: ({ title, url }) => {
      const cardElement = new Card(title, url).createCard()
      gridSection.addItem(cardElement);
    }
  }, gridElement);

  gridSection.render();

  editButton.addEventListener("click", () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;

    openPopup(editModal);
  });

  addButton.addEventListener("click", () => {
    openPopup(addModal)
  });

  new FormValidator(selectors, editForm).enableValidation();
  new FormValidator(selectors, addForm).enableValidation();

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
}

init();
