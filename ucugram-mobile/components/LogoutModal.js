import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useLogout } from "../services/authService";

const LogoutModal = ({ navigation, isVisible, onClose }) => {
  const logout = useLogout();

  const handleLogout = async () => {
    const isLogout = await logout();
    if (isLogout) {
      navigation.replace("Login");
    }
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPressOut={onClose} />
        <View style={styles.modalContent}>
          <Text style={styles.text}>¿Deseas cerrar sesión?</Text>
          <TouchableOpacity style={styles.backButton} onPress={handleLogout}>
            <Text style={styles.backButtonText}>cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "ajust-content",
    backgroundColor: "lightgrey",
    borderRadius: 10,
    overflow: "hidden",
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  backButton: {
    backgroundColor: "rgb(30, 30, 109)",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  }
});

export default LogoutModal;
