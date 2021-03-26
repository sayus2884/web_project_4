export const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
}

export default class Api {
  constructor({ baseUrl, token }){
    this._baseUrl = baseUrl;
    this._token = token
  }

  getUserInfo(){
    const url = `${this._baseUrl}/users/me`;
    return this._fetch( METHODS.GET, url)
  }

  getInitialCards(){
    const url = `${this._baseUrl}/cards`;
    return this._fetch(METHODS.GET, url)
  }

  editUserInfo(data){
    const url = `${this._baseUrl}/users/me`;
    return this._fetch(METHODS.PATCH, url, data)
  }

  addCard(data){
    const url = `${this._baseUrl}/cards`;
    return this._fetch(METHODS.POST, url, data)
  }

  deleteCard(id){
    const url = `${this._baseUrl}/cards/${id}`;
    return this._fetch(METHODS.DELETE, url)
  }

  likeCard(id){
    const url = `${this._baseUrl}/cards/likes/${id}`;
    return this._fetch(METHODS.PUT, url)
  }

  unlikeCard(id){
    const url = `${this._baseUrl}/cards/likes/${id}`;
    return this._fetch(METHODS.DELETE, url)
  }

  updateAvatar(data){
    const url = `${this._baseUrl}/users/me/avatar`;
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
