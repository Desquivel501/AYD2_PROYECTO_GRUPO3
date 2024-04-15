import React from "react";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ImageBackground, Image, Dimensions, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Row, Col } from "../../components/MyGrid/MyGrid";
import { Searchbar } from 'react-native-paper';
import { ProductCard } from "../../components/ProductCard/ProductCard";

import { storeData, getData } from "../../utils/Storage";
import { mock_products } from "../../assets/mock_data";

const win = Dimensions.get('window');
const ratio = win.width/1661;

export default function CatalogoView({ navigation }) {

    const [searchQuery, setSearchQuery] = React.useState('');

    const handleClick = (id) => {
        // navigation.navigate("ProductView", { id: id });
        // alert("Producto seleccionado: " + id);
        navigation.navigate("Product", { id: id });
    }

    return (
        <View style={styles.container}>

            <Searchbar
                placeholder="Buscar"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.search}
            />


            <View style={styles.container_products}>
                <ScrollView showsVerticalScrollIndicator={false}>
                {
                    mock_products.map((product, index) => {
                        return (
                           <ProductCard
                                key={index}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                description={product.description}
                                onSelect={handleClick}
                            />
                        )
                    })
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
    logo : {
        width: "90%",
        height: 512 * ratio,
        resizeMode: "contain",
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
});
  