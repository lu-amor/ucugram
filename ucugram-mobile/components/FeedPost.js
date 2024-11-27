import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../context/AuthContext";
import { useGetProfile } from "../hooks/useGetProfile";
import useLike from "./../hooks/useLike.js";
import Avatar from "./Avatar";
import CommentsModal from "./CommentsModal";

const screenWidth = Dimensions.get("window").width;

export default function FeedPost({ post, navigation }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state: authState } = useAuth();
  const getProfile = useGetProfile();
  const { likes, isLiked, toggleLike } = useLike(post);

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

  const handleGoProfile = async () => {
    const userId = post.user._id;
    const username = post.user.username;

    if (username !== authState.user.username) {
      await getProfile(userId);
      navigation.navigate("FriendProfile", { userId, username });
    } else {
      navigation.navigate("Profile");
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoProfile}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Avatar user={post.user}></Avatar>
            </View>
            <Text style={styles.usernameTop}>{post.user.username}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.postDate}>{post.createdAt?.split("T")[0]}</Text>
      </View>
      <View style={styles.postCard}>
        <GestureDetector gesture={pinchGesture}>
          <Animated.View style={[styles.cardImage, animatedImageStyle]}>
            <Image
              source={{
                uri: `http://192.168.1.88:3001/${post.imageUrl.replace(
                  /\\/g,
                  "/"
                )}`,
              }}
              style={styles.image}
            />
          </Animated.View>
        </GestureDetector>
      </View>
      <Animated.View style={[styles.belowPicture, belowPictureStyle]}>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity onPress={toggleLike}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color="#ea5b0c"
              size={32}
            />
          </TouchableOpacity>
          <Text style={styles.likes}>{likes}</Text>
          <TouchableOpacity onPress={() => setIsModalOpen(true)}>
            <Ionicons name={"chatbubble-outline"} color="#ea5b0c" size={30} />
          </TouchableOpacity>
            <Text style={styles.likes}>{post.comments.length}</Text>
          <TouchableOpacity style={{ marginLeft: "auto", marginRight: 5 }} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=AoQMHzkj2x0&ab_channel=ConorMaynard.com')}>
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
      {isModalOpen && (
        <CommentsModal onClose={() => setIsModalOpen(false)} post={post} />
      )}
    </GestureHandlerRootView>
  );
}

const isLargeScreen = screenWidth > 450;

const styles = StyleSheet.create({
  container: {
    flex: isLargeScreen ? 1.2 : 1,
    backgroundColor: "white",
    // paddingTop: isLargeScreen ? 70 : 10,
    // paddingHorizontal: isLargeScreen ? "10%" : 0,
    alignItems: "center",
    marginBottom: 10,
    height: "ajust-content",
    paddingVertical: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    // paddingVertical: 8,
    backgroundColor: "white",
    alignSelf: "center",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: isLargeScreen ? "180%" : "100%",
    width: "100%",
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#808080",
    borderWidth: 1,
    marginRight: 10,
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
    width: "100%",
    height: isLargeScreen ? screenWidth * 0.6 : screenWidth,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  belowPicture: {
    backgroundColor: "white",
    padding: 15,
    width: "100%",
    alignSelf: "center",
    height: "ajust-content",
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
    height: "ajust-content",
    // marginBottom: 10,
    // flexWrap: "wrap",
  },
  usernameBottom: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postDescription: {
    fontSize: 14,
  },
});
