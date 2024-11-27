import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import useFriend from "../hooks/useFriend";
import { useAuth } from "../context/AuthContext";

const FollowButton = ({ user }) => {
  const {state: authState} = useAuth();
  const { addFriend, removeFriend } = useFriend();
  const [isFriend, setIsFriend] = useState(user?.friends.includes(authState.user?._id));
  const [loading, setLoading] = useState(false);

  const handleToggleFriend = async () => {
    if (isFriend) {
      setLoading(true);
      const removed = await removeFriend(user._id);
      setLoading(false);
      if (removed === true) {
        setIsFriend(false);
      } else {
        // no cambia
        setIsFriend(true);
      }
    } else {
      setLoading(true);
      const added = await addFriend(user._id);
      setLoading(false);
      if (added === true) {
        setIsFriend(true);
      } else {
        // no cambia
        setIsFriend(false);
      }
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isFriend ? styles.followingButton : styles.followButton,
      ]}
      onPress={handleToggleFriend}
    >
      {loading ? (
        <ActivityIndicator size={15} color={isFriend ? "black" : "white"} />
      ) : (
        <Text style={styles.buttonText}>
          {isFriend ? "remove" : "add friend"}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    minHeight: 30,
  },
  followButton: {
    backgroundColor: "rgb(30, 30, 109)",
  },
  followingButton: {
    backgroundColor: "#A9A9A9",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FollowButton;
