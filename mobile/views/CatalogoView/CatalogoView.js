import React from "react";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ImageBackground, Image, Dimensions, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Row, Col } from "../../components/MyGrid/MyGrid";
import { Searchbar } from 'react-native-paper';
import { ProductCard } from "../../components/ProductCard/ProductCard";

// const image = { uri: "../assets/bk.png"}

const win = Dimensions.get('window');
const ratio = win.width/1661;

const products = [
    {
        id: 1,
        name: "Pizza de Pepperoni",
        price: 100,
        image: "https://images.hola.com/imagenes/cocina/recetas/20220208204252/pizza-pepperoni-mozzarella/1-48-890/pepperoni-pizza-abob-m.jpg"
    },
    {
        id: 2,
        name: "Coca-Cola",
        price: 5,
        image: "https://d2o812a6k13pkp.cloudfront.net/fit-in/1080x1080/Productos/40380804_0120221003174051.jpg"
    },
    {
        id: 3,
        name: "Pringles",
        price: 8,
        image: "https://californiaranchmarket.com/cdn/shop/products/001080.jpg?v=1623164914"
    },
    {
        id: 4,
        name: "Lays",
        price: 5,
        image: "https://i0.wp.com/dailymarket.com.gt/wp-content/uploads/2022/10/902421-PAPA-LAYS-ORIGINAL.jpg?fit=1040%2C1040&ssl=1"
    },
    {
        id: 5,
        name: "Cheetos",
        price: 6,
        image: "https://m.media-amazon.com/images/I/816ubtKmIHL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 6,
        name: "Mountain Dew",
        price: 50,
        image: "https://chedrauimx.vtexassets.com/arquivos/ids/29049515/1208500_00.jpg?v=638485473030830000"
    },
]

export default function CatalogoView({ navigation }) {

    const [searchQuery, setSearchQuery] = React.useState('');

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
                    products.map((product, index) => {
                        return (
                           <ProductCard
                                key={index}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
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
  