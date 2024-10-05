import React from "react";
import FeedPage from "./pages/feedPage/feedPage";
import MyProfile from "./pages/myProfile/myProfile";
import FriendProfile from "./pages/friendProfile/friendProfile";
import SideNavBar from "./components/sideNavBar/sideNavBar";
import HomePage from "./pages/homePage/HomePage";
import Avatar from "./components/avatar/avatar";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const user = {
    profilePhoto: "/ucugram-logo.png",
    name: "nombre_ususario",
    posts: 11, // después esto va a ser una lista por ej.
    friends: 17, // lista o dict con usuarios amigos
    description: "This is the best app I have ever seen! 😊",
  };

  const friend = {
    profilePhoto: "/profile_img-by-AI.jpeg",
    name: "nombre_amigo",
    posts: 1.861, // después esto va a ser una lista por ej.
    friends: 454, // lista o dict con usuarios amigos
    description: "This is my profile description 😊",
  };

  return (
    <Routes>
      {/* esto es para que vaya por defecto a la pagina de welcome */}
      <Route path="/*" element={<Navigate replace to="/home" />} />
      
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/myProfile" element={<MyProfile user={user} />}></Route>
        <Route
          path="/friendProfile"
          element={<MyProfile user={friend} />}
        ></Route>

    </Routes>
  );
}

export default App;
