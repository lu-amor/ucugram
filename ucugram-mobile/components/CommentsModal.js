import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  ActivityIndicator,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import CommentItem from "./CommentItem";
import useGetComment from "./../hooks/useGetComment";
import useAddComment from "./../hooks/useAddComment";

const CommentsModal = ({ onClose, post }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const getComment = useGetComment();
  const { addComment, loading, error } = useAddComment();

  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      const content = { content: newComment };

      const result = await addComment(content, post._id);
      if (result._id !== undefined) {
        const commentInfo = await getComment(result._id);
        setComments((prevComments) => [...prevComments, { commentInfo }]);
        setNewComment("");
      }
    }
  };

  useEffect(() => {
    const loadComments = async () => {
      const loadedComments = await Promise.all(
        post.comments.map(async (comment) => {
          const commentInfo = await getComment(comment._id);
          return { commentInfo };
        })
      );
      setComments(loadedComments);
    };
    loadComments();
  }, [post.comments]);

  const renderItem = ({ item, index }) => {
    return <CommentItem index={index} comment={item} />;
  };

  return (
    <Modal transparent={true} visible={true} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.modalContent}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text style={styles.modalTitle}>Comments</Text>
              </View>
              <FlatList
                data={comments}
                keyExtractor={(index) => index}
                renderItem={renderItem}
                ListEmptyComponent={
                  <Text style={styles.noCommentsText}>
                    Be the first one to comment!
                  </Text>
                }
                style={{ flex: 1, marginHorizontal: 15 }}
                contentContainerStyle={{ paddingBottom: 200 }}
              />
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Write a comment"
                  placeholderTextColor={"#888"}
                  value={newComment}
                  onChangeText={(text) => setNewComment(text)}
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddComment}
                >
                  {loading ? (
                    <ActivityIndicator size={18} color="white" />
                  ) : (
                    <Ionicons name="send" size={18} color="white" />
                    )}
                    {/* <Ionicons name="send" size={18} color="white" /> */}
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
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    height: 560,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#173363",
    marginLeft: 20,
    marginBottom: 10,
  },
  noCommentsText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 20,
  },
  commentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
  },
  commentUser: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#173363",
  },
  commentDate: {
    fontSize: 12,
    color: "#808080",
  },
  commentText: {
    fontSize: 16,
    color: "black",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    marginTop: 10,
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  addButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#173363",
    borderRadius: 15,
    width: 60,
    alignItems: "center",
  },
});

export default CommentsModal;
