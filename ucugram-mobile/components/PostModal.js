import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import Avatar from './Avatar';

const PostModal = ({ isVisible, onClose, post, user }) => {
    return (
        <Modal
            transparent={true}
            visible={isVisible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPressOut={onClose}>
                <View style={styles.modalContent}>
                    
                    <View style={styles.header}>
                        <View style={styles.avatar}>
                        <Avatar user={user} ></Avatar>
                        </View>
                        <Text style={styles.username}>{user.username}</Text>
                    </View>

                    <Image source={ post.imageUrl } style={styles.postImage} />

                    <View style={styles.footer}>
                        <Ionicons name="heart-outline" size={24} color="black" style={styles.icon} />
                        <Ionicons name="chatbubble-outline" size={24} color="black" style={styles.icon} />
                        <Ionicons name="share-social-outline" size={24} color="black" style={styles.icon} />
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20, 
        borderColor: "#808080",
        borderWidth: 1,
        marginRight: 10, 
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    icon: {
        marginHorizontal: 10,
    },
});

export default PostModal;
