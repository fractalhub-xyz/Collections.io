import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";

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
export function getUserFromID(username) {
  return api.get(`/users/${username}`);
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
  return api.post(`/collections/${id}/tags`, data);
}
export function getCollectionsFromTag(tag) {
  return api.get(`tag/${tag}`);
}
export function getNotifications() {
  return api.get("notifications/all");
}
export function postReadNotification(id) {
  return api.post(`notification/${id}/read`);
}
export function getSnippetComments(id) {
  return api.get(`snippets/${id}/comments`);
}
export function postNewComment(data) {
  return api.post("comments/", data);
}
export function DeleteComment(id) {
  return api.delete(`comments/${id}`);
}
export function postCollectionSettings(id, data) {
  return api.post(`collections/${id}/settings`, data);
}
export function postUpvoteComment(id) {
  return api.post(`comments/${id}/upvote`);
}
export function putEditComment(id, data) {
  return api.put(`comments/${id}/`, data);
}
