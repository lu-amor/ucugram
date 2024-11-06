import "bulma/css/bulma.min.css";
import React, { createContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "ucugram/src/App.css";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import AuthPage from "./pages/authPage/AuthPage";
import DocPage from "./pages/DocPage/DocPage";
import FeedPage from "./pages/feedPage/feedPage";
import FriendProfile from "./pages/friendProfile/friendProfile";
import MyProfile from "./pages/myProfile/myProfile";
import Notifications from "./pages/notifications/notifications";
import { AuthProvider } from "./context/AuthContext";
import { useAuth, AUTH_ACTIONS } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";

export const url = "http://localhost:3001/api/";

function App() {
  const notificationsList = [
    {
      id: 1,
      type: "like",
      user: {
        profilePhoto: "/profile_img-by-AI.jpeg",
        name: "nombre_amigo",
        posts: 1.861, // después esto va a ser una lista por ej.
        friends: 454, // lista o dict con usuarios amigos
        description: "This is my profile description 😊",
      },
      time: "2h",
    },
    {
      id: 2,
      type: "follow",
      user: {
        profilePhoto: "/profile_img-by-AI.jpeg",
        name: "nombre_amigo",
        posts: 1.861, // después esto va a ser una lista por ej.
        friends: 454, // lista o dict con usuarios amigos
        description: "This is my profile description 😊",
      },
      time: "2h",
    },
  ];

  const user = {
    profilePicture: "/ucugram-logo.png",
    name: "nombre_ususario",
    posts: 11, // después esto va a ser una lista por ej.
    friends: 17, // lista o dict con usuarios amigos
    description: "This is the best app I have ever seen! 😊",
  };

  const friend = {
    profilePicture: "/profile_img-by-AI.jpeg",
    name: "nombre_amigo",
    posts: 1.861, // después esto va a ser una lista por ej.
    friends: 454, // lista o dict con usuarios amigos
    description: "This is my profile description 😊",
  };

  const developers = [
    {
      name: "Manuela",
      avatar: "../public/profile_img-by-AI.jpeg",
      github: "manuela",
      mail: "manuela.guedez@correo.ucu.edu.uy",
      linkedin: "ManuGuedez",
    },
    {
      name: "Paulina",
      avatar: "../public/profile_img-by-AI.jpeg",
      github: "paulina",
      mail: "paulina.vidal@correo.ucu.edu.uy",
      linkedin: "PaulinaVidal22",
    },
    {
      name: "Lucía",
      avatar: "../public/profile_img-by-AI.jpeg",
      github: "https://github.com/lu-amor",
      mail: "lucia.amor@correo.ucu.edu.uy",
      linkedin: "https://www.linkedin.com/in/luc%C3%ADa-amor-9183192b4/",
    },
  ];

  return (
    <AuthProvider>
      <ProfileProvider>
        <Routes>
          {/* esto es para que vaya por defecto a la pagina de home */}
          <Route path="/*" element={<Navigate replace to="/home" />} />

          <Route path="/home" element={<AuthPage />}></Route>
          <>
            <Route
              path="/myProfile"
              element={<MyProfile user1={user} />}
            ></Route>
            <Route
              path="/friendProfile/:username"
              element={<FriendProfile user={friend} />}
            ></Route>
            <Route path="/feed" element={<FeedPage />}></Route>
            <Route
              path="/notifications"
              element={
                <Notifications
                  user={user}
                  notificationsList={notificationsList}
                />
              }
            ></Route>
          </>
          <Route path="/documentation" element={<DocPage />}></Route>
          <Route
            path="/about-us"
            element={<AboutUsPage developers={developers} />}
          ></Route>
        </Routes>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
