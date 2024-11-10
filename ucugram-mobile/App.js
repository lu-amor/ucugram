import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import Add from './pages/Add';
import Search from './pages/Search';
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
          likes: 8646,
          comments: 631,
          date: '26-10-2024'
        },
        {
          imageUrl: require('./assets/posts/21.jpg'),
          description: 'sunsetssss',
          likes: 1000,
          comments: 453,
          date: '29-10-2024'
        },
        {
          imageUrl: require('./assets/posts/15.jpg'),
          description: 'work from home tuesdays ☕',
          likes: 7646,
          comments: 654,
          commentsArray: [
            { id: 1, userId: 'charlotte', text: 'Love this setup!', date: '2024-10-26' },
            { id: 2, userId: 'alexander', text: 'Such a cozy vibe. ☕', date: '2024-10-29' },
            { id: 3, userId: 'mia', text: 'I need a setup like this!', date: '2024-11-01' },
            { id: 4, userId: 'john', text: 'Great place to work from home.', date: '2024-11-01' },
            { id: 5, userId: 'emily', text: 'Where did you get that mug? 😍', date: '2024-11-02' },
            { id: 6, userId: 'laurent', text: 'Looks so comfortable!', date: '2024-11-03' },
            { id: 7, userId: 'charlotte', text: 'Thanks everyone! 😊', date: '2024-11-03' },
            { id: 8, userId: 'alexander', text: 'Where did you get that chair? 😍', date: '2024-11-03' },
            { id: 9, userId: 'charlotte', text: 'I got it from a local shop! 😊', date: '2024-11-03' },
            { id: 10, userId: 'mia', text: 'I love your workspace! 😍', date: '2024-11-03' },
            { id: 11, userId: 'charlotte', text: 'Thank you! 😊', date: '2024-11-03' },
            { id: 12, userId: 'john', text: 'I love your workspace! 😍', date: '2024-11-03' }
          ],
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
          likes: 9864,
          comments: 1365,
          date: '25-10-2024'
        },
        {
          imageUrl: require('./assets/posts/4.jpg'),
          description: 'the future is now',
          likes: 6458,
          comments: 896,
          date: '27-10-2024'
        },
        {
          imageUrl: require('./assets/posts/26.jpg'),
          description: 'redecorated my room :)',
          likes: 8414,
          comments: 987,
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
          likes: 6465,
          comments: 948,
          date: '25-10-2024'
        },
        {
          imageUrl: require('./assets/posts/7.jpg'),
          description: 'coding is life',
          likes: 697,
          comments: 354,
          date: '27-10-2024'
        },
        {
          imageUrl: require('./assets/posts/10.jpg'),
          description: 'coding is love',
          likes: 986,
          comments: 98,
          date: '01-11-2024'
        },
        {
          imageUrl: require('./assets/posts/11.jpg'),
          description: 'thanks for the support',
          likes: 8965,
          comments: 100,
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
          likes: 986,
          comments: 98,
          date: '06-10-2024'
        },
        {
          imageUrl: require('./assets/posts/1.jpg'),
          description: 'wonderful day',
          likes: 74565,
          comments: 6554,
          date: '27-10-2024'
        },
        {
          imageUrl: require('./assets/posts/3.jpg'),
          description: 'meet me at midnight',
          likes: 631,
          comments: 61,
          date: '01-11-2024'
        },
        {
          imageUrl: require('./assets/posts/23.jpg'),
          description: 'sunset in the city',
          likes: 698,
          comments: 418,
          date: '04-11-2024'
        },
        {
          imageUrl: require('./assets/posts/9.jpg'),
          description: 'good morning chicago',
          likes: 8942,
          comments: 755,
          date: '05-11-2024'
        },
        {
          imageUrl: require('./assets/posts/19.jpg'),
          description: 'day at the beach',
          likes: 54,
          comments: 455,
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
          likes: 98716,
          comments: 8761,
          date: '06-10-2024'
        },
        {
          imageUrl: require('./assets/posts/5.jpg'),
          description: 'sunrise in venice',
          likes: 2492,
          comments: 896,
          date: '27-10-2024'
        },
        {
          imageUrl: require('./assets/posts/8.jpg'),
          description: 'touristing around',
          likes: 554,
          comments: 15,
          date: '06-10-2024'
        },
        {
          imageUrl: require('./assets/posts/14.jpg'),
          description: 'reset sunday',
          likes: 53,
          comments: 684,
          date: '27-10-2024'
        },
        {
          imageUrl: require('./assets/posts/16.jpg'),
          description: 'afternoon tea',
          likes: 350,
          comments: 100,
          date: '06-10-2024'
        },
        {
          imageUrl: require('./assets/posts/20.jpg'),
          description: 'it\'s nice to have a friend',
          likes: 68,
          comments: 965,
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
          likes: 6415,
          comments: 948,
          date: '06-10-2024'
        },
        {
          imageUrl: require('./assets/posts/15.jpg'),
          description: 'creative day',
          likes: 653,
          comments: 65,
          date: '27-10-2024'
        },
        {
          imageUrl: require('./assets/posts/17.jpg'),
          description: 'lots of inspiration around here',
          likes: 6354,
          comments: 10,
          date: '01-11-2024'
        },
        {
          imageUrl: require('./assets/posts/18.jpg'),
          description: '',
          likes: 60,
          comments: 15,
          date: '04-11-2024'
        },
        {
          imageUrl: require('./assets/posts/22.jpg'),
          description: 'is there ever too much green?',
          likes: 10,
          comments: 22,
          date: '05-11-2024'
        },
        {
          imageUrl: require('./assets/posts/25.jpg'),
          description: 'sweater weather',
          likes: 100,
          comments: 35,
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
        <Stack.Screen name="Feed" component={Feed} initialParams={{ user, allFriendPosts, friends }} options={{ headerShown: false }} />
        {friends.map((friend, index) => (
          <Stack.Screen 
            key={index} 
            name={friend.username} 
            component={FriendProfile} 
            initialParams={{ user, friend, posts: allFriendPosts }} 
            options={{ headerShown: false }} 
          />
        ))}
        <Stack.Screen name="Search" component={Search} initialParams={{ friends, user }} options={{ headerShown: false }} />
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