import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useProfile } from "../context/ProfileContext";
import Avatar from "./Avatar";

const PostModal = ({ isVisible, onClose, post }) => {
  const { state: profileState, dispatch: dispatchProfile } = useProfile();
  const [imageSize, setImageSize] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const handleResize = () =>
      setImageSize(Dimensions.get("window").width * 0.9);

    const subscription = Dimensions.addEventListener("change", handleResize);

    return () => subscription?.remove();
  }, []);

  const isLargeScreen = imageSize > 450;

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPressOut={onClose} />
        <View
          style={
            isLargeScreen
              ? {
                  width: imageSize * 0.7,
                  backgroundColor: "white",
                  borderRadius: 10,
                  overflow: "hidden",
                }
              : styles.modalContent
          }
        >
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Avatar user={profileState.user}></Avatar>
            </View>
            <Text style={styles.username}>{profileState.user?.username}</Text>
          </View>

          <Image
            source={{
              uri: `http://192.168.1.88:3001/${post.imageUrl.replace(
                /\\/g,
                "/"
              )}`,
            }}
            style={[
              styles.postImage,
              {
                width: isLargeScreen ? imageSize * 0.7 : imageSize,
                height: isLargeScreen ? imageSize * 0.7 : imageSize * 0.9,
              },
            ]}
          />

          <View style={styles.footer}>
            <Ionicons
              name="heart-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Ionicons
              name="share-social-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#808080",
    borderWidth: 1,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postImage: {
    justifyContent: "center",
    resizeMode: "cover",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default PostModal;
