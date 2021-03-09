export default class FormValidator {

  constructor(classes, formElement){
    this._classes = classes;
    this._formElement = formElement
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this._classes.inputErrorClass);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._classes.activeInputErrorClass);
  }

  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._classes.inputErrorClass);
    inputElement.classList.remove(this._classes.activeInputErrorClass);
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
      buttonElement.classList.add(this._classes.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._classes.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setInputEventListener() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._classes.inputSelector));
    const submitButton = this._formElement.querySelector(this._classes.submitButtonSelector);

    this._toggleButtonState(inputList, submitButton);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (event) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, submitButton);
      })
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    this._setInputEventListener()
  }
}
