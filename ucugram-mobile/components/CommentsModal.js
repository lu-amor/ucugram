import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, LayoutAnimation } from 'react-native';

const CommentsModal = ({ visible, onClose, comments }) => {
    const [newComment, setNewComment] = useState('');
    const [contentHeight, setContentHeight] = useState(560);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setContentHeight(750);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setContentHeight(560);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleAddComment = () => {
        /* funcion agregar comentario */
        setNewComment('');
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={[styles.modalContent, { height: contentHeight }]}
                        >
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                                <Text style={styles.modalTitle}>Comments</Text>
                            </View>
                            <FlatList
                                data={comments}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.commentItem}>
                                        <Text>{item.text}</Text>
                                    </View>
                                )}
                            />
                            <View style={[styles.inputWrapper, (contentHeight===560) ? { marginBottom: 35 } : { marginBottom: 15 }]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Write a comment"
                                    placeholderTextColor={'#888'}
                                    value={newComment}
                                    onChangeText={(text) => setNewComment(text)}
                                />
                                <TouchableOpacity style={styles.addButton} onPress={handleAddComment}>
                                    <Ionicons name="send" size={18} color="white" />
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#173363',
    },
    commentItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    addButton: {
        marginLeft: 10,
        padding: 10,
        backgroundColor: '#173363',
        borderRadius: 15,
        width: 60,
        alignItems: 'center',
    },
});

export default CommentsModal;