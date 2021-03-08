export default class UserInfo{
  constructor({ name, job }){
    this._name = name;
    this._job = job;

    this._nameElement = document.querySelector(".profile__name");
    this._jobElement = document.querySelector(".profile__job");

    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }

  getUserInfo(){
    return { name: this._name, job: this._job }
  }

  setUserInfo({ name, job }){
    this._name = name;
    this._job = job;

    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
