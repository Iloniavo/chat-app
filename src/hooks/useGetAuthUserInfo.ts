import { UserData } from "../utils/type";

export const useGetAuthUserInfo = (): UserData => {
  return JSON.parse(localStorage.getItem("userInfo"));
};
