import React, {useEffect, useState} from "react";
import { View, Text, Image, StyleSheet, Dimensions, Button, TouchableOpacity, TextInput, ScrollView } from "react-native";
import NavBar from "../components/NavBar";

const Search = ({ navigation, route }) => {
    const { user, friends } = route.params;
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState(friends);

    useEffect(() => {
        setSearchResults(friends.filter((user) => user.username.toLowerCase().startsWith(search.toLowerCase())));
    }, [search]);

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
                    <TouchableOpacity key={index} onPress={() => navigation.navigate(user.username, { friend: { username: user.username, profilePicture: user.profilePicture, bio: user.bio } })}>
                        <View style={styles.userItem}>
                            <Image source={user.profilePicture} style={styles.avatar} />
                            <Text style={styles.username}>{user.username}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <NavBar user={user} activePage="search" navigation={navigation} />
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
        alignSelf: 'center',
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