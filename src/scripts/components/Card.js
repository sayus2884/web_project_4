export default class Card {
  constructor({user, owner, title, url, likes, id, isLiked, handleCardClick, handleCardDeleteButton, handleCardLikeButton }, cardTemplate){
    this._user = user;

    this._owner = owner;
    this._title = title;
    this._url = url;
    this._id = id;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteButton = handleCardDeleteButton;
    this._handleCardLikeButton = handleCardLikeButton;
    this._cardElement = cardTemplate.cloneNode(true);
    this._likes = likes;
    this._likeCount = likes.length;
  }

  getId(){
    return this._id;
  }

  getLikes(){
    return this._likes;
  }

  createCard(){
    const imageElement = this._cardElement.querySelector(".places__image");
    const titleElement = this._cardElement.querySelector(".places__title");
    const counterElement = this._cardElement.querySelector(".places__counter");
    const heartButton = this._cardElement.querySelector(".places__heart");
    const deleteButton = this._cardElement.querySelector(".places__delete");

    titleElement.textContent = this._title;
    counterElement.textContent = this._likes.length;
    imageElement.src = this._url;

    heartButton.addEventListener("click", (event) => {
      this._handleCardLikeButton(this)
      .then((res) => {
        this._toggleHeart(event)
        this._likes = res.likes;
        counterElement.textContent = res.likes.length;
      })
    });

    if (this._user._id === this._owner._id) {
      deleteButton.addEventListener("click", (event) => {
        this._handleCardDeleteButton(this, this._deleteCard(event));
      });

    } else {
      this._hideDeleteButton(deleteButton);
    }

    imageElement.addEventListener("click", () => {
      this._handleCardClick();
    });

    if (this.isLiked()) {
      heartButton.classList.toggle("places__heart_active");
    }

    return this._cardElement;
  }

  isLiked(){
    return this._likes.some(( data ) => {
      return data._id = this._user._id
    });
  }

  _hideDeleteButton(deleteButton){
    deleteButton.classList.add("places__delete_hidden")
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
