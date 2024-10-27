import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView } from "react-native";
import NavBar from "../components/NavBar";
import PostItem from "../components/PostItem";

const Feed = ({ user, posts }) => {
    return (
        <View style={styles.container}>
            {/* logo + sacar margen + sugerencias seguidores */}
            <ScrollView>
                {posts.map((post, index) => (
                    <PostItem key={index} post={post} user={user} />
                ))}
            </ScrollView>
            <NavBar user={user} activePage="home" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Feed;