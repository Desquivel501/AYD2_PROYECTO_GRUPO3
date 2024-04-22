import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const UserProfile = ({ user }) => {
  return (
    <View>
      <Text style={styles.titulo}>Perfil</Text>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm1eyPkS00wrbemn299yWONeOdICDfqxqySg&s",
            }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>Sebastian</Text>
          <Text style={styles.userEmail}>sebas@gmail</Text>
          <Text style={styles.userEmail}>30055541505050</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "10%",
    borderRadius: 10,
    marginHorizontal: "10%",
    marginTop: "15%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  userEmail: {
    textAlign: "center",
    fontSize: 16,
    
    color: "#666",
  },
  editProfileButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  editProfileButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  titulo: {
    color: "#005A7A",
    marginTop: "15%",
    textAlign: "center",
    fontSize: "40",
    fontWeight: "bold",
  },
});

export default UserProfile;
