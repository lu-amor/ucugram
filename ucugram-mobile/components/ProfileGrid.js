import React from 'react';
import { FlatList, StyleSheet, Dimensions, View } from 'react-native';
import ProfilePost from './ProfilePost';

const ProfileGrid = ({ posts, user, navigation }) => {
    const numColumns = 3;

    const renderItem = ({ item, index }) => {
        const isLastRowItem = (posts.length % numColumns !== 0) && index >= posts.length - (posts.length % numColumns);

        return (
            <View style={isLastRowItem ? styles.centeredGridItem : styles.gridItem}>
                <ProfilePost
                    idx={index}
                    post={item}
                    user={user}
                    navigation={navigation}
                />
            </View>
        );
    };

    return (
        <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            numColumns={numColumns}
            contentContainerStyle={styles.gridContainer}
        />
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        paddingVertical: 20,
    },
    gridItem: {
        flex: 1,
        margin: 1,
        maxWidth: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3,
    },
    centeredGridItem: {
        flex: 1,
        margin: 1,
        maxWidth: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3,
        alignSelf: 'center', // centra el elemento en la fila si es el último de una fila incompleta
    },
});

export default ProfileGrid;
