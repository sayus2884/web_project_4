import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupElement){
    super(popupElement);

    this._imageElement = popupElement.querySelector(".popup__image");
    this._nameElement = popupElement.querySelector(".popup__name");
  }

  open({ src, name }){
    this._setPopupImage(src, name)
    super.open();
  }

  _setPopupImage(src, name) {
    this._imageElement.src = src;
    this._nameElement.textContent = name;
  }
}
