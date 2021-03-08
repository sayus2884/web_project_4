const _hiddenClass = "popup_hidden";

const openPopup = function(popup){
  popup.classList.remove(_hiddenClass);
  const formElement = popup.querySelector(".form");

  document.addEventListener("keydown", handleEscPress.bind(null, {formElement, popupElement: popup, _hiddenClass}));

}

const closePopup = (popup, formElement) => {
  popup.classList.add(_hiddenClass);
  document.removeEventListener("keydown", handleEscPress);

  if (formElement) {
    formElement.reset();
  }
}


const handleEscPress = function({formElement, popupElement}, event) {
  if (event.keyCode === 27) {
    closePopup(popupElement, formElement);
  }
}

export {
  openPopup,
  closePopup
}
