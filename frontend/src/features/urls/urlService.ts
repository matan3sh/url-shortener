import axios from "axios";

const API_URL = "/api/urls";

const getUrls = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getUrl = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const deleteUrl = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const addUrl = async (baseUrl: string) => {
  const response = await axios.post(API_URL, { baseUrl });
  return response.data;
};

export const urlService = {
  getUrls,
  getUrl,
  deleteUrl,
  addUrl,
};
