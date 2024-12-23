import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import NavBar from "../components/NavBar";
import FeedPost from "../components/FeedPost";
import Suggestions from "../components/Suggestions";
import useFetchPosts from "../hooks/useFetchPosts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const Feed = ({ navigation }) => {
  const { fetchPosts, posts, loading, error } = useFetchPosts();
  const { state: authState } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigation.navigate("Login");
    }
    const removeFriendId = async () => {
      await AsyncStorage.removeItem("friend-id");
    };
    removeFriendId();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefresh(!refresh);
    await fetchPosts(); // Llama a la función para recargar los posts
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.content}
      >
        <Image
          source={require("../assets/ucugram texto.png")}
          style={styles.headerImage}
        />
        {refreshing && <ActivityIndicator size={20} color="white" />}
        <Suggestions navigation={navigation} refreshing={refreshing} />
        {loading ? (
          <ActivityIndicator size={50} color="black" />
        ) : (
          posts?.map((post) => (
            <FeedPost key={post._id} post={post} navigation={navigation} />
          ))
        )}
      </ScrollView>
      {/* <NavBar user={authState.user} activePage="home" navigation={navigation} /> */}
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
    height: screenWidth > 450 ? 70 : 30,
    alignSelf: "center",
    marginTop: 20,
  },
  content: {
    maxWidth: screenWidth > 450 ? "90%" : "100%",
  },
});

export default Feed;
