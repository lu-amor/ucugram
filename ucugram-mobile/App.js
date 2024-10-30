import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import Add from './pages/Add';
import Notifications from './pages/Notifications';
import PostItem from './components/PostItem';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    const posts = [
      {
        imageUrl: require('./assets/post_img-by-AI.jpeg'),
        description: 'This is a post with a very long description that wraps',
        date: '26-10-2024'
      },
      {
        imageUrl: require('./assets/post_img-by-AI.jpeg'),
        description: 'This is a post with a very long description that wraps',
        date: '26-10-2024'
      },
      {
        imageUrl: require('./assets/post_img-by-AI.jpeg'),
        description: 'This is a post with a very long description that wraps',
        date: '26-10-2024'
      },
      {
        imageUrl: require('./assets/post_img-by-AI.jpeg'),
        description: 'This is a post with a very long description that wraps',
        date: '26-10-2024'
      },
      {
        imageUrl: require('./assets/post_img-by-AI.jpeg'),
        description: 'This is a post with a very long description that wraps',
        date: '26-10-2024'
      },
      {
        imageUrl: require('./assets/post_img-by-AI.jpeg'),
        description: 'This is a post with a very long description that wraps',
        date: '26-10-2024'
      },
      {
        imageUrl: require('./assets/post_img-by-AI.jpeg'),
        description: 'This is a post with a very long description that wraps',
        date: '26-10-2024'
      },
      {
        imageUrl: require('./assets/post_img-by-AI.jpeg'),
        description: 'This is a post with a very long description that wraps',
        date: '26-10-2024'
      },
      {
        imageUrl: require('./assets/post_img-by-AI.jpeg'),
        description: 'This is a post with a very long description that wraps',
        date: '26-10-2024'
      }
    ];

    const user = {
        username: 'username', 
        profilePicture: require('./assets/profile_img-by-AI.jpeg'),
        posts: 15,
        followers: 250,
        bio: 'I love this app so much'
    };

    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen name="Feed" component={Feed} initialParams={{ user, posts }} options={{headerShown: false}} />
                <Stack.Screen name="Profile" component={Profile} initialParams={{ user, posts }} options={{headerShown: false}} />
                <Stack.Screen name="Add" component={Add} initialParams={{ user, posts }} options={{headerShown: false}} />
                <Stack.Screen name="Notifications" component={Notifications} initialParams={{ user, posts }} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});