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
import Api from "../scripts/api.js";

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

const key = {
  token: "90d739e4-9945-4145-b00f-fb0273ca4af9",
  groupId: "group-7"
}

function catchError(error){
  console.error(`Error: ${error}`);
}

function init(){

  const api = new Api({
    baseUrl: `https://around.nomoreparties.co/v1/${key.groupId}`,
    token: key.token
  })

  const userProfile = new UserInfo({ nameSelector: nameProfile, jobSelector: jobProfile, avatarSelector: avatarProfile });

  api.getUserInfo()
  .then((res) => {
    const { name, about, avatar } = res;
    userProfile.setUserInfo({ name, job: about });
    userProfile.setAvatar(avatar);

    return res;
  })

  .then((user) => {

    function handleCardLikeButton(card) {

      if (card.isLiked()) {
        return api.unlikeCard(card.getId());
      } else {
        return api.likeCard(card.getId());
      }
    }

    let gridSection;
    const cards = api.getInitialCards()
    .then((cards) => {
      gridSection =  new Section({
        items: cards,
        renderer: ({ name, link, likes, _id, owner }) => {

          const cardElement = new Card({
            user, // hotfix solution for liked cards on init
            owner,
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
            handleCardLikeButton,
          }, cardTemplate).createCard(popupWithImage);
          gridSection.addItem(cardElement);
        }
      }, gridElement);
      return cards
    })
    .catch(catchError)
    .finally(() => {
      gridSection.render();
    });


    const popupWithDelete = new PopupWithDelete({
      handleDelete: (id) => {
        api.deleteCard(id);
        popupWithDelete.close();
      }
    }, deletePopup)

    const popupWithImage = new PopupWithImage(imagePopup);

    const addPopupForm = new PopupWithForm({
      validator: (form) => {
        new FormValidator(selectors, form).enableValidation();
      },
      onSubmit: ({ title, url, likes }, event) => {

        addPopupForm.setButtonText("Creating Card...");

        api.addCard({ name: title, link: url })
        .then(({ owner, _id }) => {

          const card = new Card({
            user, // hotfix solution for liked cards on init
            owner,
            id: _id,
            title,
            url,
            likes: [],
            handleCardClick: () => {
              popupWithImage.open({ src: url, name: title });
            },
            handleCardDeleteButton: (card, callback) => {
              popupWithDelete.open(card, callback);
            },
            handleCardLikeButton
          }, cardTemplate).createCard();
          gridSection.prependItem(card);
          addPopupForm.close();
        })
        .catch(catchError)
        .finally(() => {
          addPopupForm.setButtonText("Create");
        });
      }},
      addPopup);

    const editPopupForm = new PopupWithForm({
      validator: (form) => {
        new FormValidator(selectors, form).enableValidation();
      },
      onSubmit: ({ name, job}) => {

        editPopupForm.setButtonText("Saving...");
        api.editUserInfo({ name, about: job })
        .then(( res ) => {
          userProfile.setUserInfo({ name, job });
          editPopupForm.close();
        })
        .catch(catchError)
        .finally(() => {
          editPopupForm.setButtonText("Save");
        });

      }},
      editPopup);

    const editAvatarPopupForm = new PopupWithForm({
      validator: (form) => {
        new FormValidator(selectors, form).enableValidation();
      },
      onSubmit: ({ avatar }) => {

        editAvatarPopupForm.setButtonText("Saving...");
        api.updateAvatar({ avatar })
        .then(( res ) => {
          userProfile.setAvatar(avatar);
          editAvatarPopupForm.close();
        })
        .catch(catchError)
        .finally(() => {
          editAvatarPopupForm.setButtonText("Save");
        });;

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

  .catch(catchError);
}

init();
