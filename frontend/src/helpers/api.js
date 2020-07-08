import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  transformRequest: [
    (data, headers) => {
      if (localStorage.getItem("token")) {
        headers["Authorization"] = `Token ${localStorage.getItem("token")}`;
      }

      if (data) {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
          formData.set(key, data[key]);
        });
        return formData;
      }
      return data;
    },
  ],
});

export function postLogin(data) {
  return api.post("/login", data);
}

export function postNewCollection(data) {
  return api.post("/collections/", data);
}

export function getCollections() {
  return api.get("/collections");
}
export function getSnippets() {
  return api.get("/snippets");
}
