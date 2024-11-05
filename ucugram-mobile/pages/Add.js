import React, { useState } from "react";
import { View, Text, Image, Button, Alert, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform, Keyboard } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Add = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [post, setPost] = useState(null);

    const openImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission Denied", "We need access to your photos to select an image.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            maxWidth: '100%',
            maxHeight: '100%',
            aspect: [1, 1],
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const handleCameraLaunch = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission Denied", "We need access to your camera to take a photo.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            saveToPhotos: true,
            quality: 1,
            maxWidth: '100%',
            maxHeight: '100%',
            aspect: [1, 1],
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const handleNewPost = ()  => {
        Keyboard.dismiss();
        /* if (caption && caption.trim() !== '') { 
            setPost({ image: selectedImage, caption: caption });
        } else {
            alert('Error');
        } */
        /* setPost(null);
        setSelectedImage(null);
        setCaption(''); */
    }

    const handleGoBack = () => {
        setPost(null);
        setCaption('');
        setSelectedImage(null);
    }

    return (
        <View style={{ flex: 1, marginTop: 45 }}>
            {selectedImage && (
                <View style={{ flex: 1 }}>
                    <View style={styles.topInfoContainer}>
                        <TouchableOpacity style={styles.backButtonContainer} onPress={() => handleGoBack()}>
                            <Ionicons name="chevron-back-outline" color='#173363' size={32} style={styles.backButton} />
                        </TouchableOpacity>
                        <Text style={styles.newPostText}>New Post</Text>
                    </View>
                    <View style={{ width: 350, height: 350, alignSelf: 'center' }}>
                        <Image
                            source={{ uri: selectedImage }}
                            style={{ width: 350, height: 350 }}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.writeCaptionContainer}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={styles.writeCaptionWrapper}>
                            <TextInput 
                                style={styles.input} 
                                placeholder={'Write a caption'} 
                                value={caption} 
                                onChangeText={text => setCaption(text)}
                            />
                        </KeyboardAvoidingView>
                    </View>
                    <View style={styles.publishButtonContainer}>
                        <TouchableOpacity onPress={handleNewPost}>
                            <View style={styles.addWrapper}>
                                <Text style={styles.addText}>Publish</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            { (!selectedImage) && (
                <View style={styles.optionsContainer}>
                    <View style={{ marginTop: 20 }}>
                        <Button title="Choose from Device" onPress={openImagePicker}/>
                    </View>
                    <View style={{ marginTop: 20, marginBottom: 50 }}>
                        <Button title="Open Camera" onPress={handleCameraLaunch} />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    topInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: 60,
        marginBottom: 10,
        marginTop: 5,
    },
    backButtonContainer: {
        position: 'absolute',
        left: 0,
    },
    backButton: {
        margin: 20,
    },
    newPostText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#173363',
        textAlign: 'center',
    },
    writeCaptionContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    input: {
        paddingVertical: 15,
        width: '100%',
        paddingLeft: 15,
        borderBottomColor: '#173363',
        borderBottomWidth: 2,
        color: '#450920',
    },
    publishButtonContainer: {
        position: 'absolute',
        bottom: 35,
        alignSelf: 'center',
    },
    addWrapper: {
        width: 340,
        height: 55,
        backgroundColor: '#173363',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#ffffff',
    },
    optionsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Add;