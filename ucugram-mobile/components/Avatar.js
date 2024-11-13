import { View, StyleSheet, Image } from "react-native";

function Avatar({ user }) {
  const profilePicture = user?.profilePicture;

  const src = profilePicture
    ? { uri: profilePicture }
    : require("./../assets/default-profilePicture.jpg");

  return (
    <View style={styles.avatarContainer}>
      <Image source={src} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
});

export default Avatar;
