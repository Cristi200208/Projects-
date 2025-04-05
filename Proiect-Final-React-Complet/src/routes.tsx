import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Home,
  Register,
  Login,
  Navbar,
  AddFlats,
  MyFlats,
  AboutFLat,
  Favorites,
  EditFlats,
  MyProfile,
  AllUsersAdmin,
  EditSelectedUser,
  LandingPage,
} from "./pages";

const AppRoutes: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-flats" element={<AddFlats />} />
        <Route path="/my-flats" element={<MyFlats />} />
        <Route path="/about-flat/:id" element={<AboutFLat />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/edit-flat/:id" element={<EditFlats />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/all-users-admin" element={<AllUsersAdmin />} />
        <Route
          path="/edit-selected-user-admin/:id"
          element={<EditSelectedUser />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
