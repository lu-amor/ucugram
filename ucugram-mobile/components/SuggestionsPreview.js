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
    width: Dimensions.get("window").width * 0.35,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "lightgrey",
    elevation: 3,
    flexDirection: "column",
    margin: 5,
    marginBottom: 20,
    marginTop: 5,
    paddingTop:10,
    paddingBottom:10,
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
