function showError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add("form__input-error_active");
  errorElement.textContent = errorMessage;
  inputElement.classList.add("form__input_error_active");
}

function hideError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove("form__input-error_active");
  inputElement.classList.remove("form__input_error_active");
}

function checkInputValidity(formElement, inputElement) {
  !inputElement.validity.valid ?
    showError(formElement, inputElement, inputElement.validationMessage) :
    hideError(formElement, inputElement);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement) {
  hasInvalidInput(inputList) ?
  buttonElement.classList.add("form__submit-button_inactive") :
  buttonElement.classList.remove("form__submit-button_inactive")
}

function setInputEventListener(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const submitButton = formElement.querySelector(".form__submit-button");

  toggleButtonState(inputList, submitButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (event) => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButton);
    })
  });
}

function enableValidation(selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}) {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    setInputEventListener(formElement)
  });

}
