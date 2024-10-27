import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import PostItem from './components/PostItem';

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
        <View style={styles.container}>
            {/* <Profile user={user} posts={posts} /> */}
            {/* <PostItem post={posts[0]} user={user} /> */}
            <Feed user={user} posts={posts} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
  },
});