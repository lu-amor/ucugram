import React, { useState } from "react";
import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import ProfileGrid from "../components/ProfileGrid";
import NavBar from "../components/NavBar";

const FriendProfile = ({ navigation, route }) => {
    const { user, friend, posts: allFriendPosts } = route.params;
    const [following, setFollowing] = useState(false);
    const friendPosts = allFriendPosts.filter((post) => post.username === friend.username);

    const handleAddFriend = () => {
        setFollowing(!following);
    };

    return (
        <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor='#ffffff' />
        <ScrollView>
            <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.topInfo}>
                <View>
                <Image source={friend.profilePicture} style={styles.avatar} />
                </View>
                <View style={styles.nextToAvatar}>
                <View style={styles.profileData}>
                    <View style={styles.individualData}>
                    <Text style={styles.dataContent}>{friend.posts.length}</Text>
                    <Text style={styles.dataDescription}>Posts</Text>
                    </View>
                    <View style={styles.individualData}>
                    <Text style={styles.dataContent}>{friend.followers}</Text>
                    <Text style={styles.dataDescription}>Followers</Text>
                    </View>
                </View>
                <TouchableOpacity 
                    style={following ? styles.addedFriendButton : styles.addFriendButton} 
                    onPress={handleAddFriend}
                >
                    <Text style={following ? styles.addedFriendButtonText : styles.addFriendButtonText}>
                    {following ? "Remove Friend" : "Add Friend"}
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={styles.username}>{friend.username}</Text>
                <Text style={styles.description}>{friend.bio}</Text>
            </View>
            </View>
            <ProfileGrid posts={friendPosts} />
        </ScrollView>
        <NavBar user={user} activePage="profile" navigation={navigation} />
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
        width: '80%',
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
        width: '85%',
        height: 35,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    addedFriendButton: {
        width: '85%',
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
