import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ImageBackground, Image, Dimensions, ScrollView } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Searchbar } from 'react-native-paper';
// import { ProductCard } from "../../components/ProductCard/ProductCard";
import { ProductCard2 } from "../../components/ProductCard/ProductCard2";

import { storeData, getData } from "../../utils/Storage";
import { mock_products } from "../../assets/mock_data";

import RNPickerSelect from 'react-native-picker-select';

const win = Dimensions.get('window');
const ratio = win.width/1661;

export default function CarritoView({ navigation }) {

    const [searchQuery, setSearchQuery] = React.useState('');
    const [total, setTotal] = React.useState(0);

    // const isFocused = navigation.isFocused();

    const [productos, setProductos] = React.useState([
        {id: 0, name: "", precio: 0, image: "https://placehold.co/800", description: ""},
        {id: 0, name: "", precio: 0, image: "https://placehold.co/800", description: ""},
        {id: 0, name: "", precio: 0, image: "https://placehold.co/800", description: ""},
    ]);

    const handleClick = (id) => {
        navigation.navigate("Product", { id: id });
        // navigation.navigate("Edit", { id: id });
    }

    useFocusEffect(
        React.useCallback(() => {
            getData("cart").then((data) => {
                console.log(data);
                if(data != null) {
                    listado = []
                    for (let i = 0; i < data.length; i++) {
                        let product = mock_products.find((product) => product.id == data[i].id);
                        console.log(data[i].quantity);
                        product.quantity = Number(data[i].quantity);
                        listado.push(product);
                    }
                    setProductos(listado);
                }
            });

            setTotal(getTotal());

            // storeData("cart", []) 
        }, [])
    );

    function getTotal(){
        let total = 0;
        for (let i = 0; i < productos.length; i++) {
            total += productos[i].price * productos[i].quantity;
        }
        // console.log(total);
        return total;
    }

    const changeCarrito = (id, quantity) => {
        let listado = [...productos];
        let product = listado.find((product) => product.id == id);
        product.quantity = quantity;
        setProductos(listado);
        setTotal(getTotal());
    };


    return (
        <View style={styles.container_carrito}>

            <Text style={styles.title_carrito}>Carrito</Text>

            <View style={styles.container_products}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Text style={{fontSize: 25, fontWeight: "bold", marginBottom: 10}}>Productos</Text>
                    {
                        productos.map((product, index) => {
                            return (
                            <ProductCard2
                                    key={index}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    quantity={product.quantity}
                                    onChange={changeCarrito}
                                />
                            )
                        })
                    }

                    <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 10, alignSelf: "flex-end"}}>Sub-Total: GTQ {total}</Text>

                    <Text style={{fontSize: 25, fontWeight: "bold", marginBottom: 10}}>Forma de Pago</Text> 

                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'Efectivo', value: 'efectivo' },
                            { label: 'Tarjeta de Crédito', value: 'tarjeta' },
                        ]}
                        style={{
                            borderColor: "#000",
                        }}
                    />

                         
                </ScrollView>
            </View>

            <View style={styles.button_ordenar}>
                <Button 
                    title="Pagar" 
                    color={"#228B22"}
                    onPress={() => {}} />
            </View>

        </View>
    );
}
 
const styles = StyleSheet.create({
    container_carrito: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },

    title_carrito: {
        fontSize: 30,
        fontWeight: "bold",
        // marginBottom: 3,
        marginTop: 10,
        marginLeft: 10,
        paddingBottom: 10,
        alignSelf: "flex-start",
    },

    container_products: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "90%",
    },

    button_ordenar: {
        marginTop: 20,
        width: "90%",
        position: "absolute",
        bottom: 10,
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
});
  