import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import PostModal from "./PostModal.js";

const ProfilePost = ({ idx, post, user, navigation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setIsModalOpen(true);
  };

  const openPostScreen = () => {
    //navigation.navigate("Post", { post, user });
    navigation.navigate("Post", { post, user });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        key={idx}
        style={styles.cardImage}
        onLongPress={handleOpenModal}
      >
        <Image
          source={{
            uri: `http://172.20.10.2:3001/${post.imageUrl.replace(/\\/g, "/")}`,
          }}
          style={styles.image}
        />
      </TouchableOpacity>

      <PostModal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={post}
        user={user}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardImage: {
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").width / 3,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default ProfilePost;
