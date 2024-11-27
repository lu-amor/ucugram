import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NavBar from "../components/NavBar";

const Notifications = ({navigation, route}) => {
    const { user } = route.params;
    return (
        <View>
            <View style={styles.page}>
                <View style={styles.container}>
                    <Text style={styles.text}>Notifications</Text>
                </View>
            </View>
            <NavBar user={user} activePage="notifications" navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingTop: 45,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 20,
    }
});

export default Notifications;