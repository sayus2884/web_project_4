export default class FormValidator {

  constructor(classes, formElement){
    this.classes = classes;
    this.formElement = formElement
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this.classes.inputErrorClass);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this.classes.activeInputErrorClass);
  }

  _hideError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this.classes.inputErrorClass);
    inputElement.classList.remove(this.classes.activeInputErrorClass);
  }

  _checkInputValidity(inputElement) {
    !inputElement.validity.valid ?
      this._showError(inputElement, inputElement.validationMessage) :
      this._hideError(inputElement);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement) {

    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.classes.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.classes.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setInputEventListener() {
    const inputList = Array.from(this.formElement.querySelectorAll(this.classes.inputSelector));
    const submitButton = this.formElement.querySelector(this.classes.submitButtonSelector);

    this._toggleButtonState(inputList, submitButton);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (event) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, submitButton);
      })
    });
  }

  enableValidation() {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    
    this._setInputEventListener()
  }
}
