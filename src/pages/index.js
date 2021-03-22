import "./index.css"

import Card from '../scripts/components/Card.js'
import FormValidator from '../scripts/components/FormValidator.js'
import Popup from '../scripts/components/Popup.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import Section from '../scripts/components/Section.js'
import UserInfo from '../scripts/components/UserInfo.js'
import { initialCards, person } from "../scripts/data.js";
import { selectors } from "../scripts/constants.js";
import { apiFetch, METHODS, key } from "../scripts/api.js";

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

function getServerUserInfo(){
  const url = `https://around.nomoreparties.co/v1/${key.id}/users/me`;
  return apiFetch( METHODS.GET, url)
}

function getServerCards(){
  const url = `https://around.nomoreparties.co/v1/${key.id}/cards`;
  return apiFetch(METHODS.GET, url)
}

function editServerUserInfo(data){
  const url = `https://around.nomoreparties.co/v1/${key.id}/users/me`;
  return apiFetch(METHODS.PATCH, url, data)
}

function addServerCard(data){
  const url = `https://around.nomoreparties.co/v1/${key.id}/cards`;
  return apiFetch(METHODS.POST, url, data)
}

function init(){

  const userProfile = new UserInfo({ nameSelector: nameProfile, jobSelector: jobProfile });

  const user = getServerUserInfo()
  .then(({ name, about }) => {
    userProfile.setUserInfo({ name, job: about });
  });

  let gridSection
  const cards = getServerCards()
  .then((cards) => {
    gridSection =  new Section({
      items: cards,
      renderer: ({ name, link, likes }) => {

        const cardElement = new Card({
          title: name,
          url: link,
          likes: likes.length,
          handleCardClick: () => {
            popupWithImage.open({ src: link, name });
          }
        }, cardTemplate).createCard(popupWithImage);
        gridSection.addItem(cardElement);
      }
    }, gridElement);
    return cards
  })
  .finally(() => {
    gridSection.render();
  });


  const popupWithImage = new PopupWithImage(imagePopup);

  const addPopupForm = new PopupWithForm({
    validator: (form) => {
      new FormValidator(selectors, form).enableValidation();
    },
    onSubmit: ({ title, url, likes }) => {

      addServerCard({ name: title, link: url })
      .then(() => {

        const card = new Card({
          title,
          url,
          likes: likes.length,
          handleCardClick: () => {
            popupWithImage.open({ src: url, name: title });
          }
        }, cardTemplate).createCard();
        gridSection.prependItem(card);
        addPopupForm.close();

      })
    }},
    addPopup);


  const editPopupForm = new PopupWithForm({
    validator: (form) => {
      new FormValidator(selectors, form).enableValidation();
    },
    onSubmit: ({ name, job}) => {

      editServerUserInfo({ name, about: job })
      .then(( res ) => {
        userProfile.setUserInfo({ name, job });
        editPopupForm.close();
      });

    }},
    editPopup);

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
}

init();
