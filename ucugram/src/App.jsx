import React from "react";
import FeedPage from "./pages/feedPage/feedPage";
import MyProfile from "./pages/myProfile/myProfile";
import FriendProfile from "./pages/friendProfile/friendProfile";
import SideNavBar from "./components/sideNavBar/sideNavBar";
import Notifications from "./pages/notifications/notifications";
// import LoginPage from './pages/loginPage/loginPage'
import Avatar from "./components/avatar/avatar";
import Footer from "./components/footer/footer";

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
        description: "This is my profile description 😊"
      },
      time: "2h"
    },
    {
      id: 2,
      type: "follow",
      user: {
        profilePhoto: "/profile_img-by-AI.jpeg",
        name: "nombre_amigo",
        posts: 1.861, // después esto va a ser una lista por ej. 
        friends: 454, // lista o dict con usuarios amigos
        description: "This is my profile description 😊"
      },
      time: "2h"
    }
  ];

  const user = {
    profilePhoto: "/ucugram-logo.png",
    name: "nombre_ususario",
    posts: 11, // después esto va a ser una lista por ej. 
    friends: 17, // lista o dict con usuarios amigos
    description: "This is the best app I have ever seen! 😊"
  };

  const friend = {
    profilePhoto: "/profile_img-by-AI.jpeg",
    name: "nombre_amigo",
    posts: 1.861, // después esto va a ser una lista por ej. 
    friends: 454, // lista o dict con usuarios amigos
    description: "This is my profile description 😊"
  }
  return (
    <>
      {/*<Notifications user={user} notificationsList={notificationsList}/>*/}
      <Footer />
    </>
  );
}

export default App;

