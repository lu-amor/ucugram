import React from 'react';
import { View, StyleSheet } from 'react-native';
import SuggestedFollows from '../components/SuggestedFollows'; 

const SuggestedFriends = ({ route, navigation }) => {

  const handleBack = () => {
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <SuggestedFollows onBack={handleBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SuggestedFriends;
