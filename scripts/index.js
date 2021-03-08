import Card from './components/Card.js'
import FormValidator from './components/FormValidator.js'
import Popup from './components/Popup.js'
import PopupWithImage from './components/PopupWithImage.js'
import Section from './components/Section.js'
import UserInfo from './components/UserInfo.js'
import { openPopup, closePopup } from "./utils.js"
import { initialCards } from "./data.js";

const profileContainer = document.querySelector(".profile");
const nameProfile = profileContainer.querySelector(".profile__name");
const jobProfile = profileContainer.querySelector(".profile__job");

const placesContainer = document.querySelector(".places");
const gridElement = placesContainer.querySelector(".places__grid");

const editPopup = document.querySelector("#popup__edit");
const nameInput = editPopup.querySelector(".form__item_type_name");
const jobInput = editPopup.querySelector(".form__item_type_job");

const addPopup = document.querySelector("#popup__add");
const titleInput = addPopup.querySelector(".form__item_type_title");
const urlInput = addPopup.querySelector(".form__item_type_url");

const imagePopup = document.querySelector("#popup__image");

let userProfile;
let popupWithImage;

function handleEditSubmit(event){
  event.preventDefault();
  userProfile.setUserInfo({ name: nameInput.value, job: jobInput.value });
  closePopup(editPopup);
}

function handleAddSubmit(event){
  event.preventDefault();

  const card = new Card(titleInput.value, urlInput.value).createCard(popupWithImage);
  gridElement.prepend(card);

  closePopup(addPopup);
}

function init(){

  const person = {
    name: 'Philliney Chandler',
    job: "Space Mobile Task Force Cadet"
  };

  // init here locally, set handlers lcoally too
  userProfile = new UserInfo(person);

  popupWithImage = new PopupWithImage(imagePopup);

  const selectors = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit-button",
    inactiveButtonClass: "form__submit-button_inactive",
    inputErrorClass: "form__input-error_active",
    activeInputErrorClass: "form__item_error_active"
  }

  const editButton = profileContainer.querySelector(".profile__edit-button");
  const addButton = profileContainer.querySelector(".profile__add-button");

  const editForm = editPopup.querySelector(".popup__form");
  const addForm = addPopup.querySelector(".popup__form");

  const popupList = document.querySelectorAll(".popup");

  const gridSection =  new Section({
    items: initialCards,
    renderer: ({ title, url }) => {
      const cardElement = new Card(title, url).createCard(popupWithImage)
      gridSection.addItem(cardElement);
    }
  }, gridElement);

  gridSection.render();

  editButton.addEventListener("click", () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;

    openPopup(editPopup);
  });

  addButton.addEventListener("click", () => {
    openPopup(addPopup)
  });

  new FormValidator(selectors, editForm).enableValidation();
  new FormValidator(selectors, addForm).enableValidation();

  popupList.forEach((popupElement) => {
    const popup = new Popup(popupElement);
    popup.setEventListeners();
  });

  editForm.addEventListener("submit", handleEditSubmit);
  addForm.addEventListener("submit", handleAddSubmit);
}

init();
