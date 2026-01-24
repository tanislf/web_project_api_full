import { getToken } from "./token";

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  //headers dinámicos
  _getHeaders() {
    const token = getToken();

    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  //tarjetas iniciales
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  //info usuario
  getUser() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  //crear nuevas tarjetas(JSON.stringify hace posible que la api lea la info)
  createNewCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  //borrar tarjeta
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  // //dar me gusta
  likeCardStatus(cardId, isLiked) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  //editar perfil
  editProfile({ name, about }) {
    return fetch(`${this.baseUrl}/users/me/profile`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  //editar avatar
  editProfileImage({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }
}

//instancia para llamar a las apis
const api = new Api({
  baseUrl: "http://api.tanisaround.jumpingcrab.com",
});

export default api;
