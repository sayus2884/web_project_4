const openPopup = function(popup, hiddenClass="modal_hidden"){
  popup.classList.remove(hiddenClass);
  const formElement = popup.querySelector(".form");

  document.addEventListener("keydown", handleEscPress.bind(null, {formElement, modalElement: popup, hiddenClass}));

}

const closePopup = (popup, hiddenClassName="modal_hidden", callback) => {
  popup.classList.add(hiddenClassName);
  const formElement = popup.querySelector(".form");
  document.removeEventListener("keydown", handleEscPress);
}

const closeAndResetModalForm = (formElement, modalElement) => {
  closePopup(modalElement);
  formElement.reset();
}

function hasClass(element, classname){
  return Array.from(element.classList).includes(classname.replace(".", ""));
}

const handleEscPress = function({formElement, modalElement, hiddenClass}, event) {
  if (event.keyCode === 27 && !hasClass(modalElement, hiddenClass)) {
    formElement ?
    closeAndResetModalForm(formElement, modalElement, hiddenClass) :
    closePopup(modalElement, hiddenClass);
  }
}

export {
  openPopup,
  closePopup,
  closeAndResetModalForm
}
