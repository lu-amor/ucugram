import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import NavBar from "../components/NavBar";
import FeedPost from "../components/FeedPost";
import Suggestions from "../components/Suggestions";

const Feed = ({ navigation, route }) => {
    const { user, allFriendPosts, suggestedFollows} = route.params;

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image 
                    source={require('../assets/ucugram texto.png')} 
                    style={styles.headerImage} 
                />

                <Suggestions suggestedFollows={suggestedFollows} navigation={navigation}/>

                {allFriendPosts.map((post, index) => (
                    <FeedPost
                        key={index} 
                        post={post} 
                        user={{ username: post.username, profilePicture: post.profilePicture }} 
                        navigation={navigation}
                    />
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
    headerImage: {
        width: '40%',
        height: 30,
        alignSelf: 'center',
        marginTop: 15,
    },
});

export default Feed;