const remoteURL = "http://localhost:8000";

export default {
  update(editedPatient) {
    return fetch(`${remoteURL}/patients/${editedPatient.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("musicmemoryapi_token")}`,
      },
      body: JSON.stringify(editedPatient),
    });
  },
};
