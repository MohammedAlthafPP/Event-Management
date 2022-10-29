import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserPages from "./pages/userPages";
import store from "./redux/store";
import { loadUser } from "./redux/action/userAction";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import ErrorPage from "./components/Layout/ErrorPage";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<UserPages />} />
        <Route path="/events/:id" element={<HomePage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
         
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
