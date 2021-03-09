import { selectors } from "../constants.js";

import Popup from "./Popup.js"
import FormValidator from './FormValidator.js'

export default class PopupWithForm extends Popup{
  constructor({ onSubmit }, popupElement){
    super(popupElement);

    this._onSubmit = onSubmit;
    this._formElement = popupElement.querySelector(".popup__form");
    this._inputList = popupElement.querySelectorAll(".form__input");

    new FormValidator(selectors, this._formElement).enableValidation();
  }

  _getInputValues(){
    let data = {};
    this._inputList.forEach((inputElement) => {
      Object.assign( data, { [inputElement.name]: inputElement.value })
    });

    return data;
  }

  _handleSubmit(event){
    event.preventDefault();
    this._onSubmit(this._getInputValues());
    this._formElement.reset();
  }

  setEventListeners(){
    this._formElement.addEventListener("submit", this._handleSubmit.bind(this));

    super.setEventListeners()
  }
}