function showError(formElement, inputElement, errorMessage, classes) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(classes.inputErrorClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(classes.activeInputErrorClass);
}

function hideError(formElement, inputElement, classes) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(classes.inputErrorClass);
  inputElement.classList.remove(classes.activeInputErrorClass);
}

function checkInputValidity(formElement, inputElement, classes) {
  !inputElement.validity.valid ?
    showError(formElement, inputElement, inputElement.validationMessage, classes) :
    hideError(formElement, inputElement, classes);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, classes) {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(classes.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(classes.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setInputEventListener(formElement, classes) {
  const inputList = Array.from(formElement.querySelectorAll(classes.inputSelector));
  const submitButton = formElement.querySelector(classes.submitButtonSelector);

  toggleButtonState(inputList, submitButton, classes);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (event) => {
      checkInputValidity(formElement, inputElement, classes);
      toggleButtonState(inputList, submitButton, classes);
    })
  });
}

function enableValidation(classes) {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    setInputEventListener(formElement, classes)
  });

}
