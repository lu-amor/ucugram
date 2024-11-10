import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, Button, TouchableOpacity } from "react-native";

const CommentItem = ({ comment }) => {
    return (
        <View style={styles.commentItem}>
{/*             <Image
                source={{ uri: comment.userAvatar }}
                style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
            /> */}
            <View style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10, backgroundColor: "#ccc" }} />
            <Text style={styles.commentContent}>
                <Text style={styles.commentUser}>{comment.userId}  </Text>
                <Text style={styles.commentText}>{comment.text}</Text>
            </Text>
            <Text style={styles.commentDate}>{comment.date}</Text>
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
});

export default CommentItem;