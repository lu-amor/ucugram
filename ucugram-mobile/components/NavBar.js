import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const NavBar = ({ user, activePage }) => {
    return (
        <View style={styles.navBar}>
            <View style={styles.navBarIcons}>
                {activePage === "home" ? <Ionicons name="home" size={35} color="#173363" /> : <Ionicons name="home-outline" size={35} color="#173363" />}
                {activePage === "add" ? <Ionicons name="add-circle" size={35} color="#173363" /> : <Ionicons name="add-circle-outline" size={35} color="#173363" />}
                {activePage === "notifications" ? <Ionicons name="notifications" size={35} color="#173363" /> : <Ionicons name="notifications-outline" size={35} color="#173363" />}
                {activePage === "profile" ? <Image source={user.profilePicture} style={styles.avatarActive}/> : <Image source={user.profilePicture} style={styles.avatar}/>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingBottom: 35,
        backgroundColor: "white",
    },
    navBarIcons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 100,
        borderColor: "#173363",
        borderWidth: 1,
    },
    avatarActive: {
        width: 35,
        height: 35,
        borderRadius: 100,
        borderColor: "#173363",
        borderWidth: 2,
    },
});

export default NavBar;