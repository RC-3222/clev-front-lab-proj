import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';

export enum ApiPath {
  categories = '/api/categories',
  books = '/api/books',
  register = '/api/auth/local/register',
  auth = '/api/auth/local',
  forgotPassword = '/api/auth/forgot-password',
  resetPassword = '/api/auth/reset-password',
  comments = '/api/comments',
  bookings = '/api/bookings',
  users = '/api/users',
  upload = '/api/upload',
}

export const BASE_URL = 'https://library-cleverland-2jfze.ondigitalocean.app/';

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(config => {
  const token = Cookies.get('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
