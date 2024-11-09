import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import PostModal from './PostModal.js';

const ProfilePost = ({ idx, post, user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <View style={styles.container}>
                    <TouchableOpacity key={idx} style={styles.cardImage} onPress={() => setIsModalOpen(true)}>
                        <Image source={post.imageUrl} style={styles.image} />
                    </TouchableOpacity>

            <PostModal
                isVisible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                post={post}
                user={user}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardImage: {
        width: Dimensions.get("window").width/3,
        height: Dimensions.get("window").width/3,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});

export default ProfilePost;