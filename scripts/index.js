import Card from './components/Card.js'
import FormValidator from './components/FormValidator.js'
import Popup from './components/Popup.js'
import PopupWithForm from './components/PopupWithForm.js'
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

function init(){

  const person = {
    name: 'Philliney Chandler',
    job: "Space Mobile Task Force Cadet"
  };

  // init here locally, set handlers lcoally too
  const userProfile = new UserInfo(person);

  const popupWithImage = new PopupWithImage(imagePopup);

  const addPopupForm = new PopupWithForm({
    onSubmit: ({ title, url }) => {
      const card = new Card(title, url).createCard(popupWithImage);
      gridElement.prepend(card);
      addPopupForm.close();
    }},
    addPopup);
  addPopupForm.setEventListeners()

  const editPopupForm = new PopupWithForm({
    onSubmit: ({ name, job}) => {
      userProfile.setUserInfo({ name, job });
      editPopupForm.close();
    }},
    editPopup);
  editPopupForm.setEventListeners()

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
    addPopupForm.open();
  });

  popupList.forEach((popupElement) => {
    const popup = new Popup(popupElement);
    popup.setEventListeners();
  });

}

init();
