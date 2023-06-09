import { CreateUser, LogUser, UserData } from "../utils/type";
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
      Authorization: `Bearer ${token}`, // Ajoutez l'en-tête d'autorisation avec le token
    },
  });
  return req.data.user;
};

export const updateUserInfo = (user, token) => {
  return axios.put("/user", user, {
    headers: {
      Authorization: `Bearer ${token}`, // Ajoutez l'en-tête d'autorisation avec le token
    },
  });
};

export const getAllUsers = async (token: string) => {
  let req = await axios.get(`/users`, {
    headers: {
      Authorization: `Bearer ${token}`, // Ajoutez l'en-tête d'autorisation avec le token
    },
  });
  return req.data.users;
};
