import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Table, Row } from "react-native-table-component";
import icon_aceptar from './aceptar.png'
import icon_rechazar from './rechazar.png'

const SolVend = () => {
  
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
        fetchPendingSellers();
    }, 5000); // 5000 milliseconds = 5 seconds

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(interval);
}, []);

  const fetchPendingSellers = () => {
      fetch('http://34.16.176.103:8080/pending-sellers')
          .then(response => response.json())
          .then(data => setSellers(data))
          .catch(error => console.error('Error fetching pending sellers:', error));
  };

  const declineSeller = (dpi) => {
    fetch("http://34.16.176.103:8080/user/decline-seller", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ dpi: dpi })
    })
    .then((response) => response.json())
    .then((json) => {
      Alert.alert(
        `Se rechazò al vendedor ${dpi}`,
        "Los cambios se han guardado exitosamente.",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
      console.log("Seller declined:", json);
      fetchPendingSellers(); // Actualizar la lista de solicitudes después de rechazar un vendedor
    })
    .catch((error) => {
      console.error("Error declining seller: ", error);
    });
  };

  const acceptSeller = (dpi) => {
    fetch("http://34.16.176.103:8080/user/accept-seller", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ dpi: dpi })
    })
    .then((response) => response.json())
    .then((json) => {
      Alert.alert(
        `Se aceptò al vendedor ${dpi}`,
        "Los cambios se han guardado exitosamente.",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
      console.log("Seller accepted:", json);
      fetchPendingSellers(); // Actualizar la lista de solicitudes después de aceptar un vendedor
    })
    .catch((error) => {
      console.error("Error accepting seller: ", error);
    });
  };

  const BtnDeshabilitar = ({ dpi }) => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={() => declineSeller(dpi)} style={styles.btn_habdes}>
          <Image source={icon_rechazar} style={styles.icon_d} />
        </TouchableOpacity>
      </View>
    );
  };

  const BtnHabilitar = ({ dpi }) => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={() => acceptSeller(dpi)} style={styles.btn_habdes}>
          <Image source={icon_aceptar} style={styles.icon_h} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderRows = () => {
    return sellers.map((seller, index) => (
      <Row
        key={index}
        data={[
          <Avatar image={seller.image} />,
          seller.dpi,
          seller.name,
          seller.email,
          <View>
            <BtnHabilitar dpi={seller.dpi} />
            <BtnDeshabilitar dpi={seller.dpi} />
          </View>
        ]}
        textStyle={styles.tablaRow_v}
      />
    ));
  };

  const Avatar = ({ image }) => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={{ uri: image }} style={styles.avatar} />
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.containertables}>
            <Text style={styles.textHabDes}>Solicitudes de Vendedores</Text>
            <View style={styles.tableContainer_v}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#000" }}>
                <Row data={['Imagen', 'DPI', 'Nombre', 'Correo', 'Aceptar / Rechazar']} style={styles.tableHeader_v} textStyle={{ textAlign: 'center', fontWeight: "bold", color: "white", paddingVertical: "7%", fontSize: 11 }} />
                {renderRows()}
              </Table>
            </View>
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
    paddingTop: 10,
    paddingBottom: 17,
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
  tableHeader_v: {
    backgroundColor: "#229954",
  },
  tablaRow_v: {
    fontSize: 11,
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  tableContainer_v: {
    backgroundColor: "#52BE80",
    alignSelf: "stretch", // Asegurar que la tabla se estire horizontalmente
  },
  containertables: {
    flex: 1
  },
  textHabDes: {
    color: "#005A7A",
    marginVertical: "5%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  icon_h: {
    flex: 1,
    height: 30,
    width: 30,
    backgroundColor: "#F1C40F",
    borderRadius: "20%",
    marginVertical: 2,
  },
  icon_d: {
    flex: 1,
    height: 40,
    width: 30,
    borderRadius: "20%",
    marginVertical: 2,
  },
  avatar: {
    height: 50,
    width: 50,
    marginVertical: 2,
  }
});

export default SolVend;
