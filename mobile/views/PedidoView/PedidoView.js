import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ImageBackground, Image, Dimensions, ScrollView, Alert } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Row, Col } from "../../components/MyGrid/MyGrid";
import { IconButton, Searchbar } from 'react-native-paper';
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { PedidoCard2 } from "../../components/PedidoCard/PedidoCard2";

import { storeData, getData } from "../../utils/Storage";
import { mock_products } from "../../assets/mock_data";

import { FAB } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const win = Dimensions.get('window');
const ratio = win.width/1661;

export default function PedidoView({ route, navigation }) {

    const { id } = route.params;
    const scrollRef = useRef();

    const [pedido, setPedido] = React.useState({
        purchase_id: 0,
        vendedor: "",
        total: 0,
        products: [],
        score: 5
    });

    useFocusEffect(
        React.useCallback( () => {
            getData("pedido").then((pedido) => {
                setPedido(pedido);
            });
        }, [])
    );

    const changeReview = (score) => {
        setPedido({...pedido, score: score});
        let body = {
            purchase_id: pedido.purchase_id,
            dpi: pedido.dpi,
            score: score
        };

        fetch("http://34.16.176.103:8080/user/rate-purchase", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            if(data.status === "SUCCESS") {
                Alert.alert("Calificación guardada", "Su calificación ha sido guardada exitosamente");
            }
        });

    }

    return (
        <View style={styles.container}>
            <FAB
                icon="arrow-left"
                style={styles.fab}
                onPress={() => navigation.goBack()}
            />      
            <View style={styles.container_products}>
            <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
                    <Text style={styles.title_pedidos}>Pedido #{pedido.purchase_id}</Text>
                    <Text style={styles.vendedor_text}>Vendedor: {pedido.name}</Text>

                    <Text style={styles.vendedor_text}>Calificación</Text>
                    <View style={styles.score_container}>

                       {
                            [1, 2, 3, 4, 5].map((score) => {
                                return (
                                    <Icon name={pedido.score >= score ? "star" : "star-o"} size={30} color={pedido.score >= score ? "gold" : "gray"} 
                                        onPress={() => changeReview(score)}
                                    />
                                );
                            })
                       }

                    </View>
                    <View style={styles.line} />
                    <Text style={styles.prodcuts_title}>Productos</Text>
                        {
                            pedido.products.map((product, index) => {
                                return (
                                    <PedidoCard2
                                        key={index}
                                        name={product.name}
                                        cantidad={product.cantidad}
                                        total={Number(product.price) * Number(product.cantidad)}
                                        imagen={product.image}
                                    />
                                );
                            })
                        }       
                    <View style={styles.line} />
                    <Text style={styles.total_text}>Total: Q{pedido.total}</Text>
                </ScrollView>
            </View>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },

    fab: {
        position: 'relative',
        margin: 16,
        left: 0,
        top: 0,
        backgroundColor: "#fff",
        borderRadius: 50,
    },

    container_products: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "90%",
        alignSelf: "center",
    },

    product_container_2: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
    },

    image_product: {
        width: win.width,
        height: 220,
    },

    product_data: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",

        backgroundColor: "#fff",
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 20
    },

    button_login: {
        marginTop: 20,
        width: "80%",
    },

    score_container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        // justifyContent: "center",
        alignItems: "center",
        marginVertical: 15,
        width: "80%",
        alignSelf: "center",
        // alignItems: "center",
        // borderRadius: 20,
        // paddingHorizontal: 20,
    },

    order_container: {
        marginTop: 20,
        width: "100%",
        alignSelf: "center",
    },

    line: {
        borderBottomColor: '#989a9b',
        borderBottomWidth: 1,
        width: '100%',
        marginVertical: 10,
        // Additional styles for the line if needed
      },
    
    title_pedidos: {
        fontSize: 32,
        fontWeight: "bold",
        // marginBottom: 3,
        marginTop: 10,
        marginLeft: 10,
        paddingBottom: 10,
        alignSelf: "flex-start",
    },
    vendedor_text: {
        fontSize: 22,
        fontWeight: "bold",
        // marginBottom: 3,
        marginTop: 10,
        marginLeft: 10,
        paddingBottom: 10,
        alignSelf: "flex-start",
    },
    prodcuts_title: {
        fontSize: 26,
        fontWeight: "bold",
        // marginBottom: 3,
        marginTop: 10,
        marginLeft: 10,
        paddingBottom: 10,
        alignSelf: "flex-start",
    },
    total_text: {
        fontSize: 22,
        fontWeight: "bold",
        // marginBottom: 3,
        marginTop: 10,
        marginRight: 10,
        paddingBottom: 20,
        // alignSelf: "flex-start",
        alignSelf: "flex-end",
        color: "green"

    },
    
});
  