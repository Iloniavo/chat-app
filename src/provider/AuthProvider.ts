import {CreateUser, LogUser, UserData} from "../utils/type";
import { globalAxios as axios } from "../config/axiosConf";

export const createUser = (user: CreateUser) => {
  return axios.post("/users", user);
};

export const loginWithEmail = (user: LogUser) => {
  return axios.post("/users/login", user);
};

export const getCurrentUserInfo = async (token: string) => {
  let req = await axios.get<UserData>("/user", {
    headers: {
      Authorization: `Bearer ${token}` // Ajoutez l'en-tête d'autorisation avec le token
    }
  })
  return req.data.user
}

export const updateUserInfo = (user) => {
  return axios.put("/user", user)
}

export const getAllUsers = async (token: string) => {
  return axios.get(`/users`, {
    headers: {
      Authorization: `Bearer ${token}` // Ajoutez l'en-tête d'autorisation avec le token
    }
  })
}