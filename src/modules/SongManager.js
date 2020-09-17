const remoteURL = "http://localhost:8000";

export default {
  getYear(yyyy) {
    return fetch(`${remoteURL}/songs?birth_year=${yyyy}`).then((result) =>
      result.json()
    );
  },
  getAll(id) {
    return fetch(`${remoteURL}/songs?patient_id=${id}`).then((result) =>
      result.json()
    );
  },
};
