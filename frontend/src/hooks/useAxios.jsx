import axios from "axios";
import { getToken } from "../utils/getToken";
import useAuth from "./useAuth";

const useAxios = () => {
  const { logout } = useAuth();
  // Base URL for the API
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
 
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        logout();
       
      }
      return Promise.reject(error);
    }
  );



  return {
    axiosInstance,
    BASE_URL,
  };
};

export default useAxios;
