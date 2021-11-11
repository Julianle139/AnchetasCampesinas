import axios from "axios";
import { Path } from "../config";

export function getProducts() {
  return axios.get(`${Path.url}/products`);
}

export function getProduct(id) {
  return axios.get(`${Path.url}/products/${id}`);
}

export function setProduct(producto) {
  if (producto._id === "new") {
    delete producto._id;
    return axios.post(`${Path.url}/products`, producto);
  } else if (producto._id) {
    return axios.put(`${Path.url}/products/${producto._id}`, producto);
  }
}

export function deleteProduct(id) {
  if (id !== undefined) {
    return axios.delete(`${Path.url}/products/${id}`);
  }
}
