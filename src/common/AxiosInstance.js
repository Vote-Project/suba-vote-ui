import axios from 'axios';
import { MAIN_API } from './const';

// Create an Axios instance with custom configuration, if needed
export const axiosInstance = axios.create({
  baseURL: MAIN_API, // Replace with your API's base URL
  timeout: 5000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json',
    // Add any custom headers you need here
  },
});