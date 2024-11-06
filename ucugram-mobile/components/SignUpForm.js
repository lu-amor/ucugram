import React, { useRef, useState } from "react";
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
            <View style={{ width: "48%" }}>
              <Text aria-label="name" style={styles.label}>Name</Text>
              <TextInput
                style={styles.TextInput}
                type="text"
                placeholder="Enter your name"
                ref={nameRef}
              ></TextInput>
            </View>
            <View style={{ width: "48%" }}>
              <Text aria-label="last name" style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.TextInput}
                type="text"
                placeholder="Enter your last name"
                ref={lastNameRef}
              ></TextInput>
            </View>
          </View>
          <View style={styles.field}>
            <Text aria-label="username" style={styles.label}>Username</Text>
            <TextInput
              style={styles.TextInput}
              type="text"
              placeholder="Choose a username"
              ref={userNameRef}
            ></TextInput>
          </View>
          <View style={styles.field}>
            <Text aria-label="email" style={styles.label}>email</Text>
            <TextInput
              style={styles.TextInput}
              type="email"
              placeholder="Enter your email"
              ref={emailRef}
            ></TextInput>
          </View>
          <View style={styles.field}>
            <Text aria-label="password" style={styles.label}>password</Text>
            <TextInput
              style={styles.TextInput}
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
          <View style={{ marginTop: "10px" }}>
            <TouchableOpacity style={{ font: "12px arial" }} onPress={handleGoBackBtn}>
              <Text aria-label="go login" style={styles.goLogin}>{"<"} go login</Text>
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
    field: {
        marginBottom: 15,
        width: '100%',
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
      paddingTop: 50,
  },
    createAccountButton: {
        backgroundColor: 'rgb(30, 30, 109)',
        color: 'white',
        width: '100%',
        borderRadius: 12,
        padding: 10,
        textAlign: 'center',
    }, 
    createAccountButtonText:{
      color: 'white',
      textAlign: 'center',
    },
    logoContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:20,
    },
    isologo: {
        width: '90%',
        height: '10%',
        paddingBottom: 30,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    logo: {
        width: '50%',
        height: '10%',
        marginBottom: 20,
        resizeMode: 'contain',
    },
    goLogin : {
      color:'rgb(30, 30, 109)',
      paddingTop: 20,
    },
});




export default SignUpForm;
