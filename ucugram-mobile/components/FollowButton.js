import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import useFollow from '../hooks/useFollow'

const FollowButton = ({ userId, initialFollows }) => {
  const { follows, isFollowed, toggleFollow } = useFollow(initialFollows, userId);

  return (
    <TouchableOpacity
      style={[styles.button, isFollowed ? styles.followingButton : styles.followButton]}
      onPress={toggleFollow}
    >
      <Text style={styles.buttonText}>
        {isFollowed ? "Following" : "Follow"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  followButton: {
    backgroundColor: 'rgb(30, 30, 109)', 
  },
  followingButton: {
    backgroundColor: '#A9A9A9', 
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FollowButton;