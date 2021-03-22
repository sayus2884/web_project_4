export const key = {
  token: "90d739e4-9945-4145-b00f-fb0273ca4af9",
  id: "group-7"
}

export const METHODS = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
}

export function apiFetch(method, url, data = {}){
  let params = {
    method,
    headers: {
      authorization: key.token,
      "Content-Type": "application/json"
    },

  }

  if (method !== METHODS.GET) {
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
