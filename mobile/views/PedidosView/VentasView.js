import React from "react";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ImageBackground, Image, Dimensions, ScrollView } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Row, Col } from "../../components/MyGrid/MyGrid";
import { Searchbar } from 'react-native-paper';
import { ProductCard } from "../../components/ProductCard/ProductCard";

import { storeData, getData } from "../../utils/Storage";

import { PedidoCard } from "../../components/PedidoCard/PedidoCard";
import { VentaCard } from "../../components/PedidoCard/VentaCard";


export default function VentasView({ navigation }) {

    const [ventas, setVentas] = React.useState([])

    const handleClick = (id) => {
        const pedido = pedidos.find((pedido) => pedido.purchase_id === id);
        storeData("pedido", pedido)
        navigation.navigate("Pedido", { id: id });
    }

    useFocusEffect(
        React.useCallback( () => {

            getData("user").then((user) => {

                fetch(`http://34.16.176.103:8080/user/sales?dpi=${user.id}`).then((response) => {
                    return response.json();
                }).then((data) => {
                    if(data != null || data != undefined || data.length > 0) {
                        setVentas(data);
                    }
                });
            });
        }, [])
    );

    return (
        <View style={styles.container}>

            <View style={styles.container_products}>

                <Text style={styles.title_pedidos}>Mis Ventas</Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                       ventas.length > 0 ? 
                        ventas.map((pedido, index) => {
                            return (
                                <>
                                    <VentaCard 
                                        key={index}
                                        name={pedido.name}
                                        total={pedido.total}
                                        fecha={pedido.date}
                                        imagen={pedido.image}
                                        cantidad={pedido.cantidad}
                                    />
                                    <View key={index + "-line"} style={styles.line} />
                                </>
                            )
                        })
                        :
                        <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 10, alignSelf:"center", marginTop: 10}}>No has tenido ventas :(</Text>
                    }
                </ScrollView>
            </View>

        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },

    container_products: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "90%",
    },

    input: {
        backgroundColor: "#fff",
        padding: 10,
        width: "80%",
        marginTop: 15,
        color: "#000",
    },
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

    button_login: {
        marginTop: 20,
        width: "80%",
    },
    search: {
        width: "95%",
        marginTop: 10,
        marginBottom: 10
        // position: "absolute",
    },
    image_product: {
        width: "80%",
        height: 150
    },
    item: {
        backgroundColor: "#f9c2ff",
        width: "90%", 
        borderColor:  "#000", 
        borderWidth:  1,
    },
    line: {
        borderBottomColor: '#989a9b',
        borderBottomWidth: 1,
        width: '100%',
        // marginVertical: 10,
      },
    title_pedidos: {
        fontSize: 30,
        fontWeight: "bold",
        // marginBottom: 3,
        marginTop: 10,
        marginLeft: 10,
        paddingBottom: 10,
        alignSelf: "flex-start",
    },
});
  