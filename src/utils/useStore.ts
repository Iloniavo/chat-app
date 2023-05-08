import { create } from "zustand";

export interface MyState {
  name: string;
  picUrl: string;
  email: string;
  password: string;
  setName: (param: string) => void;
  setPicUrl: (param: string) => void;
  setEmail: (param: string) => void;
  setPassword: (param: string) => void;
}

export const useStore = create<MyState>()((set) => ({
  name: "",
  picUrl: "",
  email: "",
  password: "",
  setName: (param: string) => set((state) => ({ name: param })),
  setPicUrl: (param: string) => set((state) => ({ picUrl: param })),
  setEmail: (param: string) => set((state) => ({ email: param })),
  setPassword: (param: string) => set((state) => ({ password: param })),
}));
