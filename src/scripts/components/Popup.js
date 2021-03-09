import { hiddenClass } from "../constants.js";

export default class Popup {
  constructor(popupElement){
    this._popupElement = popupElement;

    this._overlayElement = popupElement.querySelector(".popup__overlay");
    this._closeButtonElement = popupElement.querySelector(".popup__close-button");

    this._handleEscPress = this._handleEscPress.bind(this);
  }

  open(){
    this._popupElement.classList.remove(hiddenClass);
    document.addEventListener("keydown", this._handleEscPress);
  }

  close(){
    this._popupElement.classList.add(hiddenClass);
    document.removeEventListener("keydown", this._handleEscPress);
  }

  _handleEscPress(event) {
    if (event.keyCode === 27) {
      this.close();
    }
  }

  setEventListeners(){

    this._overlayElement.addEventListener("click", () => this.close());
    this._closeButtonElement.addEventListener("click", () => this.close());

  }
}
