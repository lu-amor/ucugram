import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import SuggestionsPreview from "./SuggestionsPreview";
import useFetchSuggestions from "../hooks/useFetchSuggestions.js";

const screenWidth = Dimensions.get("window").width;

const Suggestions = ({ navigation, refreshing }) => {
  const { reloadSuggestions, suggestions, loading, error } = useFetchSuggestions();

  useEffect(() => {
    if (refreshing) {
      (async () => {
        await reloadSuggestions();
      })();
    }
  }, [refreshing]);

  return (
    <>
      {suggestions && suggestions.length > 0 && (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Suggestions for you</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SuggestedFriends")}
              style={styles.showAllButton}
            >
              <Text style={styles.showAllButtonText}>See all</Text>
            </TouchableOpacity>
          </View>
          <SuggestionsPreview suggestions={suggestions} />
          <View style={styles.footer}></View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 30,
    maxHeight: "ajust-content",
  },
  footer: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 15,
  },
  showAllButton: {
    // backgroundColor: 'rgb(30, 30, 109)',
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 15,
    alignItems: "flex-end",
  },
  showAllButtonText: {
    color: "#1e90ff",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Suggestions;
