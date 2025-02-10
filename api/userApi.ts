import Cookies from "js-cookie";
import type { UpdateUserData } from "./user";
import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:5001";
const token = Cookies.get("token");

export const userApi = {
  login: async (email: string, password: string): Promise<AxiosResponse> => {
    const response = await axios.post(`${API_BASE_URL}/user/login`, {
      email,
      password,
    });
    if (response.status != 200) throw new Error("Failed to login");
    console.log(response);
    return response;
  },

  createUser: async (
    email: string,
    name: string,
    password: string
  ): Promise<AxiosResponse> => {
    const response = await axios.post(`${API_BASE_URL}/user/register`, {
      email,
      name,
      password,
    });
    console.log(response);
    return response;
  },

  fetchUsers: async (): Promise<AxiosResponse> => {
    const response = await axios.get(`${API_BASE_URL}/user/fetch-user-data`);
    console.log(response);
    return response;
  },

  updateUser: async (data: UpdateUserData): Promise<AxiosResponse> => {
    const response = await axios.put(
      `${API_BASE_URL}/user/update-user-data`,
      data,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    return response;
  },
  isAutenticated: async () => {
    const token = Cookies.get("token");
    try {
      const res = await axios.get(`${API_BASE_URL}/user/check-token`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log("isAutenticated :", res);
      return {
        data: {
          id: res.data.data.id,
          email: res.data.data.email,
          name: res.data.data.name,
        },
      };
    } catch (error) {
      console.log("Error pada isAutenticated:", error);
      return null;
    }
  },
};
