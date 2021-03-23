export default class UserInfo{
  constructor({ nameSelector, jobSelector, avatarSelector }){
    this._nameElement = nameSelector;
    this._jobElement = jobSelector;
    this._avatarElement = avatarSelector;
  }

  getUserInfo(){
    console.log(this._avatarElement.src);
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src
    }
  }

  setUserInfo({ name, job }){
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }

  setAvatar(url){
    this._avatarElement.src = url
  }
}
