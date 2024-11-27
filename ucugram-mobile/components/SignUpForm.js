import React, { useRef } from "react";
import { TouchableOpacity, View, StyleSheet, Image, TextInput, Text } from "react-native";

function SignUpForm({ goLogin }) {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  const nameRef = useRef("");
  const lastNameRef = useRef("");

  const PASSWORD_WARNING = "Password must be at least 10 characters";

  const handleGoBackBtn = () => {
    goLogin();
  };

  const validateEmail = (email) => {
    const ucuEmailPattern = /^[a-zA-Z0-9._%+-]+@(ucu\.edu\.uy|correo\.ucu\.edu\.uy)$/;
    return ucuEmailPattern.test(email);
  };

  const handleCreateAccountBtn = () => {
    const newEmail = emailRef.current.value;
    const newPassword = passwordRef.current.value;
    const newUserName = userNameRef.current.value;
    const newName = nameRef.current.value;
    const newLastName = lastNameRef.current.value;

    if (!validateEmail(newEmail)) {
      alert("Por favor, ingresa un email válido de la UCU.");
      return;
    }

    // more logic here

    goLogin();
  };

  return (
      <View style={styles.content}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/ucugram-logo.png')} style={styles.logo} />
            <Image
              source={require('../assets/ucugram-text-sinFondo.png')}
              style={styles.isologo}
            />
          </View>
          <View style={styles.userInfoContainer}>
            <View style={[styles.field, { width: "48%" }]}>
              <Text aria-label="name" style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                type="text"
                placeholder="Enter your name"
                ref={nameRef}
              ></TextInput>
            </View>
            <View style={[styles.field, { width: "48%" }]}>
              <Text aria-label="last name" style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                type="text"
                placeholder="Enter your last name"
                ref={lastNameRef}
              ></TextInput>
            </View>
          </View>
          <View style={styles.field}>
            <Text aria-label="username" style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              type="text"
              placeholder="Choose a username"
              ref={userNameRef}
            ></TextInput>
          </View>
          <View style={styles.field}>
            <Text aria-label="email" style={styles.label}>email</Text>
            <TextInput
              style={styles.input}
              type="email"
              placeholder="Enter your email"
              ref={emailRef}
            ></TextInput>
          </View>
          <View style={styles.field}>
            <Text aria-label="password" style={styles.label}>password</Text>
            <TextInput
              style={styles.input}
              type="password"
              placeholder="Enter a password"
              title={PASSWORD_WARNING}
              ref={passwordRef}
            ></TextInput>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccountBtn}>
              <Text aria-label="Create new account" style={styles.createAccountButtonText}>Create new account</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: "15px" }}>
            <TouchableOpacity style={{ font: "12px arial" }} onPress={handleGoBackBtn}>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.createAccountText}>Already have an account?  </Text>
                <Text style={styles.hereText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};


const styles = StyleSheet.create({
    content: {
        backgroundColor: 'rgb(220, 221, 230)',
        padding: 20, 
        borderRadius: 10,
        width: '100%',
        height: 'auto',
        maxHeight: '80%',
        overflow: 'hidden',
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
      fontSize: 14,
      fontWeight: 600,
      color: "rgb(30, 30, 109)",
      marginBottom: 5,
    },
    input: {
      width: "100%",
      marginTop: 3,
      fontSize: 18,
    },
    field: {
      marginBottom: 20,
      width: "100%",
      fontSize: 16,
      borderBottomColor: "rgb(30, 30, 109)",
      borderBottomWidth: 1,
      padding: 3,
    },
    userInfoContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      width: '100%',
      marginTop: 10,
      paddingTop: 30,
  },
    createAccountButton: {
        backgroundColor: 'rgb(30, 30, 109)',
        width: '100%',
        borderRadius: 12,
        padding: 10,
        marginBottom: 15,
    }, 
    createAccountButtonText:{
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
    logoContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:20,
    },
    isologo: {
      width: "90%",
      height: "12%",
      paddingBottom: 30,
      resizeMode: "contain",
    },
    logo: {
      width: "55%",
      height: "11%",
      marginBottom: 12,
      resizeMode: "contain",
    },
    buttonTextContainer: {
      flexDirection: "row",
    },
    createAccountText: {
      color: "rgb(30, 30, 109)",
      fontSize: 16,
    },
    hereText: {
      color: "rgb(30, 30, 109)",
      fontWeight: "bold",
      fontSize: 16,
    },
});




export default SignUpForm;
