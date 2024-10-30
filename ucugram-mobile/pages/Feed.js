import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView } from "react-native";
import NavBar from "../components/NavBar";
import PostItem from "../components/PostItem";

const Feed = ({ navigation, route }) => {
    const { user, posts } = route.params;
    return (
        <View style={styles.container}>
            {/* sugerencias seguidores */}
            <ScrollView>
                <Image source={require('ucugram-mobile/assets/ucugram texto.png')} style={{width: '40%', height: 30, alignSelf: 'center', marginTop: 15, }}/>
                {posts.map((post, index) => (
                    <PostItem key={index} post={post} user={user} />
                ))}
            </ScrollView>
            <NavBar user={user} activePage="home" navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 45,
    },
});

export default Feed;