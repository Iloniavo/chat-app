import { create } from "zustand";
import { CreateUser, LogUser, UserData } from "../utils/type";
import { createJSONStorage, persist } from "zustand/middleware";
import { loginWithEmail, createUser } from "../provider/AuthProvider";

type State = {
  userLogged: UserData ;
  token: string

};

type Actions = {
  createUser: (user: CreateUser) => Promise<void>;
  userLogin: (user: LogUser) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
        userLogged: null,
      createUser: async (user) => {
        try {
          await createUser(user).then((response: any) =>
            set({ userLogged: response?.data?.user, token: response?.data.user.token })
          );
        } catch (e) {
          throw e;
        }
      },
      userLogin: async (user) => {
        loginWithEmail(user)
          .then((response: any) => {
            console.log(response.data);
            set({ userLogged: response?.data?.user  });
          })
          .catch((error) => console.log(error));
      },
      logout: () => set({ userLogged: null }),
    }),
    {
      name: "simple-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ userLogged: state.userLogged }),
    }
  )
);
