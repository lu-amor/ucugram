import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SuggestionsPreview from './SuggestionsPreview';

const Suggestions = ({suggestedFollows, navigation}) => {
return (
    <View style={styles.container}>
      <SuggestionsPreview suggestions={suggestedFollows} />
      <View style={styles.footer}>
       {/* onPress={() => navigation.navigate('SuggestedFriends',{suggestedFollows})}  */}
      <TouchableOpacity onPress={() => navigation.navigate('SuggestedFriends')} style={styles.showAllButton}>
        <Text style={styles.showAllButtonText}>See all</Text>    
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  showAllButton: {
    backgroundColor: 'rgb(30, 30, 109)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  showAllButtonText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Suggestions;