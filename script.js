let profileContainer = document.querySelector(".profile");
let nameProfile = profileContainer.querySelector(".profile__name");
let jobProfile = profileContainer.querySelector(".profile__job");

let placesContainer = document.querySelector(".places");

let editContainer = document.querySelector(".modal");
let nameInput = editContainer.querySelector(".modal__item_type_name");
let jobInput = editContainer.querySelector(".modal__item_type_job");

function openEditModal(){
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  editContainer.classList.remove("modal_hidden");
}

function closeEditModal(){
  editContainer.classList.add("modal_hidden");
}

function setProfile(data){
  nameProfile.textContent = data.name;
  jobProfile.textContent = data.job;
}

function handleSave(event){
  event.preventDefault();
  setProfile({ name: nameInput.value, job: jobInput.value })
  closeEditModal();
}

function toggleHeart(heartDOM){
  return function(){
    let isActive = heartDOM.classList.contains("places__heart_active");

    if (isActive) {
      heartDOM.classList.remove("places__heart_active");
    } else {
      heartDOM.classList.add("places__heart_active");
    }

  }
}

function init(){

  let person = {
    name: 'Philliney Chandler',
    job: "Space Mobile Task Force Cadet"
  };

  let editButton = profileContainer.querySelector(".profile__edit-button");
  let closeButton = editContainer.querySelector(".modal__close-button");
  let editForm = editContainer.querySelector(".modal__form");

  let hearts = placesContainer.querySelectorAll(".places__heart");

  for (var i = 0; i < hearts.length; i++) {
    hearts[i].classList.add("places__heart_disabled");
    hearts[i].addEventListener("click", toggleHeart(hearts[i]));
  }

  editButton.addEventListener("click", openEditModal);
  closeButton.addEventListener("click", closeEditModal);
  editForm.addEventListener("submit", handleSave);

  setProfile(person);
}

init();
