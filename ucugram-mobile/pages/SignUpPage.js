import React from 'react';
import { View, StyleSheet } from 'react-native';
import SignUpForm from '../components/SignUpForm';

const SignUpPage = ({ navigation }) => {
  const navigateToLogin = () => navigation.navigate('Login');

  return (
    <View style={styles.container}>
      <SignUpForm goLogin={navigateToLogin} />
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

export default SignUpPage;
