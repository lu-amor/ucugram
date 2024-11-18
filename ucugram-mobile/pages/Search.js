import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import NavBar from "../components/NavBar";
import useFetchSuggestions from "../hooks/useFetchSuggestions";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/Avatar";
import { useGetProfile } from "../hooks/useGetProfile";
import useGetAllUsers from "../hooks/useGetAllUsers";

const Search = ({ navigation }) => {
  const { state: authState } = useAuth();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const getProfile = useGetProfile();  
  const getAllUsers = useGetAllUsers();

  useEffect(() => {
    const loadUsers = async () => {
        if (authState.user) {
        const allUsers = await getAllUsers();
          setSearchResults(
            allUsers.filter((user) =>
              user.username.toLowerCase().startsWith(search.toLowerCase()) && user.username !== authState.user.username
            )
          );
        }
    }
    loadUsers();
  }, [search, authState.user]);

  const handleGoProfile = async (user) => {
    const userId = user._id;
    const username = user.username;

    if (username !== authState.user.username) {
      await getProfile(userId);
      navigation.navigate("FriendProfile", { userId, username });
    } else {
      navigation.navigate("Profile");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find new friends!</Text>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <ScrollView>
        {searchResults.map((user, index) => (
          <TouchableOpacity key={index} onPress={() => handleGoProfile(user)}>
            <View style={styles.userItem}>
              <View style={styles.avatar}>
                <Avatar user={user}></Avatar>
              </View>
              <Text style={styles.username}>{user.username}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <NavBar
        user={authState.user}
        activePage="search"
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 45,
  },
  header: {
    alignSelf: "center",
    marginVertical: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "#173363",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    padding: 5,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#173363",
  },
});

export default Search;
