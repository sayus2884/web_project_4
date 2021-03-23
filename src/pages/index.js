import "./index.css"

import Card from '../scripts/components/Card.js'
import FormValidator from '../scripts/components/FormValidator.js'
import Popup from '../scripts/components/Popup.js'
import PopupWithDelete from '../scripts/components/PopupWithDelete.js'
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
const avatarProfile = profileContainer.querySelector(".profile__avatar");
const editButton = profileContainer.querySelector(".profile__edit-button");
const editAvatarButton = profileContainer.querySelector(".profile__avatar-edit-button");
const addButton = profileContainer.querySelector(".profile__add-button");

const placesContainer = document.querySelector(".places");
const gridElement = placesContainer.querySelector(".places__grid");

const deletePopup = document.querySelector("#popup__delete");
const editPopup = document.querySelector("#popup__edit");
const editAvatarPopup = document.querySelector("#popup__edit-avatar");
const addPopup = document.querySelector("#popup__add");
const imagePopup = document.querySelector("#popup__image");

const nameInput = editPopup.querySelector(".form__item_type_name");
const jobInput = editPopup.querySelector(".form__item_type_job");
const avatarInput = editAvatarPopup.querySelector(".form__item_type_avatar");

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

function deleteServerCard(id){
  const url = `https://around.nomoreparties.co/v1/${key.id}/cards/${id}`;
  return apiFetch(METHODS.DELETE, url)
}

function likeServerCard(id){
  const url = `https://around.nomoreparties.co/v1/${key.id}/cards/likes/${id}`;
  return apiFetch(METHODS.PUT, url)
}

function unlikeServerCard(id){
  const url = `https://around.nomoreparties.co/v1/${key.id}/cards/likes/${id}`;
  return apiFetch(METHODS.DELETE, url)
}

function updateServerAvatar(data){
  const url = `https://around.nomoreparties.co/v1/${key.id}/users/me/avatar`;
  return apiFetch(METHODS.PATCH, url, data)
}

function init(){

  const userProfile = new UserInfo({ nameSelector: nameProfile, jobSelector: jobProfile, avatarSelector: avatarProfile });

  getServerUserInfo()
  .then((res) => {
    const { name, about, avatar } = res;
    userProfile.setUserInfo({ name, job: about });
    userProfile.setAvatar(avatar);

    return res;
  })

  .then((user) => {

    let gridSection
    const cards = getServerCards()
    .then((cards) => {
      gridSection =  new Section({
        items: cards,
        renderer: ({ name, link, likes, _id }) => {

          const cardElement = new Card({
            user, // hotfix solution for liked cards upon init
            id: _id,
            title: name,
            url: link,
            likes: likes,
            handleCardClick: () => {
              popupWithImage.open({ src: link, name });
            },
            handleCardDeleteButton: (card, callback) => {
              popupWithDelete.open(card, callback)
            },
            handleCardLikeButton: (card) => {

              if (card.isLiked()) {
                return unlikeServerCard(card.getId());
              } else {
                return likeServerCard(card.getId());
              }

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


    const popupWithDelete = new PopupWithDelete({
      handleDelete: (id) => {
        deleteServerCard(id);
        popupWithDelete.close();
      }
    }, deletePopup)

    const popupWithImage = new PopupWithImage(imagePopup);

    const addPopupForm = new PopupWithForm({
      validator: (form) => {
        new FormValidator(selectors, form).enableValidation();
      },
      onSubmit: ({ title, url, likes }) => {

        addServerCard({ name: title, link: url })
        .then((res) => {

          const card = new Card({
            id: res._id,
            title,
            url,
            likes: [],
            handleCardClick: () => {
              popupWithImage.open({ src: url, name: title });
            },
            handleCardDeleteButton: (card, callback) => {
              popupWithDelete.open(card, callback);
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

    const editAvatarPopupForm = new PopupWithForm({
      validator: (form) => {
        new FormValidator(selectors, form).enableValidation();
      },
      onSubmit: ({ avatar }) => {

        updateServerAvatar({ avatar })
        .then(( res ) => {
          userProfile.setAvatar(avatar);
          editAvatarPopupForm.close();
        });

      }},
      editAvatarPopup);

    editButton.addEventListener("click", () => {
      const { name, job } = userProfile.getUserInfo();
      nameInput.value = name;
      jobInput.value = job;
      editPopupForm.open();
    });

    editAvatarButton.addEventListener("click", () => {
      const { avatar } = userProfile.getUserInfo();
      console.log(avatarInput);
      avatarInput.value = avatar;
      editAvatarPopupForm.open();
    });

    addButton.addEventListener("click", () => {
      addPopupForm.open();
    });

    popupWithImage.setEventListeners();
    popupWithDelete.setEventListeners();
    addPopupForm.setEventListeners();
    editPopupForm.setEventListeners();
    editAvatarPopupForm.setEventListeners();
  })
}

init();
