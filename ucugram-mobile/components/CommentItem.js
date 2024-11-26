import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, Button, TouchableOpacity } from "react-native";
import Avatar from "./Avatar";

const CommentItem = ({ comment }) => {
    const info = comment.commentInfo
    console.log("info:", info)
    return (
        <View style={styles.commentItem}>
            <View style={styles.avatarContainer}><Avatar user={info.user}/></View>
            <Text style={styles.commentContent}>
                <Text style={styles.commentUser}>{info.user?.username}  </Text>
                <Text style={styles.commentText}>{info.content}</Text>
            </Text>
            <Text style={styles.commentDate}>{info.createdAt?.split("T")[0]}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    commentItem: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        paddingVertical: 8,
    },
    commentContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    commentUser: {
        fontWeight: "bold",
        marginRight: 5,
        color: "#173363",
    },
    commentDate: {
        color: "#888",
        marginRight: 5,
        marginLeft: 3,
    },
    commentText: {
        flex: 1,
    },
    avatarContainer: {
        width: 30, 
        height: 30,
        marginRight: 10
    }
});

export default CommentItem;