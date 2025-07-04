import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import Login from "./pages/Login";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import NoteDetails from "./pages/NoteDetails";

function App() {
  const { user, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/signup"
          element={user ? <Navigate to={"/"} /> : <Signup />}
        ></Route>
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        ></Route>
        <Route path="/:noteId" element={<NoteDetails />}></Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
