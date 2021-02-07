const profileContainer = document.querySelector(".profile");
const nameProfile = profileContainer.querySelector(".profile__name");
const jobProfile = profileContainer.querySelector(".profile__job");

const placesContainer = document.querySelector(".places");
const gridElement = placesContainer.querySelector(".places__grid");

const editModal = document.querySelector("#modal__edit");
const nameInput = editModal.querySelector(".modal__item_type_name");
const jobInput = editModal.querySelector(".modal__item_type_job");

const addModal = document.querySelector("#modal__add");
const titleInput = addModal.querySelector(".modal__item_type_title");
const urlInput = addModal.querySelector(".modal__item_type_url");

const imagePopupContainer = document.querySelector(".image-popup");
const imageElement = imagePopupContainer.querySelector(".image-popup__image");
const titleElement = imagePopupContainer.querySelector(".image-popup__title");

const forms = document.querySelectorAll(".modal__form")

function setProfile(data){
  nameProfile.textContent = data.name;
  jobProfile.textContent = data.job;
}

function setPopupImage(src, title) {
  imageElement.src = src;
  titleElement.textContent = title;
}

function createCard({ title, url }){

  const cardTemplate = document.querySelector("#place_card").content;
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector(".places__image");
  const titleElement = cardElement.querySelector(".places__title");
  const heartButton = cardElement.querySelector(".places__heart");
  const deleteButton = cardElement.querySelector(".places__delete");

  titleElement.textContent = title;
  imageElement.src = url;

  heartButton.addEventListener("click", toggleHeart);
  deleteButton.addEventListener("click", deleteCard);
  imageElement.addEventListener("click", () => {
    setPopupImage(url, title);
    openPopup(imagePopupContainer, "image-popup_hidden");
  });

  return cardElement;
}

function deleteCard(event){
  event.target.closest(".places__card").remove();
}

function toggleHeart(event){
  event.target.classList.toggle("places__heart_active");
}

function openPopup(popup, hiddenClassName="modal_hidden"){
  popup.classList.toggle(hiddenClassName);
}

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

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    setInputEventListener(formElement)
  });

}

function handleEditSubmit(event){
  event.preventDefault();
  setProfile({ name: nameInput.value, job: jobInput.value })
  openPopup(editModal);
}

function handleAddSubmit(event){
  event.preventDefault();
  const card = createCard({ title: titleInput.value, url: urlInput.value });

  gridElement.prepend(card);

  openPopup(addModal);
}

function init(){

  let person = {
    name: 'Philliney Chandler',
    job: "Space Mobile Task Force Cadet"
  };

  const editButton = profileContainer.querySelector(".profile__edit-button");
  const addButton = profileContainer.querySelector(".profile__add-button");

  const closeEditButton = editModal.querySelector(".modal__close-button");
  const editForm = editModal.querySelector(".modal__form");

  const closeAddButton = addModal.querySelector(".modal__close-button");
  const addForm = addModal.querySelector(".modal__form");

  const closeImagePopupButton = imagePopupContainer.querySelector(".image-popup__close-button");

  initialCards.forEach((card) => {
    gridElement.append( createCard(card) );
  });


  editButton.addEventListener("click", () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopup(editModal);
    enableValidation();
  });

  addButton.addEventListener("click", () => {
    openPopup(addModal)
    enableValidation();
  });

  closeEditButton.addEventListener("click", () => openPopup(editModal));
  closeAddButton.addEventListener("click", () => openPopup(addModal));

  editForm.addEventListener("submit", handleEditSubmit);
  addForm.addEventListener("submit", handleAddSubmit);

  closeImagePopupButton.addEventListener("click", () => openPopup(imagePopupContainer, "image-popup_hidden"));

  setProfile(person);
}

init();
