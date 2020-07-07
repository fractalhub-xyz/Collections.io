import axios from "axios";

const base_url = "http://127.0.0.1:8000";

export function postLogin(data) {
  return axios.post(base_url + "/login", data);
}

export function postNewCollection(data) {
  return axios.post(base_url + "/collections/", data);
}

export function getCollections() {
  return axios.get(base_url + "/collections");
}

