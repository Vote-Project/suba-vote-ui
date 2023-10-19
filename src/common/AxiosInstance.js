import axios from 'axios';
import { ALGORIXMO_MAIN_API, MAIN_API } from './const';

// Create an Axios instance with custom configuration, if needed
export const axiosInstance = axios.create({
  baseURL: MAIN_API, // Replace with your API's base URL
  timeout: 10000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json',
    // Add any custom headers you need here
  },
});

export const algoAxiosInstance = axios.create({
  baseURL: ALGORIXMO_MAIN_API, // Replace with your API's base URL
  timeout: 10000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json',
    // Add any custom headers you need here
  },
});