import React, { useEffect } from "react";
import { View, Image, StyleSheet, ScrollView, Text } from "react-native";
import NavBar from "../components/NavBar";
import FeedPost from "../components/FeedPost";
import Suggestions from "../components/Suggestions";
import useFetchPosts from "../hooks/useFetchPosts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";

const Feed = ({ navigation, route }) => {
  const { posts, loading, error } = useFetchPosts();
  const { state: authState } = useAuth();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigation.navigate("Login");
    }
    const removeFriendId = async () => {
      await AsyncStorage.removeItem("friend-id");
    };
    removeFriendId();
  }, []);

  useEffect(() => {
    if (posts) {
      console.log("are loading: ", loading, "posts", posts);
    }
  }, [posts]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={require("../assets/ucugram texto.png")}
          style={styles.headerImage}
        />

        <Suggestions navigation={navigation} />
        {loading ? (
          <Text>loading posts...</Text>
        ) : (
          posts?.map((post) => (
            <FeedPost
              key={post._id}
              post={post}
              navigation={navigation}
            />
          ))
        )}
        {/* {!loading &&
          !error &&
          posts &&
          posts.map((post) => (
            <FeedPost
              key={post._id}
              post={post}
              user={{
                username: post.username,
                profilePicture: post.profilePicture,
              }}
              navigation={navigation}
            />
          ))} */}
      </ScrollView>
      <NavBar user={authState.user} activePage="home" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 45,
  },
  headerImage: {
    width: "40%",
    height: 30,
    alignSelf: "center",
    marginTop: 15,
  },
});

export default Feed;
