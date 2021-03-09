import "./styles/index.css"

import Card from './scripts/components/Card.js'
import FormValidator from './scripts/components/FormValidator.js'
import Popup from './scripts/components/Popup.js'
import PopupWithForm from './scripts/components/PopupWithForm.js'
import PopupWithImage from './scripts/components/PopupWithImage.js'
import Section from './scripts/components/Section.js'
import UserInfo from './scripts/components/UserInfo.js'
import { initialCards, person } from "./scripts/data.js";

const profileContainer = document.querySelector(".profile");
const nameProfile = profileContainer.querySelector(".profile__name");
const jobProfile = profileContainer.querySelector(".profile__job");
const editButton = profileContainer.querySelector(".profile__edit-button");
const addButton = profileContainer.querySelector(".profile__add-button");

const placesContainer = document.querySelector(".places");
const gridElement = placesContainer.querySelector(".places__grid");

const editPopup = document.querySelector("#popup__edit");
const addPopup = document.querySelector("#popup__add");
const imagePopup = document.querySelector("#popup__image");

const nameInput = editPopup.querySelector(".form__item_type_name");
const jobInput = editPopup.querySelector(".form__item_type_job");

const cardTemplate = document.querySelector("#place_card").content;

function init(){

  const userProfile = new UserInfo(person);
  const popupWithImage = new PopupWithImage(imagePopup);

  const addPopupForm = new PopupWithForm({
    onSubmit: ({ title, url }) => {
      const card = new Card({
        title,
        url,
        handleCardClick: () => {
          popupWithImage.open({ src: url, name: title });
        }
      }, cardTemplate).createCard();
      gridElement.prepend(card);
      addPopupForm.close();
    }},
    addPopup);

  const editPopupForm = new PopupWithForm({
    onSubmit: ({ name, job}) => {
      userProfile.setUserInfo({ name, job });
      editPopupForm.close();
    }},
    editPopup);

  const gridSection =  new Section({
    items: initialCards,
    renderer: ({ title, url }) => {

      const cardElement = new Card({
        title,
        url,
        handleCardClick: () => {
          popupWithImage.open({ src: url, name: title });
        }
      }, cardTemplate).createCard(popupWithImage);
      gridSection.addItem(cardElement);
    }
  }, gridElement);

  editButton.addEventListener("click", () => {
    const { name, job } = userProfile.getUserInfo();
    nameInput.value = name;
    jobInput.value = job;
    editPopupForm.open();
  });

  addButton.addEventListener("click", () => {
    addPopupForm.open();
  });

  popupWithImage.setEventListeners();
  addPopupForm.setEventListeners()
  editPopupForm.setEventListeners()
  gridSection.render();
}

init();
