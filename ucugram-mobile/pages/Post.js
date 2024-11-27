import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

const Post = () => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator 
          size="large" 
          color="#007bff" 
          style={styles.loader} 
        />
      )}
        <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <View style={styles.container}>
          <FeedPost post={post} user={user} navigation={navigation} />
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});

export default Post;
