import { openPopup, closePopup } from "./utils.js"

export default class Card {
  constructor(title, url){
    this.title = title;
    this.url = url

    this.imagePopupContainer = document.querySelector(".image-popup");
    this.imageElement = this.imagePopupContainer.querySelector(".image-popup__image");
    this.titleElement = this.imagePopupContainer.querySelector(".image-popup__title");

    this.hiddenClass = "image-popup_hidden";
  }

  createCard(){

    const cardTemplate = document.querySelector("#place_card").content;
    const cardElement = cardTemplate.cloneNode(true);
    const imageElement = cardElement.querySelector(".places__image");
    const titleElement = cardElement.querySelector(".places__title");
    const heartButton = cardElement.querySelector(".places__heart");
    const deleteButton = cardElement.querySelector(".places__delete");

    titleElement.textContent = this.title;
    imageElement.src = this.url;

    heartButton.addEventListener("click", this._toggleHeart);
    deleteButton.addEventListener("click", this._deleteCard);
    imageElement.addEventListener("click", () => {
      this._setPopupImage(this.url, this.title);
      openPopup(this.imagePopupContainer, this.hiddenClass);
    });

    return cardElement;
  }

  _toggleHeart(event){
    event.target.classList.toggle("places__heart_active");
  }

  _deleteCard(event){
    event.target.closest(".places__card").remove();
  }

  _setPopupImage(src, title) {
    this.imageElement.src = src;
    this.titleElement.textContent = title;
  }
}
