import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ navigation }) => {
  const navigateToSignUp = () => navigation.navigate('SignUp');
  const navigateToFeed = () => navigation.replace('Feed');

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(220, 221, 230)',
  },
});

export default LoginPage;
