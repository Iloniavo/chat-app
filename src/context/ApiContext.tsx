import React, {
  useContext,
  createContext,
  SetStateAction,
  useState,
  Dispatch,
} from "react";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface ApiProps {
  userToken: string;
  setUserToken: Dispatch<SetStateAction<string>>;
  client: AxiosInstance;
}

export const ApiContext = createContext<ApiProps>({
  setUserToken: (): string => "",
  userToken: "",
  client: axios.create(),
});

export const ApiContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");
  const client = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return (
    <ApiContext.Provider value={{ userToken, setUserToken, client }}>
      {children}
    </ApiContext.Provider>
  );
};
