import axios from "axios";
import queryString from 'query-string';

const fetchAPI = () => {
  const TOKEN_SAVE = localStorage.getItem('SAVED_TOKEN');
  const instance = axios.create({
    baseURL: 'https://ffreelancer.herokuapp.com/api/admin/',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN_SAVE}`
    },
    paramsSerializer: { serialize: params => queryString.stringify(params)},
  });
  return instance;
};

const requestAPI = (url, method, params) => {
  switch (method) {
    case 'GET':
      return fetchAPI()
        .get(
          url,
          { params },
        );
    case 'POST':
      return fetchAPI()
        .post(url, params);
    case 'POST':
      return fetchAPI()
        .put(url, params);
    case 'GET':
      return fetchAPI()
        .delete(
          url,
          { params },
        );
    default:
      break;
  }
  return null;
};

const requestDataAPI = async (url, method, params) => {
  try {
    const response = await requestAPI(url, method, params);
    if (response.status) {
      return response.data;
    }
    return -1;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const requestGetAPI = (url, params) => requestDataAPI(url, 'GET', params);

const requestPostAPI = (url, params) => requestDataAPI(url, 'POST', params);

const requestPutAPI = (url, params) => requestDataAPI(url, 'POST', params);

const requestDeleteAPI = (url, params) => requestDataAPI(url, 'GET', params);

const API = {
  requestGetAPI,
  requestPostAPI,
  requestPutAPI,
  requestDeleteAPI,
}

export default API;
