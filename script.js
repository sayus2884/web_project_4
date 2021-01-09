let page = document.querySelector(".page");

let profile = page.querySelector(".profile");
let nameProfile = page.querySelector(".profile__name");
let jobProfile = page.querySelector(".profile__job");

let places = page.querySelector(".places");

let edit = page.querySelector(".edit");
let nameInput = edit.querySelector(".edit__item_type_name");
let jobInput = edit.querySelector(".edit__item_type_job");

let person = {
  name: 'Philliney Chandler',
  job: "Space Mobile Task Force Cadet"
};

function openEditModal(){
  edit.classList.remove("edit_hidden");
}

function closeEditModal(){
  edit.classList.add("edit_hidden");
}

function setProfile(){
  nameProfile.innerHTML = nameInput.value;
  jobProfile.innerHTML = jobInput.value;

  closeEditModal();
}

function toggleHeart(heartDOM){
  return function(){
    let isDisabled = heartDOM.classList.contains("places__heart_disabled");

    if (isDisabled) {
      heartDOM.classList.add("places__heart_active");
      heartDOM.classList.remove("places__heart_disabled");
    } else {
      heartDOM.classList.add("places__heart_disabled");
      heartDOM.classList.remove("places__heart_active");
    }

  }
}

function init(){

  let editButton = profile.querySelector(".profile__edit-button");
  let closeButton = edit.querySelector(".edit__close-button");
  let saveButton = edit.querySelector(".edit__save-button");

  let hearts = places.querySelectorAll(".places__heart");

  for (var i = 0; i < hearts.length; i++) {
    hearts[i].classList.add("places__heart_disabled");
    hearts[i].addEventListener("click", toggleHeart(hearts[i]));
  }

  editButton.addEventListener("click", openEditModal);
  closeButton.addEventListener("click", closeEditModal);
  saveButton.addEventListener("click", setProfile);

  nameInput.value = person.name;
  jobInput.value = person.job;

  setProfile();
}

init();
