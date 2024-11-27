import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NavBar from "../components/NavBar";
import ProfileGrid from "../components/ProfileGrid";
import { useProfile } from "../context/ProfileContext";
import useFriend from "../hooks/useFriend";
import { useAuth } from "../context/AuthContext";
import { useGetProfile } from "../hooks/useGetProfile";
import Avatar from "../components/Avatar";
import { useIsFocused } from "@react-navigation/native";

const FriendProfile = ({ navigation }) => {
  const { state: profileState, dispatch: dispatchProfile } = useProfile();
  const { state: authState, handleReload } = useAuth();
  const [isFriend, setIsFriend] = useState();
  const [friendsNum, setFriendsNum] = useState();
  const getProfile = useGetProfile();
  const { addFriend, removeFriend } = useFriend();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getData = async () => {
      const friendId = await AsyncStorage.getItem("friend-id");
      if (friendId) {
        dispatchProfile({ type: PROFILE_ACTIONS.LOADING });
        await getProfile(friendId);
        await handleReload();
      }
    };
    getData();
    let find = false;
    for (let i = 0; i < profileState.user?.friends.length; i++) {
      if (profileState.user.friends[i]._id === authState.user?._id) {
        setIsFriend(true);
        find = true;
        break;
      }
    }
  }, [isFocused])

    

  useEffect(() => {
    const getData = async () => {
      const friendId = await AsyncStorage.getItem("friend-id");
      if (friendId) {
        dispatchProfile({ type: PROFILE_ACTIONS.LOADING });
        await getProfile(friendId);
        await handleReload();
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const start = async () => {
      if (authState.user) {
        const friendId = await AsyncStorage.getItem("friend-id");
        if (friendId && authState.user.friends) {
          const find = authState.user.friends.find(
            (friend) => friend._id === profileState.user?._id
          );
        } else {
          const find = authState.user.friends.find(
            (friend) => friend._id === profileState.user?._id
          );
          await AsyncStorage.setItem("friend-id", profileState.user?._id);
        }
        setFriendsNum(profileState.user?.friends.length);
      }
    };
    start();
  }, [profileState, authState]);

  const handleToggleFriend = async () => {
    if (isFriend) {
      const removed = await removeFriend(profileState.user._id);
      if (removed === true) {
        setIsFriend(false);
        setFriendsNum(friendsNum - 1);
      } else {
        // no cambia
        setIsFriend(true);
      }
    } else {
      const added = await addFriend(profileState.user._id);
      if (added === true) {
        setIsFriend(true);
        setFriendsNum(friendsNum + 1);
      } else {
        // no cambia
        setIsFriend(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.topInfo}>
          <View style={styles.avatar}>
            <Avatar user={profileState.user}></Avatar>
          </View>
          <View style={styles.nextToAvatar}>
            <View style={styles.profileData}>
              <View style={styles.individualData}>
                <Text style={styles.dataContent}>
                  {profileState.posts.length}
                </Text>
                <Text style={styles.dataDescription}>Posts</Text>
              </View>
              <View style={styles.individualData}>
                <Text style={styles.dataContent}>{friendsNum}</Text>
                <Text style={styles.dataDescription}>Friends</Text>
              </View>
            </View>
            <TouchableOpacity
              style={
                isFriend ? styles.addedFriendButton : styles.addFriendButton
              }
              onPress={handleToggleFriend}
            >
              <Text
                style={
                  isFriend
                    ? styles.addedFriendButtonText
                    : styles.addFriendButtonText
                }
              >
                {isFriend ? "remove friend" : "add friend"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.username}>{profileState.user?.username}</Text>
          <Text style={styles.description}>
            {profileState.user?.description}
          </Text>
        </View>
      </View>
      <ProfileGrid posts={profileState.posts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 45,
    backgroundColor: "white",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderColor: "#808080",
    borderWidth: 3,
    marginRight: 15,
  },
  topInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 20,
  },
  nextToAvatar: {
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 1,
    alignItems: "center",
  },
  profileData: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 15,
    marginTop: 10,
  },
  individualData: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dataContent: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  dataDescription: {
    fontSize: 16,
    color: "black",
    marginTop: 2,
  },
  addFriendButton: {
    width: "85%",
    height: 35,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addedFriendButton: {
    width: "85%",
    height: 35,
    backgroundColor: "#173363",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addFriendButtonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  addedFriendButtonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "white",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    color: "black",
  },
});

export default FriendProfile;
