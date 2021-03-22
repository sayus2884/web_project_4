import Popup from "./Popup.js"

export default class PopupWithDelete extends Popup {
  constructor({ handleDelete }, popupElement){
    super(popupElement);

    this._deleteButton = popupElement.querySelector(".popup__delete-button");
    this._handleDelete = handleDelete;
    this._deleteCard = this._deleteCard.bind(this);
  }

  open(card, callback){
    super.open();
    this._card = card;
    this._deleteCallback = callback;
  }

  _deleteCard(){
    this._handleDelete(this._card.getId());
    this._deleteCallback();
  }

  setEventListeners(){
    super.setEventListeners();

    this._deleteButton.addEventListener("click", this._deleteCard);
  }
}
