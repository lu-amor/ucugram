import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import LoginForm from "../components/LoginForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = ({ navigation }) => {
  const navigateToSignUp = () => navigation.navigate("SignUp");
  const navigateToFeed = () => navigation.replace("Feed");

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log("token", token);
      if (token) {
        navigation.replace("Main", {screen: "Profile"});
      }
    };

    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <LoginForm
        createAccount={navigateToSignUp}
        onLoginSuccess={navigateToFeed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(220, 221, 230)",
  },
});

export default LoginPage;
