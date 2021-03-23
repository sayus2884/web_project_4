export const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
}

export default class Api {
  constructor({ groupId, token }){
    this._id = groupId;
    this._token = token
  }

  getUserInfo(){
    const url = `https://around.nomoreparties.co/v1/${this._id}/users/me`;
    return this._fetch( METHODS.GET, url)
  }

  getInitialCards(){
    const url = `https://around.nomoreparties.co/v1/${this._id}/cards`;
    return this._fetch(METHODS.GET, url)
  }

  editUserInfo(data){
    const url = `https://around.nomoreparties.co/v1/${this._id}/users/me`;
    return this._fetch(METHODS.PATCH, url, data)
  }

  addCard(data){
    const url = `https://around.nomoreparties.co/v1/${this._id}/cards`;
    return this._fetch(METHODS.POST, url, data)
  }

  deleteCard(id){
    const url = `https://around.nomoreparties.co/v1/${this._id}/cards/${id}`;
    return this._fetch(METHODS.DELETE, url)
  }

  likeCard(id){
    const url = `https://around.nomoreparties.co/v1/${this._id}/cards/likes/${id}`;
    return this._fetch(METHODS.PUT, url)
  }

  unlikeCard(id){
    const url = `https://around.nomoreparties.co/v1/${this._id}/cards/likes/${id}`;
    return this._fetch(METHODS.DELETE, url)
  }

  updateAvatar(data){
    const url = `https://around.nomoreparties.co/v1/${this._id}/users/me/avatar`;
    return this._fetch(METHODS.PATCH, url, data)
  }

  _fetch(method, url, data = {}){
    let params = {
      method,
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },

    }

    if (method !== METHODS.GET && method !== METHODS.DELETE) {
      params = Object.assign(params, { body: JSON.stringify(data) })
    }

    return fetch(url, params)
    .then( res => {

      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res.status)
      }
    })

    .catch((err) =>{
      console.error(`Status code: ${err}.`)
    })
  }
}
