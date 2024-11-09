import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Avatar from './Avatar'; 
import FollowButton from './FollowButton'; 

const SuggestedFollows = ({ suggestions, onBack }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All suggestions</Text>

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.suggestionItem}>
            <View style={styles.itemAvatar}>
              <Avatar user={item} />
            </View>

            <View style={styles.itemInfo}>
              <Text style={styles.suggestionName}>{item.username}</Text>
            </View>

            <View style={styles.followSection}>
              <FollowButton userId={item.id} initialFollows={item.followers} />
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>{'<'} Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemAvatar: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#808080",
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 0,
  },
  itemInfo: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 18,
    fontWeight: '500',
  },
  followSection: {
    marginLeft: 16,
  },
  backButton: {
    backgroundColor: 'rgb(30, 30, 109)',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SuggestedFollows;
