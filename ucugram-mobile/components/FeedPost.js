import { View, Text, Image, StyleSheet, Dimensions,  TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Avatar from "./Avatar";

const FeedPost = ({ post, user, navigation }) => {
    const scale = useSharedValue(1);
    const isZooming = useSharedValue(false);


    const pinchGesture = Gesture.Pinch()
        .onStart(() => {
            isZooming.value = true;
        })
        .onUpdate((event) => {
            if (event.scale > 1) {
                scale.value = withTiming(event.scale, { duration: 0 });
            }
        })
        .onEnd(() => {
            scale.value = withTiming(1);
            isZooming.value = false;
        });

        const animatedImageStyle = useAnimatedStyle(() => {
            return {
                transform: [{ scale: scale.value }],
                zIndex: isZooming.value ? 10 : 0,
                position: isZooming.value ? 'absolute' : 'relative',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            };
        });
        
        const belowPictureStyle = useAnimatedStyle(() => {
            return {
                zIndex: isZooming.value ? -1 : 1,
            };
        });

    return (
        <GestureHandlerRootView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate(post.username, { friend: { username: post.username, profilePicture: post.profilePicture, bio: post.description } })}>
                <View style={styles.userInfo}>
                    <View style={styles.avatar}>
                    <Avatar user={user} ></Avatar>
                    </View>
                    <Text style={styles.usernameTop}>{post.username}</Text>
                    <Text style={styles.postDate}>{post.date}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.postCard}>
                <GestureDetector gesture={pinchGesture}>
                    <Animated.View style={[styles.cardImage, animatedImageStyle]}>
                        <Image source={post.imageUrl } style={styles.image} />
                    </Animated.View>
                </GestureDetector>
            </View>
            <Animated.View style={[styles.belowPicture, belowPictureStyle]}>
                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity>
                        <Ionicons name="heart-outline" color='#ea5b0c' size={32} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="chatbubble-outline" color='#ea5b0c' size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 5 }}>
                        <Ionicons name="share-social-outline" color='#ea5b0c' size={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.userDesc}>
                    <Text>
                        <Text style={styles.usernameBottom}>{user.username}  </Text>
                        <Text style={styles.postDescription}>{post.description}</Text>
                    </Text>
                </View>
            </Animated.View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: "white",
    },
    avatar : {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: "#808080",
        borderWidth: 1,
        marginRight: 10,
        marginLeft: 0,
    },
    usernameTop: {
        fontSize: 18,
        fontWeight: "bold",
    },
    postDate: {
        marginTop: 3,
        marginLeft: "auto",
        fontSize: 12,
        color: "#808080",
    },
    postCard: {
        backgroundColor: "white",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardImage: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").width,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    belowPicture: {
        backgroundColor: "white",
        padding: 15,
    },
    actionButtonsContainer: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    userDesc: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    usernameBottom: {
        fontSize: 16,
        fontWeight: "bold",
    },
    postDescription: {
        fontSize: 14,
    },
});

export default FeedPost;