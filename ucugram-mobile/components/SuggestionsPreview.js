import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AccessibilityInfo
} from "react-native";
import FollowButton from "./FollowButton";
import Avatar from "./Avatar";
import { useNavigation } from "@react-navigation/native";
import { useGetProfile } from "../hooks/useGetProfile";

const SuggestionsPreview = ({ suggestions }) => {

  const navigation = useNavigation();
  const getProfile = useGetProfile();

  const handleGoProfile = async (user) => {
    const userId = user._id;
    const username = user.username;
    await getProfile(userId);
    navigation.navigate("FriendProfile", { userId, username });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.suggestionCard}>
        <TouchableOpacity onPress={() => handleGoProfile(item)}>
          <View style={styles.cardAvatar}>
            <Avatar user={item} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.name}>
              {item.username || "Nombre no disponible"}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.followSection}>
          <FollowButton user={item} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  suggestionCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "lightgrey",
    elevation: 3,
    flexDirection: "column",
    margin: 5,
    marginBottom: 20,
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  cardAvatar: {
    marginBottom: 10,
    width: 70,
    height: 70,
    borderRadius: 100,
    borderColor: "grey",
    borderWidth: 2,
  },
  cardInfo: {
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  followSection: {
    marginTop: 10,
  },
});

export default SuggestionsPreview;
