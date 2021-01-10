let profileContainer = document.querySelector(".profile");
let nameProfile = profileContainer.querySelector(".profile__name");
let jobProfile = profileContainer.querySelector(".profile__job");

let placesContainer = document.querySelector(".places");

let editContainer = document.querySelector(".edit");
let nameInput = editContainer.querySelector(".edit__item_type_name");
let jobInput = editContainer.querySelector(".edit__item_type_job");

let person = {
  name: 'Philliney Chandler',
  job: "Space Mobile Task Force Cadet"
};

function openEditModal(){
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  editContainer.classList.remove("edit_hidden");
}

function closeEditModal(){
  editContainer.classList.add("edit_hidden");
}

function setProfile(event){
  event.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

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

  let editButton = profileContainer.querySelector(".profile__edit-button");
  let closeButton = editContainer.querySelector(".edit__close-button");
  let editForm = editContainer.querySelector(".edit__form");

  let hearts = placesContainer.querySelectorAll(".places__heart");

  for (var i = 0; i < hearts.length; i++) {
    hearts[i].classList.add("places__heart_disabled");
    hearts[i].addEventListener("click", toggleHeart(hearts[i]));
  }

  editButton.addEventListener("click", openEditModal);
  closeButton.addEventListener("click", closeEditModal);
  editForm.addEventListener("submit", setProfile);

  nameProfile.textContent = person.name;
  jobProfile.textContent = person.job;
}

init();
