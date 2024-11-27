import React, {useState, useEffect, useRef} from "react";
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from "react-native";
import { useAuth, handleReload } from "../context/AuthContext";
import { PROFILE_ACTIONS, useProfile } from "../context/ProfileContext";
import { useGetProfile } from "../hooks/useGetProfile";
import Avatar from "./Avatar";
import useUpdateProfileInfo from "../hooks/useUpdateProfileInfo";

const EditProfile = ({ navigation }) => {
    const { state: authState } = useAuth();
    const { state: profileState, dispatch: dispatchProfile } = useProfile();
    const getProfile = useGetProfile()
    const [username, setUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [description, setDescription] = useState("");
    const {updateProfile, loading, error} = useUpdateProfileInfo();
    
    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate("Login");
        }
    }, []);

    useEffect(() => {
        const reload = async () => {
            if (authState.user) {
                dispatchProfile({ type: PROFILE_ACTIONS.LOADING });
                await getProfile(authState.user._id);
                setUsername(authState.user.username);
                setDescription(authState.user.description);
            }
        };
        reload();
    }, [authState]);

    const goHome = () => {
        navigation.navigate("Feed");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const profileInfo = { username, profilePicture, description };
        const result = await updateProfile(profileInfo);
        result === true ? goHome() : Alert.alert("Error", error);
    }

    return (
        <View style={styles.container}>
            <View style={styles.field}>
                <Text aria-label="username" style={styles.label}>
                    username
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={authState.user?.username}
                    value={username}
                    onChangeText={setUsername}
                ></TextInput>
            </View>
            <View style={styles.field}>
                <Text aria-label="description" style={styles.label}>
                    description
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={authState.user?.description}
                    value={description}
                    onChangeText={setDescription}
                ></TextInput>
            </View>
            <View style={styles.field}>
                <Text aria-label="profile picture" style={styles.label}>
                    profile picture
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your profile picture's url"
                    value={profilePicture}
                    onChangeText={setProfilePicture}
                ></TextInput>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleSubmit}
                >
                    <Text aria-label="login" style={styles.loginButtonText}>
                        Accept
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginBottom: 40,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: "bold",
    },
    email: {
        fontSize: 16,
        color: "grey",
    },
    field: {
        marginTop: 10,
        marginBottom: 30,
        width: "100%",
        fontSize: 16,
        borderBottomColor: "rgb(30, 30, 109)",
        borderBottomWidth: 1,
        padding: 3,
    },
    label: {
        fontSize: 14,
        fontWeight: 600,
        color: "rgb(30, 30, 109)",
        marginBottom: 5,
    },
    input: {
        width: "100%",
        marginTop: 3,
        fontSize: 18,
    },
    loginButton: {
        backgroundColor: "rgb(30, 30, 109)",
        width: "100%",
        borderRadius: 12,
        padding: 10,
    },
    loginButtonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
        marginTop: 10,
        paddingTop: 40,
    },
});

export default EditProfile;
