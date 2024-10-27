import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView } from "react-native";

const ProfileGrid = ({posts}) => {

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                <Image source={require('../assets/post_img-by-AI.jpeg')} style={styles.gridImage} />
                <Image source={require('../assets/post_img-by-AI.jpeg')} style={styles.gridImage} />
                <Image source={require('../assets/post_img-by-AI.jpeg')} style={styles.gridImage} />
                <Image source={require('../assets/post_img-by-AI.jpeg')} style={styles.gridImage} />
                <Image source={require('../assets/post_img-by-AI.jpeg')} style={styles.gridImage} />
                <Image source={require('../assets/post_img-by-AI.jpeg')} style={styles.gridImage} />
                <Image source={require('../assets/post_img-by-AI.jpeg')} style={styles.gridImage} />
                <Image source={require('../assets/post_img-by-AI.jpeg')} style={styles.gridImage} />
                <Image source={require('../assets/post_img-by-AI.jpeg')} style={styles.gridImage} />
                <Image source={require('../assets/post_img-by-AI.jpeg')} style={styles.gridImage} />
                <Image source={require('../assets/post_img-by-AI.jpeg')} style={styles.gridImage} />
                <Image source={require('../assets/post_img-by-AI.jpeg')} style={styles.gridImage} />
                <Image source={require('../assets/post_img-by-AI.jpeg')} style={styles.gridImage} />

{/*                 {posts.map((post, index) => {
                    return (
                        <View key={index} style={styles.gridImage}>
                            <Image source={{ uri: post.imageUrl }} style={styles.gridImage} />
                        </View>
                    );
                })} */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    gridImage: {
        width: Dimensions.get("window").width / 3,
        height: Dimensions.get("window").width / 3,
    },
});

export default ProfileGrid;