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
  const popupOverlay = imagePopupContainer.querySelector(".image-popup__overlay");

  const modalList = document.querySelectorAll(".modal");

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

  modalList.forEach((modalElement) => {
    const overlayElement = modalElement.querySelector(".modal__overlay");
    overlayElement.addEventListener("click", () => openPopup(modalElement))
  });

  editForm.addEventListener("submit", handleEditSubmit);
  addForm.addEventListener("submit", handleAddSubmit);

  popupOverlay.addEventListener("click", () => {
    openPopup(imagePopupContainer, "image-popup_hidden");
  });
  closeImagePopupButton.addEventListener("click", () => openPopup(imagePopupContainer, "image-popup_hidden"));

  setProfile(person);
}

init();