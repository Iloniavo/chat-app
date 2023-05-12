import { create } from "zustand";

export interface LoginState {
  name: string;
  picUrl: string;
  email: string;
  password: string;
  bio: string;
  setName: (param: string) => void;
  setPicUrl: (param: string) => void;
  setEmail: (param: string) => void;
  setPassword: (param: string) => void;
  setBio: (param: string) => void;
}

export const useLoginStore = create<LoginState>()((set) => ({
  name: "",
  picUrl: "",
  email: "",
  password: "",
  bio: "",
  setName: (param: string) => set(() => ({ name: param })),
  setPicUrl: (param: string) => set(() => ({ picUrl: param })),
  setEmail: (param: string) => set(() => ({ email: param })),
  setPassword: (param: string) => set(() => ({ password: param })),
  setBio: (param: string) => set(() => ({ bio: param })),
}));
