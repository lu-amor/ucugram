import React from "react";
import FeedPage from "./pages/feedPage/feedPage";
import MyProfile from "./pages/myProfile/myProfile";
import FriendProfile from "./pages/friendProfile/friendProfile";
import SideNavBar from "./components/sideNavBar/sideNavBar";
// import LoginPage from './pages/loginPage/loginPage'
import Avatar from "./components/avatar/avatar";

function App() {
  const user = {
    profilePhoto: "/ucugram-logo.png",
    name: "nombre_ususario",
    posts: 11, // después esto va a ser una lista por ej. 
    friends: 17 // lista o dict con usuarios amigos
  };
  return (
    <>
      <MyProfile
        user={user}
      />
    </>
  );
}

export default App;
