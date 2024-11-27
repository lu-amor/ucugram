import React from 'react';
import { View, StyleSheet } from 'react-native';
import FeedPost  from '../components/FeedPost';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const Post = ({route, navigation}) => {
    const {user, post} = route.params;

    const handleGesture = (event) => {
        if (event.nativeEvent.translationX > 100) {
          navigation.navigate('Profile'); 
        }
      };

    return (
        <GestureHandlerRootView style={styles.container}>
        <PanGestureHandler onGestureEvent={handleGesture}>
          <View style={styles.container}>
            <FeedPost post={post} user={user} navigation={navigation} />
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });

export default Post;