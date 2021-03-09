import Popup from "./Popup.js"

export default class PopupWithForm extends Popup{
  constructor({ onSubmit, validator = ()=>{} }, popupElement){
    super(popupElement);

    this._onSubmit = onSubmit;
    this._formElement = popupElement.querySelector(".popup__form");
    this._inputList = popupElement.querySelectorAll(".form__input");

    validator(this._formElement);
  }

  _getInputValues(){
    const data = {};
    this._inputList.forEach((inputElement) => {
      Object.assign( data, { [inputElement.name]: inputElement.value })
    });

    return data;
  }

  _handleSubmit(event){
    event.preventDefault();
    this._onSubmit(this._getInputValues());
  }

  close(){
    super.close()
    this._formElement.reset();
  }

  setEventListeners(){
    this._formElement.addEventListener("submit", this._handleSubmit.bind(this));

    super.setEventListeners()
  }
}
