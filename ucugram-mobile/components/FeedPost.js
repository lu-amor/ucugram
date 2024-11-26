import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions,  TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Avatar from "./Avatar";
import CommentsModal from "./CommentsModal";
import { useAuth } from "../context/AuthContext";
import { useGetProfile } from "../hooks/useGetProfile";

export default function FeedPost({ post, navigation }) {
  const [liked, setLiked] = useState(false);
  const [commentsVisibility, setCommentsVisibility] = useState(false);
  const {state: authState} = useAuth();
  const getProfile = useGetProfile();  

  const scale = useSharedValue(1);
  const isZooming = useSharedValue(false);

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      isZooming.value = true;
    })
    .onUpdate((event) => {
      if (event.scale > 1) {
        scale.value = withTiming(event.scale, { duration: 0 });
      }
    })
    .onEnd(() => {
      scale.value = withTiming(1);
      isZooming.value = false;
    });

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      zIndex: isZooming.value ? 10 : 0,
      position: isZooming.value ? "absolute" : "relative",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  });

  const belowPictureStyle = useAnimatedStyle(() => {
    return {
      zIndex: isZooming.value ? -1 : 1,
    };
  });

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleGoProfile = async () => {
    const userId = post.user._id;
    const username = post.user.username;
    console.log("go friend profile: ", username)
    console.log("id friend profile: ", userId)
    
    if (username !== authState.user.username) {
      await getProfile(userId);
      navigation.navigate("FriendProfile", { userId, username });
    } else {
      navigation.navigate('Profile');
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity
        onPress={handleGoProfile}
      >
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Avatar user={post.user}></Avatar>
          </View>
          <Text style={styles.usernameTop}>{post.user.username}</Text>
          <Text style={styles.postDate}>{post.createdAt}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.postCard}>
        <GestureDetector gesture={pinchGesture}>
          <Animated.View style={[styles.cardImage, animatedImageStyle]}>
            <Image
              source={{ uri: `http://172.20.10.4:3001/${post.imageUrl.replace(/\\/g, '/')}`}}
              style={styles.image}
            />
          </Animated.View>
        </GestureDetector>
      </View>
      <Animated.View style={[styles.belowPicture, belowPictureStyle]}>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity onPress={() => handleLike()}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              color="#ea5b0c"
              size={32}
            />
          </TouchableOpacity>
          <Text style={styles.likes}>{post.likes.length}</Text>
          <TouchableOpacity onPress={() => setCommentsVisibility(true)}>
            <Ionicons name={"chatbubble-outline"} color="#ea5b0c" size={30} />
          </TouchableOpacity>
          {/* <Text style={styles.likes}>{post.comments}</Text> */}
          <TouchableOpacity style={{ marginLeft: "auto", marginRight: 5 }} onPress={() => copyToClipboard()}>
            <Ionicons name="share-social-outline" color="#ea5b0c" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.userDesc}>
          <Text>
            <Text style={styles.usernameBottom}>{post.user.username} </Text>{" "}
            {/* no saquen los espacios porque queda feo y no me deja poner margen :( */}
            <Text style={styles.postDescription}>{post.caption}</Text>
          </Text>
        </View>
      </Animated.View>
      <CommentsModal
        visible={commentsVisibility}
        onClose={() => setCommentsVisibility(false)}
        commentsArray={post.commentsArray}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "white",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#808080",
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 0,
  },
  usernameTop: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postDate: {
    marginTop: 3,
    marginLeft: "auto",
    fontSize: 12,
    color: "#808080",
  },
  postCard: {
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
  },
  image: {
    // ajustar para pequeñas y grandes pantallas 
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  belowPicture: {
    backgroundColor: "white",
    padding: 15,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    gap: 2,
    marginBottom: 10,
    alignItems: "center",
  },
  likes: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#173363",
    marginRight: 10,
  },
  userDesc: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  usernameBottom: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postDescription: {
    fontSize: 14,
  },
});
