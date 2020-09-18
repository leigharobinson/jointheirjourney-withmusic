const remoteURL = "http://localhost:8000";

export default {
  update(param, object) {
    return fetch(`${remoteURL}/${param}/${object.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("musicmemoryapi_token")}`,
      },
      body: JSON.stringify(object),
    });
  },
  getById(param, id) {
    return fetch(`${remoteURL}/${param}/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("musicmemoryapi_token")}`,
      },
    }).then((response) => response.json());
  },
  post(param, object) {
    return fetch(`${remoteURL}/${param}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("musicmemoryapi_token")}`,
      },
      body: JSON.stringify(object),
    }).then((response) => response.json());
  },
  get(param) {
    return fetch(`${remoteURL}/${param}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("musicmemoryapi_token")}`,
      },
    }).then((response) => response.json());
  },
};
