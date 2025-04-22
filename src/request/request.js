import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "@/config/serverApiConfig";
import { token as tokenCookies } from "@/auth";
import errorHandler from "./errorHandler";
import successHandler from "./successHandler";

// Function to get fresh headers
const getAuthHeaders = () => ({
  [ACCESS_TOKEN_NAME]: tokenCookies.get(),
});

// Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: getAuthHeaders(),
});

// Generic function for setting fresh headers
const refreshHeaders = () => {
  axiosInstance.defaults.headers = getAuthHeaders();
};

const request = {
  create: async (entity, jsonData) => {
    refreshHeaders();
    try {
      const response = await axiosInstance.post(`${entity}/create`, jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  read: async (entity, id) => {
    refreshHeaders();
    try {
      const response = await axiosInstance.get(`${entity}/read/${id}`);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  update: async (entity, id, jsonData) => {
    refreshHeaders();
    try {
      const response = await axiosInstance.patch(`${entity}/update/${id}`, jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  delete: async (entity, id) => {
    refreshHeaders();
    try {
      const response = await axiosInstance.delete(`${entity}/delete/${id}`);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  filter: async (entity, option = {}) => {
    refreshHeaders();
    try {
      const filter = option.filter ? `filter=${option.filter}` : "";
      const equal = option.equal ? `&equal=${option.equal}` : "";
      const query = `?${filter}${equal}`;
      const response = await axiosInstance.get(`${entity}/filter${query}`);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  search: async (entity, source, option = {}) => {
    refreshHeaders();
    try {
      const fields = option.fields ? `fields=${option.fields}` : "";
      const question = option.question ? `&q=${option.question}` : "";
      const query = fields || question ? `?${fields}${question}` : "";

      const response = await axiosInstance.get(`${entity}/search${query}`, {
        cancelToken: source.token,
      });

      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  list: async (entity, option = {}) => {
    refreshHeaders();
    try {
      const page = option.page ? `page=${option.page}` : "";
      const items = option.items ? `&items=${option.items}` : "";
      const query = page || items ? `?${page}${items}` : "";

      const response = await axiosInstance.get(`${entity}/list${query}`);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  post: async (entityUrl, jsonData) => {
    refreshHeaders();
    try {
      const response = await axiosInstance.post(entityUrl, jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  get: async (entityUrl) => {
    refreshHeaders();
    try {
      const response = await axiosInstance.get(entityUrl);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  patch: async (entityUrl, jsonData) => {
    refreshHeaders();
    try {
      const response = await axiosInstance.patch(entityUrl, jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  source: () => {
    const CancelToken = axios.CancelToken;
    return CancelToken.source();
  },
};

export default request;
