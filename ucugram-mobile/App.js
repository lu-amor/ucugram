import React from "react";
import Post from './pages/Post'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet } from "react-native";
import { View, StyleSheet, Image } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import Add from "./pages/Add";
import Feed from "./pages/Feed";
import LogInPage from "./pages/LogInPage";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import SignUpPage from "./pages/SignUpPage";
import SuggestedFriends from "./pages/SuggestedFriends";
import FriendProfile from "./pages/FriendProfile";
import NavBar from "./components/NavBar";
import { useRoute } from "@react-navigation/native";
import { useNavigationState } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
export const url = "http://172.20.10.2:3001/api/";

function StackNavigatorComponent() {
  const route = useRoute();
  const isLoginPage = route.name === "Login";
  const isSignUpPage = route.name === "SignUp";
  const showNavBar = !isLoginPage && !isSignUpPage;

  const activePage = useNavigationState((state) => {
    const route = state.routes[state.index];
    return route.name;
  });

  const user = {
    username: "John Doe",
    profilePicture: "https://example.com/profile.jpg",
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="FriendProfile"
          component={FriendProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="SuggestedFriends"
          component={SuggestedFriends}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          initialParams={{ user }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: "none",
          }}
        />
      </Stack.Navigator>
      {showNavBar && <NavBar activePage={activePage} />}
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LogInPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={StackNavigatorComponent}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ProfileProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImage: {
    width: "100%", // La imagen ocupará todo el ancho
    height: "100%", // La imagen ocupará toda la altura del header
    //   resizeMode: "contain", // Ajusta la imagen sin deformarla
  },
});
