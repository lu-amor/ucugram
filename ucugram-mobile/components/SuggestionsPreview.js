import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import FollowButton from "./FollowButton";
import Avatar from "./Avatar";

const SuggestionsPreview = ({ suggestions }) => {

  const renderItem = ({ item }) => {
    return (
      <View style={styles.suggestionCard}>
        <View style={styles.cardAvatar}>
          <Avatar user={item} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.name}>{item.username || "Nombre no disponible"}</Text>
        </View>
        <View style={styles.followSection}>
          <FollowButton userId={item._id} initialFollows={[]} />
        </View>
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggestions for you</Text>

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
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
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  suggestionCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    width: Dimensions.get("window").width * 0.6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "column",
  },
  cardAvatar: {
    marginBottom: 10,
    width: 80,
    height: 80,
    borderRadius: 60,
    borderColor: "#808080",
    borderWidth: 3,
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
