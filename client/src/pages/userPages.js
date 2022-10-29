import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage.js";
import DashboardPage from "./DashboardPage.js";
import EventListPage from "./EventListPage.js";
import NewEventListPage from "./NewEventListPage.js";
import AddGroomPage from "./AddGroomPage.js";
import AddMarriageInfoPage from "./AddMarriageInfoPage.js";
import AdminPrivateRoute from "../Route/AdminPrivateRoute";
import ErrorPage from "../components/Layout/ErrorPage";

function userPages() {
  return (
    <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    
    <Route path="/dashboard" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<DashboardPage />} />  </Route>

    <Route path="/event/new" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<NewEventListPage />} />  </Route>

    <Route path="/event/groom" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<AddGroomPage />} />  </Route>

    <Route path="/event/marriage" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<AddMarriageInfoPage />} />  </Route>

    <Route path="/events" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<EventListPage />} />  </Route>

    <Route path="*" element={<ErrorPage />} />

  </Routes>
  )
}

export default userPages