import { hiddenClass } from "../constants.js";

export default class Popup {
  constructor(popupElement){
    this._popupElement = popupElement;

    this._overlayElement = popupElement.querySelector(".popup__overlay");
    this._closeButtonElement = popupElement.querySelector(".popup__close-button");
    this._formElement = popupElement.querySelector(".popup__form");
  }

  open(){
    this._popupElement.remove(hiddenClass);
    const formElement = popup.querySelector(".form");

    document.addEventListener("keydown", this._handleEscPress.bind(null, { formElement }));

  }

  close(){
    this._popupElement.classList.add(hiddenClass);
    document.removeEventListener("keydown", this._handleEscPress);

    if (this._formElement) {
      this._formElement.reset();
    }
  }

  _handleEscPress({ formElement }, event) {
    if (event.keyCode === 27) {
      this.close(formElement);
    }
  }

  setEventListeners(){

    this._overlayElement.addEventListener("click", () => this.close());
    this._closeButtonElement.addEventListener("click", () => this.close());

  }
}
