import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, Alert, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform, Keyboard } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useUploadPhoto from "../hooks/useUploadPhoto";

const Add = ({navigation}) => {
    const [loadingState, setLoadingState] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [caption, setCaption] = useState('');
    const { uploadPhoto, loading, error} = useUploadPhoto();

    const openImagePicker = async () => {
        setLoadingState(true);
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission Denied", "We need access to your photos to select an image.");
            setLoadingState(false);
            return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.Images,
            quality: 1,
            maxWidth: '100%',
            maxHeight: '100%',
            aspect: [1, 1],
        });
    
        setLoadingState(false);
    
        if (!result.canceled) {
            setSelectedImage({ ...result.assets[0], from: 'gallery' });
        }
    };
    
    const handleCameraLaunch = async () => {
        setLoadingState(true);
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission Denied", "We need access to your camera to take a photo.");
            setLoadingState(false);
            return;
        }
    
        const result = await ImagePicker.launchCameraAsync({
            saveToPhotos: true,
            quality: 1,
            maxWidth: '100%',
            maxHeight: '100%',
            aspect: [1, 1],
        });
    
        setLoadingState(false);
    
        if (!result.canceled) {
            setSelectedImage({ ...result.assets[0], from: 'camera' });
        }
    };
    

    const handleNewPost = async () => {
        Keyboard.dismiss();
        if (!selectedImage) {
            Alert.alert("No Image Selected", "Please select an image to post.");
            return;
        }
    
        try {
            setLoadingState(true);
    
            let file;
    
            // Determinar el origen de la imagen y realizar acciones previas si es necesario
            if (selectedImage.from === 'camera') {
                console.log("Processing image from camera...");
                // Simula un await si necesitas realizar una acción previa
                await new Promise(resolve => setTimeout(resolve, 500));
            } else if (selectedImage.from === 'gallery') {
                console.log("Processing image from gallery...");
                // Simula un await si necesitas realizar una acción previa
                await new Promise(resolve => setTimeout(resolve, 500));
            }
    
            const response = await fetch(selectedImage.uri);
            const blob = await response.blob();
    
            const fileName = selectedImage.uri.split('/').pop();
            file = new File([blob], fileName, { type: blob.type });
    
            console.log('File created:', file);
    
            const isUploaded = await uploadPhoto(file, caption);
            setLoadingState(false);
    
            if (isUploaded) {
                Alert.alert("Success", "Your post has been successfully uploaded.");
                navigation.navigate("Feed");
            } else {
                Alert.alert("Error", "There was an error uploading your post.");
            }
    
            setCaption('');
            setSelectedImage(null);
        } catch (err) {
            setLoadingState(false);
            console.error("Error handling new post:", err);
            Alert.alert("Error", "There was an error processing the file.");
        }
    };
    

    const handleGoBack = () => {
        setCaption('');
        setSelectedImage(null);
    }

    return (
        <View style={{ flex: 1, marginTop: 45 }}>
            {loadingState && <Ionicons name="heart" size="1" color="#173363" style={{ marginVertical: 20 }} />}
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
                            source={{ uri: selectedImage.uri }}
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
                            <View style={styles.addWrapper} >
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