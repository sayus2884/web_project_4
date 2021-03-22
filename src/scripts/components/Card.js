export default class Card {
  constructor({title, url, likes, id, handleCardClick, handleCardDeleteButton}, cardTemplate){
    this._title = title;
    this._url = url;
    this._id = id;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteButton = handleCardDeleteButton;
    this._cardElement = cardTemplate.cloneNode(true);
    this._likes = likes
  }

  getId(){
    return this._id;
  }

  createCard(){

    const imageElement = this._cardElement.querySelector(".places__image");
    const titleElement = this._cardElement.querySelector(".places__title");
    const counterElement = this._cardElement.querySelector(".places__counter");
    const heartButton = this._cardElement.querySelector(".places__heart");
    const deleteButton = this._cardElement.querySelector(".places__delete");

    titleElement.textContent = this._title;
    counterElement.textContent = this._likes;
    imageElement.src = this._url;

    heartButton.addEventListener("click", this._toggleHeart);
    deleteButton.addEventListener("click", (event) => {
        this._handleCardDeleteButton(this, this._deleteCard(event));
    });
    imageElement.addEventListener("click", () => {
      this._handleCardClick();
    });

    return this._cardElement;
  }

  _toggleHeart(event){
    event.target.classList.toggle("places__heart_active");
  }

  _deleteCard(event){
    return () => {
      event.target.closest(".places__card").remove();
    }
  }
}
