import axios from 'axios';

const baseURL = "https://virtserver.swaggerhub.com/I425/ReactJS/1.0.0";

export const getQuery = async <T>(url = ""): Promise<T> => {
  const { data } = await axios(baseURL + url);
  return data;
};

export const postQuery = async (url = "", body = {}) => {
  const { data } = await axios.post(baseURL + url, body);
  return data;
};

export const deleteQuery = async (url = "") => {
  const { data } = await axios.delete(baseURL + url);
  return data;
};

export const putQuery = async (url = "", data = {}) => {
  const response = await axios.put(baseURL + url, data);
  return response;
};

