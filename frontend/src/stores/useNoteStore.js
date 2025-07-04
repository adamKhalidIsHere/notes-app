import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axios.js";

export const useNoteStore = create((set) => ({
  notes: [],
  singleNote: null,
  loading: false,
  getNotes: async () => {
    set({ loading: true });

    try {
      const res = await axios.get("/notes/");
      set({ notes: res.data.notes });
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      set({ loading: false });
    }
  },
  createNote: async ({ title, content }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/notes/create", { title, content });

      set((state) => ({ notes: state.notes.push(res.data.note) }));
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      set({ loading: false });
    }
  },
  getOneNote: async (noteId) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/notes/${noteId}`);

      set({ singleNote: res.data.note });
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      set({ loading: false });
    }
  },
  updateNote: async ({ noteId, title, content }) => {
    set({ loading: true });

    try {
      const res = await axios.patch(`/notes/update/${noteId}`, {
        title,
        content,
      });

      set((state) => ({
        notes: state.notes.map((note) =>
          note._id === noteId ? { ...note, title, content } : note
        ),
      }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      set({ loading: false });
    }
  },
  deleteNote: async (noteId) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`/notes/delete/${noteId}`);

      set((state) => ({
        notes: state.notes.filter((note) => note._id !== noteId),
      }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      set({ loading: false });
    }
  },
}));
