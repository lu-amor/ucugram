import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import Add from './pages/Add';
import Notifications from './pages/Notifications';
import FriendProfile from './pages/FriendProfile';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    const user = {
        username: 'username', 
        profilePicture: require('./assets/profile_img-by-AI.jpeg'),
        posts: 15,
        followers: 250,
        bio: 'I love this app so much'
    };

  const friends = [
    {
      username: 'charlotte', 
      profilePicture: require('./assets/pfps/charlotte_profile_img-by-AI.jpeg'),
      posts: 3,
      followers: 315,
      bio: 'I love travelling around europe',
      posts: [
        {
          imageUrl: require('./assets/posts/charlotte_post_img-by-AI.jpeg'),
          description: 'Lovely town in europe',
          date: '26-10-2024'
        },
        {
          imageUrl: require('./assets/posts/21.jpg'),
          description: 'sunsetssss',
          date: '29-10-2024'
        },
        {
          imageUrl: require('./assets/posts/15.jpg'),
          description: 'work from home tuesdays ☕',
          date: '31-10-2024'
        }
      ]
    },
    {
      username: 'alexander', 
      profilePicture: require('./assets/pfps/alexander.jpeg'),
      posts: 3,
      followers: 421,
      bio: 'work hard play hard',
      posts: [
        {
          imageUrl: require('./assets/posts/6.jpg'),
          description: 'radioactive',
          date: '25-10-2024'
        },
        {
          imageUrl: require('./assets/posts/4.jpg'),
          description: 'the future is now',
          date: '27-10-2024'
        },
        {
          imageUrl: require('./assets/posts/26.jpg'),
          description: 'redecorated my room :)',
          date: '01-11-2024'
        }
      ]
    },
    {
      username: 'mia', 
      profilePicture: require('./assets/pfps/mia.jpeg'),
      posts: 4,
      followers: 150,
      bio: 'architecture enthusiast',
      posts: [
        {
          imageUrl: require('./assets/posts/27.jpg'),
          description: 'morning coffee',
          date: '25-10-2024'
        },
        {
          imageUrl: require('./assets/posts/7.jpg'),
          description: 'coding is life',
          date: '27-10-2024'
        },
        {
          imageUrl: require('./assets/posts/10.jpg'),
          description: 'coding is love',
          date: '01-11-2024'
        },
        {
          imageUrl: require('./assets/posts/11.jpg'),
          description: 'thanks for the support',
          date: '02-11-2024'
        }
      ]
    },
    {
      username: 'john', 
      profilePicture: require('./assets/pfps/john.jpeg'),
      posts: 6,
      followers: 100,
      bio: 'your travel buddy',
      posts: [
        {
          imageUrl: require('./assets/posts/12.jpg'),
          description: 'a lot of green around here',
          date: '06-10-2024'
        },
        {
          imageUrl: require('./assets/posts/1.jpg'),
          description: 'wonderful day',
          date: '27-10-2024'
        },
        {
          imageUrl: require('./assets/posts/3.jpg'),
          description: 'meet me at midnight',
          date: '01-11-2024'
        },
        {
          imageUrl: require('./assets/posts/23.jpg'),
          description: 'sunset in the city',
          date: '04-11-2024'
        },
        {
          imageUrl: require('./assets/posts/9.jpg'),
          description: 'good morning chicago',
          date: '05-11-2024'
        },
        {
          imageUrl: require('./assets/posts/19.jpg'),
          description: 'day at the beach',
          date: '08-11-2024'
        }
      ]
    },
    {
      username: 'emily', 
      profilePicture: require('./assets/pfps/emily.jpeg'),
      posts: 6,
      followers: 7065,
      bio: 'the netflix show is indeed about me :)',
      posts: [
        {
          imageUrl: require('./assets/posts/2.jpg'),
          description: 'discovered this new cafe',
          date: '06-10-2024'
        },
        {
          imageUrl: require('./assets/posts/5.jpg'),
          description: 'sunrise in venice',
          date: '27-10-2024'
        },
        {
          imageUrl: require('./assets/posts/8.jpg'),
          description: 'touristing around',
          date: '06-10-2024'
        },
        {
          imageUrl: require('./assets/posts/14.jpg'),
          description: 'reset sunday',
          date: '27-10-2024'
        },
        {
          imageUrl: require('./assets/posts/16.jpg'),
          description: 'afternoon tea',
          date: '06-10-2024'
        },
        {
          imageUrl: require('./assets/posts/20.jpg'),
          description: 'it\'s nice to have a friend',
          date: '27-10-2024'
        }
      ]
    },
    {
      username: 'laurent', 
      profilePicture: require('./assets/pfps/laurent.jpeg'),
      posts: 6,
      followers: 100,
      bio: 'the world is my oyster',
      posts: [
        {
          imageUrl: require('./assets/posts/13.jpg'),
          description: 'new collection soon...', 
          date: '06-10-2024'
        },
        {
          imageUrl: require('./assets/posts/15.jpg'),
          description: 'creative day',
          date: '27-10-2024'
        },
        {
          imageUrl: require('./assets/posts/17.jpg'),
          description: 'lots of inspiration around here',
          date: '01-11-2024'
        },
        {
          imageUrl: require('./assets/posts/18.jpg'),
          description: '',
          date: '04-11-2024'
        },
        {
          imageUrl: require('./assets/posts/22.jpg'),
          description: 'is there ever too much green?',
          date: '05-11-2024'
        },
        {
          imageUrl: require('./assets/posts/25.jpg'),
          description: 'sweater weather',
          date: '08-11-2024'
        }
      ]
    }
  ];

  const allFriendPosts = friends.flatMap(friend => 
    friend.posts.map(post => ({
      ...post,
      username: friend.username,
      profilePicture: friend.profilePicture
    }))
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Feed" component={Feed} initialParams={{ user, allFriendPosts }} options={{ headerShown: false }} />
        {friends.map((friend, index) => (
          <Stack.Screen 
            key={index} 
            name={friend.username} 
            component={FriendProfile} 
            initialParams={{ user, friend, posts: allFriendPosts }} 
            options={{ headerShown: false }} 
          />
        ))}
        <Stack.Screen name="Add" component={Add} initialParams={{ user }} options={{ headerShown: false }} />
        <Stack.Screen name="Notifications" component={Notifications} initialParams={{ user }} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} initialParams={{ user }} options={{ headerShown: false }} />
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