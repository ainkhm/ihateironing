import axios from 'axios';

const baseURL = "https://virtserver.swaggerhub.com/I425/ReactJS/1.0.0";


const getQuery = async <T>(url = ""): Promise<T> => {
  const { data } = await axios(baseURL + url);
  return data.json();
};

const postQuery = async (url = "", body = {}) => {
  const { data } = await axios.post(baseURL + url, body);
  return data;
};

const deleteQuery = async (url = "") => {
  const { data } = await axios.delete(baseURL + url);
  return data;
};

const putQuery = async (url = "", data = {}) => {
  const response = await axios.put(baseURL + url, data);
  return response;
};
