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
export function postRegister(data) {
  return api.post("/register", data);
}
export function postNewCollection(data) {
  return api.post("/collections/", data);
}
export function postNewSnippet(data) {
  return api.post("/snippets/", data);
}
export function getCollections() {
  return api.get("/collections");
}
export function getPopularCollections(limit = 10) {
  return api.get("/collections/popular?limit=" + limit);
}
export function getFollowedCollections(limit = 10) {
  return api.get("/collections/followed?limit=" + limit);
}
export function getCollectionFromID(id) {
  return api.get(`/collections/${id}`);
}
export function getSnippetFromID(id) {
  return api.get(`/snippets/${id}`);
}
export function getUserFromID(id) {
  return api.get(`/users/${id}`);
}
export function getSnippets() {
  return api.get("/snippets");
}
export function deleteSnippet(id) {
  return api.delete(`/snippets/${id}/`);
}
export function deleteCollection(id) {
  return api.delete(`/collections/${id}/`);
}
export function editSnippet(id, data) {
  return api.put(`/snippets/${id}/`, data);
}
export function editCollection(id, data) {
  return api.put(`/collections/${id}/`, data);
}
export function postHeartSnippet(id) {
  return api.post(`/snippets/${id}/heart`);
}
export function postFollowCollection(id) {
  return api.post(`/collections/${id}/follow`);
}
export function getSearchResults(query) {
  return api.get(`/search?query=${query}`);
}

export function postTagsToCollection(id, data) {
  return api.post(`/collections/${id}/tags`, data)
}