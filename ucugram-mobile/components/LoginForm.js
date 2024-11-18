import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginForm({ createAccount, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const login = useLogin();
  const navigation = useNavigation();
  const { state: authState, handleReload } = useAuth();
  const [isLoading, setIsLoading] = useState();
  const handleCreateAccountBtn = () => {
    // logica para crear cuenta here
    createAccount();
  };

  const validateEmail = (email) => {
    const ucuEmailPattern =
      /^[a-zA-Z0-9._%+-]+@(ucu\.edu\.uy|correo\.ucu\.edu\.uy)$/;
    return ucuEmailPattern.test(email);
  };

  useEffect(() => {
    setIsLoading(authState.loading);
  }, [authState.loading]);

  useEffect(() => {
    const start = async () => {
      await handleReload();
      if (authState.isAuthenticated) {
        onLoginSuccess();
      }
    };
    start();
  }, [authState?.loading]);

  const handleLoginBtn = async () => {
    // if (!validateEmail(email)) {
    //   alert("Por favor, ingresa un email válido de la UCU.");
    //   return;
    // }

    const isLogged = await login(email, password);

    if (isLogged) {
      console.log("email", email);
      navigation.navigate("Profile");
    } else {
      window.alert("Email o contraseña incorrecta");
      navigation.navigate("Login");
    }

    // aca se hace algo más, logica de autenticacion

    // onLoginSuccess();
    //navigate('Feed');
  };

  return (
    <View style={styles.content}>
      <View style={styles.container}>
        {isLoading ? (
          <Text>loading profile...</Text>
        ) : (
          <>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/ucugram-logo.png")}
                style={styles.logo}
              />
              <Image
                source={require("../assets/ucugram-text-sinFondo.png")}
                style={styles.isologo}
              />
            </View>
            <View style={styles.field}>
              <Text aria-label="email" style={styles.label}>
                email
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              ></TextInput>
            </View>
            <View style={styles.field}>
              <Text aria-label="password" style={styles.label}>
                password
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              ></TextInput>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLoginBtn}
              >
                <Text aria-label="login" style={styles.loginButtonText}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{ font: "12px arial", marginBottom: "10px" }}
                onPress={handleCreateAccountBtn}
              >
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.createAccountText}>Create account </Text>
                  <Text style={styles.hereText}>here</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "rgb(220, 221, 230)",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    height: "auto",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  field: {
    marginTop: 30,
    marginBottom: 30,
    width: "100%",
  },
  loginButton: {
    backgroundColor: "rgb(30, 30, 109)",
    width: "100%",
    borderRadius: 12,
    padding: 10,
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 10,
    paddingTop: 50,
  },
  buttonTextContainer: {
    flexDirection: "row",
  },
  logoContainer: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  isologo: {
    width: "90%",
    height: "10%",
    paddingBottom: 30,
    resizeMode: "contain",
  },
  logo: {
    width: "50%",
    height: "10%",
    marginBottom: 20,
    resizeMode: "contain",
  },
  delete: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  createAccountText: {
    color: "rgb(30, 30, 109)",
  },
  hereText: {
    color: "rgb(30, 30, 109)",
    fontWeight: "bold",
  },
});

export default LoginForm;
