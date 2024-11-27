import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";
import useFetchSuggestions from "../hooks/useFetchSuggestions";
import { useGetProfile } from "../hooks/useGetProfile";
import { useNavigation } from "@react-navigation/native";

const SuggestedFollows = ({ onBack }) => {
  const { suggestions, loading, error } = useFetchSuggestions();
  const getProfile = useGetProfile();
  const navigation = useNavigation();

  const handleGoProfile = async (user) => {
    const userId = user._id;
    const username = user.username;
    await getProfile(userId);
    navigation.navigate("FriendProfile", { userId, username });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All suggestions</Text>

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.suggestionItem}>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => handleGoProfile(item)}
            >
              <View style={styles.itemAvatar}>
                <Avatar user={item} />
              </View>

              <View style={styles.itemInfo}>
                <Text style={styles.suggestionName}>{item.username}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.followSection}>
              <FollowButton user={item} />
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>{"<"} Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "space-between",
    width: "100%",
  },
  itemAvatar: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#808080",
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 0,
  },
  itemInfo: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 18,
    fontWeight: "500",
  },
  followSection: {
    marginLeft: 16,
    marginRight: 10,
  },
  backButton: {
    backgroundColor: "rgb(30, 30, 109)",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  profileButton: {
    flexDirection: "row",
    width: "ajust-content",
    alignItems: "center",
    flex: 1,
  },
});

export default SuggestedFollows;
