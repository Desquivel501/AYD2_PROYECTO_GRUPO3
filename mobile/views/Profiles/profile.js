import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Table, Row } from "react-native-table-component";

const UserProfile = ({ user }) => {

  const [editing, setEditing] = useState(true); // Estado para controlar la edición
  const [containerStyle, setContainerStyle] = useState(styles.containerEditing);
  const [userData, setUserData] = useState(null);
  const [newName, setNewName] = useState(''); // Estado para el nuevo nombre
  const [newEmail, setNewEmail] = useState(''); // Estado para el nuevo correo
  const [ActualPassword, setActualPassword] = useState(''); // Estado para la nueva contraseña
  
  useEffect(() => {
    fetchProfileData();
  }, []);


  const fetchProfileData = () => {
    // Realiza una solicitud GET para obtener los datos actualizados del perfil después de guardar los cambios
    fetch("http://34.16.176.103:8080/user/profile", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            dpi:3284612
        }),
    })
    .then((response) => response.json())
    .then((json) => {
        console.log("Datos de perfil actualizados:", json);
        // Actualiza el estado con los datos del perfil actualizados
        setUserData(json);
        // Cambia a la vista no editable después de guardar los cambios
        toggleEditing();
    })
    .catch((error) => {
        console.error("Error fetching updated profile data: ", error);
        // Podrías mostrar un mensaje de error al usuario aquí
    });
  };


  const toggleEditing = () => {
    setEditing(!editing);
    // Cambiar el estilo del contenedor
    if (editing) {
      setContainerStyle(styles.containerEditing);
    } else {
      setContainerStyle(styles.container);
    }
  };

  const toggleRegresar = () => {
    setEditing(false);
  };

  const Guardar = () => {
      // Crea un objeto con los datos actualizados del perfil
      const updatedProfileData = {
          dpi: userData.dpi, 
          name: newName, 
          email: newEmail, 
          password: ActualPassword 
      };

      // Realiza la solicitud POST a user/update-profile con los datos actualizados del perfil
      fetch("http://34.16.176.103:8080/user/update-profile", {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProfileData),
      })
      .then((response) => response.json())
      .then((json) => {
        Alert.alert(
          "Perfil Actualizado",
          "Los cambios se han guardado exitosamente.",
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ],
          { cancelable: false }
        );
          console.log("Perfil actualizado:", json);
          // Después de actualizar el perfil, realiza una nueva solicitud GET para obtener los datos actualizados
          fetchProfileData();
      })
      .catch((error) => {
        Alert.alert(
          "Error al Actualizar Perfil",
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ],
          { cancelable: false }
        );
          console.error("Error updating profile: ", error);
          // Podrías mostrar un mensaje de error al usuario aquí
      });
  };

  return (
    <View>
      {!editing && <Text style={styles.titulo}>Perfil</Text>}
      <View style={containerStyle}>
        {userData ? (
          editing ? (
            <View style={styles.editUserInfo}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: userData.image }} style={styles.avatar} />
              </View>
              <TextInput
                placeholder="Nuevo nombre"
                placeholderTextColor="#E9D8FD"
                style={styles.input}
                value={newName} // Asigna el valor del estado newName al TextInput
                onChangeText={text => setNewName(text)} // Actualiza el estado newName cuando cambia el texto
              />
              <TextInput
                placeholder="Nuevo Correo"
                placeholderTextColor="#E9D8FD"
                style={styles.input}
                value={newEmail} // Asigna el valor del estado newEmail al TextInput
                onChangeText={text => setNewEmail(text)} // Actualiza el estado newEmail cuando cambia el texto
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#E9D8FD"
                style={styles.input}
                secureTextEntry={true}
                value={ActualPassword} // Asigna el valor del estado ActualPassword al TextInput
                onChangeText={text => setActualPassword(text)} // Actualiza el estado ActualPassword cuando cambia el texto
              />
              <TouchableOpacity onPress={() => { Guardar(); toggleEditing(); }} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Guardar cambios</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleRegresar} style={styles.btn_regresar}>
                <Text style={styles.saveButtonText}>Regresar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.userInfo}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: userData.image }} style={styles.avatar} />
              </View>
              {userData.role==2 &&<Icon name='star' color='gold' size={20} style={{marginBottom:"5%"}}> ({userData.score}) </Icon>}
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userEmail}>{userData.email}</Text>
              <Text style={styles.userEmail}>{userData.cui}</Text>
              <TouchableOpacity onPress={toggleEditing} style={styles.editProfileButton}>
                <Text style={styles.editProfileButtonText}>Editar perfil</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <Text>Cargando datos del perfil...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerEditing: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical:"30%",
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
  userInfo: {
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    paddingBottom: "10%",
    
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical:"30%",
    borderRadius: 10,
    marginHorizontal: "10%",
    marginTop: "21%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfo: {
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    paddingBottom: "10%",
    
  },
  avatar: {
    width: 120,
    height: 120,
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
  textinput: {
    fontSize: 16,
    color: "#666",
    textAlign:"left"
  },
  editProfileButton: {
    backgroundColor: "#7800FF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 20,
    overflow: "hidden",
  },
  editProfileButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  editUserInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: "10%",
    width: 250,
    borderColor: "#7800FF",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  btn_regresar: {
    backgroundColor: "#0003C0",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10
  },
  btn_imagen: {
    backgroundColor: "#4CAF50",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 50,
    marginTop: 10
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  titulo: {
    color: "#005A7A",
    marginTop: "15%",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  btn_usuarios: {
    backgroundColor: "#00A2FF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
    overflow: "hidden",
  },
  
});

export default UserProfile;
