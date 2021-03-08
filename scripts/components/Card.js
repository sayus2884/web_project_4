import { openPopup } from "../utils.js"


export default class Card {
  constructor(title, url){
    this.title = title;
    this.url = url
  }

  createCard(popupWithImage){

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
      popupWithImage.open({ src: this.url, name: this.title });
    });

    return cardElement;
  }

  _toggleHeart(event){
    event.target.classList.toggle("places__heart_active");
  }

  _deleteCard(event){
    event.target.closest(".places__card").remove();
  }
}
