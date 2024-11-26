import React, { useState } from "react";
import { 
View, 
Text, 
Image, 
Button, 
Alert, 
StyleSheet, 
TouchableOpacity, 
TextInput, 
KeyboardAvoidingView, 
Keyboard, 
Platform 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import useUploadPhoto from "../hooks/useUploadPhoto";

const Add = ({ navigation }) => {
const [selectedImage, setSelectedImage] = useState(null);
const [caption, setCaption] = useState("");
const [loadingState, setLoadingState] = useState(false);
const { uploadPhoto } = useUploadPhoto();

const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
    Alert.alert("Permission Denied", "We need access to your photos.");
    return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
    quality: 1,
    aspect: [1, 1],
    });

    if (!result.canceled) {
    setSelectedImage(result.assets[0]);
    }
};

const handleCameraLaunch = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
    Alert.alert("Permission Denied", "We need access to your camera.");
    return;
    }

    const result = await ImagePicker.launchCameraAsync({
    quality: 1,
    aspect: [1, 1],
    });

    if (!result.canceled) {
    setSelectedImage(result.assets[0]);
    }
};

    const handleSelectImage = async (source) => {
        let selectedImage = null;

        if (source === "gallery") {
            selectedImage = await selectImageFromGallery();
        } else if (source === "camera") {
            selectedImage = await takePhotoWithCamera();
        }

        if (selectedImage) {
            setSelectedImage(selectedImage);
            console.log("Selected image:", selectedImage);
        } else {
            Alert.alert("No Image Selected", "Please try again.");
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

        const response = await fetch(selectedImage.uri);
        console.log("response: ", response);
        const blob = await response.blob();
        console.log("blob: ", blob);
        const fileName = selectedImage.uri.split("/").pop();
        console.log("filename: ", fileName);
        const file = new File([blob], fileName, { type: blob.type });
        console.log("file: ", file);

    const isUploaded = await uploadPhoto(file, caption);
    setLoadingState(false);

    if (isUploaded) {
        Alert.alert("Success", "Your post has been successfully uploaded.");
        navigation.reset({
        index: 0,
        routes: [{ name: "Feed" }],
        });
        setCaption("");
        setSelectedImage(null);
    } else {
        Alert.alert("Error", "There was an error uploading your post.");
    }
    } catch (err) {
    setLoadingState(false);
    console.error("Upload failed:", err);
    Alert.alert("Error", "There was an issue processing your image.");
    }
};

const handleGoBack = () => {
    setCaption("");
    setSelectedImage(null);
};

return (
    <View style={{ flex: 1, marginTop: 45 }}>
    {loadingState && <Ionicons name="heart" size={24} color="#173363" style={{ marginVertical: 20 }} />}
    {selectedImage ? (
        <View style={{ flex: 1 }}>
        <View style={styles.topInfoContainer}>
            <TouchableOpacity style={styles.backButtonContainer} onPress={handleGoBack}>
            <Ionicons name="chevron-back-outline" color="#173363" size={32} style={styles.backButton} />
            </TouchableOpacity>
            <Text style={styles.newPostText}>New Post</Text>
        </View>
        <View style={{ width: 350, height: 350, alignSelf: "center" }}>
            <Image source={{ uri: selectedImage.uri }} style={{ width: 350, height: 350 }} resizeMode="cover" />
        </View>
        <View style={styles.writeCaptionContainer}>
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.writeCaptionWrapper}
            >
            <TextInput
                style={styles.input}
                placeholder="Write a caption"
                value={caption}
                onChangeText={setCaption}
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
    ) : (
        <View style={styles.optionsContainer}>
        <View style={{ marginTop: 20 }}>
            <Button title="Choose from Device" onPress={openImagePicker} />
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