import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import Post from '../pages/Post.js'
import PostModal from './PostModal.js';

const ProfilePost = ({ idx, post, user, navigation }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openPostScreen = () => {
        //navigation.navigate("Post", { post, user });
        navigation.navigate("Post", {post});
    };

    const openModal = () => {
        setIsModalOpen(true);
    };


    return (
        <View style={styles.container}>
                    <TouchableOpacity key={idx} style={styles.cardImage} onPress={openPostScreen} onLongPress={openModal}>
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