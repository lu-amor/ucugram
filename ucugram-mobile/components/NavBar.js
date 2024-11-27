import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";
import LogoutModal from "./LogoutModal";
import * as Haptics from 'expo-haptics';
import { useNavigation } from "@react-navigation/native";

const NavBar = () => {
  const { state: authState } = useAuth();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState("profile"); 

  const handleGoProfile = async () => {
    navigation.navigate("Profile");
  };

  const handleLogout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setLogoutModalVisible(true);
  };

  const handleActivePage = (page, iconName) => {
    setCurrentPage(iconName);
    navigation.navigate(page);
  };
  
  return (
    <View style={styles.navBar}>
      <View style={styles.navBarIcons}>
        <Ionicons
          name={currentPage === "home" ? "home" : "home-outline"}
          size={35}
          color="#173363"
          onPress={()=> handleActivePage("Feed", "home")}
        />
        <Ionicons
          name={currentPage === "search" ? "search" : "search-outline"}
          size={35}
          color="#173363"
          onPress={()=> handleActivePage("Search", "search")}
        />
        <Ionicons
          name={currentPage === "add" ? "add-circle" : "add-circle-outline"}
          size={35}
          color="#173363"
          onPress={()=> handleActivePage("Add", "add")}
        />
{/*         <Ionicons
          name={
            currentPage === "notifications"
              ? "notifications"
              : "notifications-outline"
          }
          size={35}
          color="#173363"
          onPress={()=> handleActivePage("Notifications", "notifications")}
        />*/}
        <TouchableOpacity
          onPress={handleGoProfile}
          onLongPress={handleLogout}
        >
          <View style={styles.avatar}>
            <Avatar user={authState.user}></Avatar>
          </View>
        </TouchableOpacity>
        {logoutModalVisible && (
          <LogoutModal
            navigation={navigation}
            isVisible={logoutModalVisible}
            onClose={() => setLogoutModalVisible(false)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingBottom: 35,
    backgroundColor: "white",
  },
  navBarIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  avatar: {
    width: 35,
    height: 35,
    // borderRadius: 100,
    // borderColor: "#173363",
    // borderWidth: 1,
  },
  avatarActive: {
    width: 35,
    height: 35,
    borderRadius: 100,
    borderColor: "#173363",
    borderWidth: 2,
  },
});

export default NavBar;
