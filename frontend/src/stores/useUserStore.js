import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  signup: async ({ username, email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/signup", {
        username,
        email,
        password,
      });
      console.log(res);

      set({ user: res.data.user });
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      set({ loading: false });
    }
  },
  login: async ({ username, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { username, password });

      set({ user: res.data.user });
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/logout");

      toast.success(res.data.message);
      set({ user: null });
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      set({ loading: false });
    }
  },
  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/auth/me")
      set({user: res.data.user})
    } catch (error) {
      toast.error(error.response.data.error)
    } finally {
      set({ loading: false });
    }
  },
}));
