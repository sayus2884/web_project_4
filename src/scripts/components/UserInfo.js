export default class UserInfo{
  constructor({ nameSelector, jobSelector, avatarSelector }){
    this._nameElement = nameSelector;
    this._jobElement = jobSelector;
    this._avatarSelector = avatarSelector;
  }

  getUserInfo(){
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    }
  }

  setUserInfo({ name, job }){
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }

  setAvatar(url){
    this._avatarSelector.src = url
  }
}
