import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Table, Row } from "react-native-table-component";
import icon_habilitar from './destello.png'
import icon_deshabilitar from './deshabilitar-cursor.png'

const HabDes = () => {
  const [enabledUsers, setEnabledUsers] = useState([]);
  const [disabledUsers, setDisabledUsers] = useState([]);
  const [enabledSellers, setEnabledSellers] = useState([]);
  const [disabledSellers, setDisabledSellers] = useState([]);

  useEffect(() => {
    fetchEnabledUsers();
    fetchDisabledUsers();
  }, []);

  const fetchEnabledUsers = () => {
    fetch("http://34.16.176.103:8080/enabled-users")
      .then((response) => response.json())
      .then((json) => {
        setEnabledUsers(json.filter(user => user.role === 1));
        setEnabledSellers(json.filter(user => user.role === 2));
      })
      .catch((error) => {
        console.error("Error fetching enabled users: ", error);
      });
  };

  const fetchDisabledUsers = () => {
    fetch("http://34.16.176.103:8080/disabled-users")
      .then((response) => response.json())
      .then((json) => {
        setDisabledUsers(json.filter(user => user.role === 1));
        setDisabledSellers(json.filter(user => user.role === 2));
      })
      .catch((error) => {
        console.error("Error fetching disabled users: ", error);
      });
  };

  const enableUser = (dpi) => {
    fetch("http://34.16.176.103:8080/user/enable-user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ dpi: dpi })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("User enabled:", json);
      fetchEnabledUsers(); // Actualizar la lista de usuarios habilitados después de la solicitud POST
      fetchDisabledUsers(); // Actualizar la lista de usuarios inhabilitados después de la solicitud POST
    })
    .catch((error) => {
      console.error("Error enabling user: ", error);
    });
  };

  const disableUser = (dpi) => {
    fetch("http://34.16.176.103:8080/user/disable-user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ dpi: dpi })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("User disabled:", json);
      fetchEnabledUsers(); // Actualizar la lista de usuarios habilitados después de la solicitud POST
      fetchDisabledUsers(); // Actualizar la lista de usuarios inhabilitados después de la solicitud POST
    })
    .catch((error) => {
      console.error("Error disabling user: ", error);
    });
  };

  const BtnDeshabilitar = ({ dpi }) => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={() => disableUser(dpi)} style={styles.btn_habdes}>
          <Image source={icon_deshabilitar} style={styles.icon_d} />
        </TouchableOpacity>
      </View>
    );
  };
  
  const BtnHabilitar = ({ dpi }) => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={() => enableUser(dpi)} style={styles.btn_habdes}>
          <Image source={icon_habilitar} style={styles.icon_h} />
        </TouchableOpacity>
      </View>
    );
  };
  
        
  const Avatar = ({image}) => {
      return (
          <View style={{flex:1, alignItems:"center",justifyContent:"center"}}>
              <Image source={{ uri: image }} style={styles.avatar} />
          </View>
          );
      };

      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.containertables}>
              <Text style={styles.textHabDes}>Usuarios habilitados</Text>
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#000" }}>
                  <Row
                    data={["Imagen", "DPI", "Nombre", "Correo", "Deshabilitar"]}
                    style={styles.tableHeader2}
                    textStyle={{ textAlign: "center", fontWeight: "bold", color: "#F7DC6F", paddingVertical: "7%", fontSize: 11 }}
                  />
                  {enabledUsers.map((user, index) => (
                     
                    <Row key={index} data={[<Avatar image={user.image} />, user.dpi, user.name, user.email, <BtnDeshabilitar dpi={user.dpi} />]} textStyle={styles.tablaRow2} />
                  ))}
                </Table>
              </View>
        
              <Text style={styles.textHabDes}>Usuarios deshabilitados</Text>
              <View style={styles.tableContainer}>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#000" }}>
                  <Row
                    data={["Imagen", "DPI", "Nombre", "Correo", "Habilitar"]}
                    style={styles.tableHeader}
                    textStyle={{ textAlign: "center", fontWeight: "bold", color: "#F7DC6F", paddingVertical: "7%", fontSize: 11 }}
                  />
                  {disabledUsers.map((user, index) => (
                    <Row key={index} data={[<Avatar image={user.image} />, user.name, user.dpi, user.email, <BtnHabilitar dpi={user.dpi} />]} textStyle={styles.tablaRow} />
                  ))}
                </Table>
              </View>
            </View>
          </View>
      
          <View style={styles.container}>
            <ScrollView>
              <Text style={{ color: "green", marginVertical: "5%", textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Vendedores habilitados</Text>
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#000" }}>
                  <Row data={['Imagen', 'DPI', 'Nombre', 'Correo', 'Deshabilitar']} style={styles.tableHeader2_v} textStyle={{ textAlign: 'center', fontWeight: "bold", color: "white", paddingVertical: "7%", fontSize: 11 }} />
                  {enabledSellers.map((user, index) => (
                    
                    <Row key={index} data={[<Avatar image={user.image} />, user.dpi, user.name, user.email, <BtnDeshabilitar dpi={user.dpi}/>]} textStyle={styles.tablaRow2} />
                  ))}
                </Table>
              </View>
        
              <Text style={{ color: "green", marginVertical: "5%", textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Vendedores deshabilitados</Text>
              <View style={styles.tableContainer_v}>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#000" }}>
                  <Row data={['Imagen', 'DPI', 'Nombre', 'Correo', 'Habilitar']} style={styles.tableHeader_v} textStyle={{ textAlign: 'center', fontWeight: "bold", color: "white", paddingVertical: "7%", fontSize: 11 }} />
                  {disabledSellers.map((user, index) => (
                    
                    <Row key={index} data={[<Avatar image={user.image} />, user.dpi, user.name, user.email, <BtnHabilitar dpi={user.dpi}/>]} textStyle={styles.tablaRow2} />
                  ))}
                </Table>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      );
      
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    paddingTop:10,
    paddingBottom:17,
    borderRadius: 10,
    marginHorizontal: "2%",
    marginTop: "15%",
    marginBottom: "2%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titulo: {
    color: "#005A7A",
    marginTop: "15%",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  tableHeader: {
    backgroundColor: "#212F3D",
  },
  tableHeader_v: {
    backgroundColor: "#0E6251",
  },
  tableHeader2: {
    backgroundColor: "#2874A6",
  },
  tableHeader2_v: {
    backgroundColor: "#148F77",
  },
  tablaRow2: {
    
    color: "black",
    textAlign:"center",
    fontSize: 11,
  },
  tablaRow: {
    fontSize: 11,
    color: "#F1C40F",
    textAlign:"center"
  },
  tablaRow2_v: {
    fontSize: 11,
    color: "black",
    textAlign:"center"
  },
  tablaRow_v: {
    fontSize: 11,
    color: "#BDC3C7",
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center"
  },
  tableContainer: {
    backgroundColor:"#2C3E50",
    alignSelf: "stretch", // Asegurar que la tabla se estire horizontalmente
    

  },
  tableContainer_v: {
    backgroundColor:"#117864",
    alignSelf: "stretch", // Asegurar que la tabla se estire horizontalmente
    

  },
  containertables: {
    flex: 1
  },
  line: {
    borderBottomColor: "#616A6B",
    borderBottomWidth: 1,
    marginTop: "7%",
  },
  textHabDes :{
    color: "#005A7A",
    marginVertical: "5%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  icon_h: {
    flex:1,
    height:30,
    width:30,
    backgroundColor: "#F1C40F",
    borderRadius:"20%",
    marginVertical:2,
    
  },
  icon_d: {
    flex:1,
    height:30,
    width:30,
    backgroundColor: "#BDC3C7",
    borderRadius:"20%",
    marginVertical:2,
    
  },
  avatar: {
    flex:1,
    height:30,
    width:30,
    borderRadius:"20%",
    marginVertical:2,
    
  }
});

export default HabDes;
