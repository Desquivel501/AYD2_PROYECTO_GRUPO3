import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import { Table, Row } from "react-native-table-component";

const UserProfile = ({ user }) => {
  const [editing, setEditing] = useState(false); // Estado para controlar la edición
  const [UsuariosDisp, setUsuariosDisp] = useState(false); // Estado para controlar la Usuarios
  const [VendDisp, setVendDisp] = useState(false); // Estado para controlar la Vendedores
  const [SolVend, setSolVend] = useState(false); // Estado para controlar la solicitudes de Vendedores

  const toggleEditing = () => {
    setEditing(!editing); // Cambia el estado al contrario del estado actual
  };

  const toggleUsuariosDisp = () => {
    setUsuariosDisp(!UsuariosDisp); // Cambia el estado al contrario del estado actual
  };

  const toggleVendDisp = () => {
    setVendDisp(!VendDisp); // Cambia el estado al contrario del estado actual
  };

  const toggleSolVend = () => {
    setSolVend(!SolVend); // Cambia el estado al contrario del estado actual
  };

  const toggleRegresar = () => {
    setEditing(false);
    setUsuariosDisp(false);
    setVendDisp(false);
    setSolVend(false);
  };

  const ProfileBasic = () => {
    return (
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm1eyPkS00wrbemn299yWONeOdICDfqxqySg&s",
            }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.userName}>Sebastian</Text>
        <Text style={styles.userEmail}>sebas@gmail</Text>
        <Text style={styles.userEmail}>30055541505050</Text>
        <TouchableOpacity onPress={toggleEditing} style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Editar perfil</Text>
        </TouchableOpacity>
        <View>
          <View style={styles.line}></View>
          <TouchableOpacity onPress={toggleUsuariosDisp} style={styles.btn_usuarios}>
            <Text style={styles.editProfileButtonText}>Usuarios en el sistema</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleVendDisp} style={styles.btn_vendedores}>
            <Text style={styles.editProfileButtonText}>Vendedores en el sistema</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSolVend} style={styles.btn_sol_vendedores}>
            <Text style={styles.editProfileButtonText}>Solicitudes Vendedores</Text>
          </TouchableOpacity>
          {/* Contenedor de la tabla */}
        </View>
      </View>
    );
  };

  const BtnHabilitar = (text) => {
    return (
      <TouchableOpacity style={styles.btn_regresar}>
        <Text style={styles.saveButtonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text style={styles.titulo}>Perfil</Text>
      <View style={styles.container}>
        {editing ? (
          <View style={styles.editUserInfo}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm1eyPkS00wrbemn299yWONeOdICDfqxqySg&s",
                }}
                style={styles.avatar}
              />
            </View>
            <TextInput
              placeholder="Nuevo nombre"
              placeholderTextColor="#CCD1D1"
              style={styles.input}
            />
            <TextInput
              placeholder="Nuevo email"
              placeholderTextColor="#CCD1D1"
              style={styles.input}
            />
            <TextInput
              placeholder="Nuevo teléfono"
              placeholderTextColor="#CCD1D1"
              style={styles.input}
            />
            <TouchableOpacity onPress={toggleEditing} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Guardar cambios</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleRegresar} style={styles.btn_regresar}>
              <Text style={styles.saveButtonText}>Regresar</Text>
            </TouchableOpacity>
          </View>
        ) : UsuariosDisp ? (
          <View style={styles.containertables}>
            <Text style={styles.textHabDes}>Usuarios habilitados</Text>
            <View>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#000" }}>
              <Row data={['Name', 'Age', 'Accion']} style={styles.tableHeader2} textStyle={{ textAlign: 'center', fontWeight: "bold",color: "#F7DC6F" }} />
                <Row data={["John", "25", BtnHabilitar("Habilitar")]} textStyle={styles.tablaRow2} />
                <Row data={["Jane", "30", BtnHabilitar("Habilitar")]} textStyle={styles.tablaRow2} />
                <Row data={["Doe", "35", BtnHabilitar("Habilitar")]} textStyle={styles.tablaRow2} />
              </Table>
            </View>
            
            <Text style={styles.textHabDes}>Usuarios inhabilitados</Text>
            <View style={styles.tableContainer}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#000" }}>
              <Row data={['Name', 'Age', 'Accion']} style={styles.tableHeader} textStyle={{ textAlign: 'center', fontWeight: "bold",color: "#F7DC6F" }} />
                <Row data={["John", "25", BtnHabilitar("Habilitar")]} textStyle={styles.tablaRow} />
                <Row data={["Jane", "30", BtnHabilitar("Habilitar")]} textStyle={styles.tablaRow} />
                <Row data={["Doe", "35", BtnHabilitar("Habilitar")]} textStyle={styles.tablaRow} />
              </Table>
            </View>
            <TouchableOpacity onPress={toggleRegresar} style={styles.btn_regresar}>
              <Text style={styles.saveButtonText}>Regresar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ProfileBasic />
        )}
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
    padding: 10,
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
    paddingBottom: "5%",
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
    backgroundColor: "#7800FF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
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
    height: "15%",
    width: 200,
    borderColor: "#ddd",
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
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  btn_vendedores: {
    backgroundColor: "#4CAF50",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 1,
    overflow: "hidden",
  },
  btn_sol_vendedores: {
    backgroundColor: "#E19609",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 1,
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#212F3D",
  },
  tableHeader2: {
    backgroundColor: "#2874A6",
  },
  tablaRow2: {
    
    color: "black",
    textAlign:"center"
  },
  tablaRow: {
    
    color: "#F1C40F",
    textAlign:"center"
  },
  tableContainer: {
    backgroundColor:"#2C3E50",
    alignSelf: "stretch", // Asegurar que la tabla se estire horizontalmente
    overflow: "scroll",

  },
  containertables: {
    width: "auto",
    alignSelf: "stretch", // Asegurar que la tabla se estire horizontalmente
  },
  line: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  textHabDes :{
    color: "#005A7A",
    marginVertical: "3%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  }
});

export default UserProfile;
