import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView } from "react-native";
import ProfileGrid from "../components/ProfileGrid";
import NavBar from "../components/NavBar";

const Profile = ({ user, posts }) => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{paddingHorizontal: 20}}>
                    <View style={styles.topInfo}>
                        <View>
                            <Image source={user.profilePicture} style={styles.avatar} />
                        </View>
                        <View style={styles.nextToAvatar}>
                            <View style={styles.profileData}>
                                <View style={styles.individualData}>
                                    <Text style={styles.dataContent}>{user.posts}</Text>
                                    <Text style={styles.dataDescription}>Posts</Text>
                                </View>
                                <View style={styles.individualData}>
                                    <Text style={styles.dataContent}>{user.followers}</Text>
                                    <Text style={styles.dataDescription}>Followers</Text>
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
                        <Text style={styles.username}>{user.username}</Text>
                        <Text style={styles.description}>{user.bio}</Text>
                    </View>
                </View>
                <ProfileGrid posts={posts}/>
            </ScrollView>
            <NavBar user={user} activePage="profile" />
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 40,
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
    editProfileButton: {
        width: '85%',
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
