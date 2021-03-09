export default class Card {
  constructor({title, url, handleCardClick}, cardTemplate){
    this._title = title;
    this._url = url
    this._handleCardClick = handleCardClick;
    this._cardElement = cardTemplate.cloneNode(true);
  }

  createCard(){

    const imageElement = this._cardElement.querySelector(".places__image");
    const titleElement = this._cardElement.querySelector(".places__title");
    const heartButton = this._cardElement.querySelector(".places__heart");
    const deleteButton = this._cardElement.querySelector(".places__delete");

    titleElement.textContent = this._title;
    imageElement.src = this._url;

    heartButton.addEventListener("click", this._toggleHeart);
    deleteButton.addEventListener("click", this._deleteCard);
    imageElement.addEventListener("click", () => {
      this._handleCardClick();
    });

    return this._cardElement;
  }

  _toggleHeart(event){
    event.target.classList.toggle("places__heart_active");
  }

  _deleteCard(event){
    event.target.closest(".places__card").remove();
  }
}
