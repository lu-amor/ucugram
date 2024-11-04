import React, { useState } from "react";
import { View, Text, Image, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Add = () => {
    const [selectedImage, setSelectedImage] = useState(null);

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

    return (
        <View style={{ flex: 1, marginTop: 45 }}>
            {selectedImage && (
                <View>
                    <View style={styles.topInfoContainer}>
                        <TouchableOpacity style={styles.backButtonContainer} onPress={() => setSelectedImage(null)}>
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
                </View>
            )}
            { (!selectedImage) && (
                <>
                    <View style={{ marginTop: 20 }}>
                        <Button title="Choose from Device" onPress={openImagePicker}/>
                    </View>
                    <View style={{ marginTop: 20, marginBottom: 50 }}>
                        <Button title="Open Camera" onPress={handleCameraLaunch} />
                    </View>
                </>
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
});

export default Add;