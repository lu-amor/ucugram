import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const NavBar = ({ user, activePage, navigation }) => {
    return (
        <View style={styles.navBar}>
            <View style={styles.navBarIcons}>
                <Ionicons
                    name = {activePage === "home" ? "home" : "home-outline"}
                    size = {35}
                    color = "#173363"
                    onPress = {() => navigation.navigate('Feed')}
                />
                <Ionicons
                    name = {activePage === "add" ? "add-circle" : "add-circle-outline"}
                    size = {35}
                    color = "#173363"
                    onPress = {() => navigation.navigate('Add')}
                />
                <Ionicons
                    name = {activePage === "notifications" ? "notifications" : "notifications-outline"}
                    size = {35}
                    color = "#173363"
                    onPress = {() => navigation.navigate('Notifications')}
                />
                <TouchableOpacity onPress = {() => navigation.navigate('Profile')}>
                    <Image
                        source={user.profilePicture}
                        style = {activePage === "profile" ? styles.avatarActive : styles.avatar}
                    />
                </TouchableOpacity>
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