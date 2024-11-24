import React, { useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ProfileGrid from "../components/ProfileGrid";
import NavBar from "../components/NavBar";
import Avatar from "../components/Avatar";
import { useAuth } from "../context/AuthContext";
import { useGetProfile } from "../hooks/useGetProfile.js";
import { useProfile } from "../context/ProfileContext.js";
import { useIsFocused } from "@react-navigation/native";

// pends : agrandar Avatar Icon

const Profile = ({ navigation }) => {
  const { state: authState } = useAuth();
  const { state: profileState } = useProfile();
  const getProfile = useGetProfile();
  const isFocused = useIsFocused();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const resetProfile = async () => {
      const userId = authState.user?._id;
      if (userId) {
        setLoading(true);
        await getProfile(userId);
        setLoading(false);
      }
    };

    if (isFocused) {
      resetProfile();
    }
  }, [isFocused]);

  useEffect(() => {
    const getUserProfile = async () => {
      const userId = authState.user?._id;
      if (userId) {
        setLoading(true);
        await getProfile(userId);
        setLoading(false);
      }
    };
    getUserProfile();
  }, [authState.user?._id]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="grey"/>}
      <>
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
                  <Text style={styles.dataContent}>
                    {profileState.user?.friends.length}
                  </Text>
                  <Text style={styles.dataDescription}>Friends</Text>
                </View>
              </View>
              <View style={styles.editProfileButton}>
                <TouchableOpacity style={styles.editProfileButton}>
                  <Text style={styles.editProfileButtonText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.username}>{profileState.user?.username}</Text>
            <Text style={styles.description}>
              {profileState.user?.description}
            </Text>
          </View>
        </View>
        <ProfileGrid
          posts={profileState.posts}
          user={profileState.user}
          navigation={navigation}
        />
        <NavBar
          user={profileState.user}
          activePage="profile"
          navigation={navigation}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    marginTop: 45,
    backgroundColor: "white",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 60,
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
  editProfileButton: {
    width: "85%",
    height: 35,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  editProfileButtonText: {
    fontWeight: "600",
    fontSize: 16,
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

export default Profile;
