import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ImageBackground, Image, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ProductCard } from "../../components/ProductCard/ProductCard";

import { storeData, getData } from "../../utils/Storage";
import { mock_products } from "../../assets/mock_data";

import { FAB } from 'react-native-paper';
import { TextInput as PaperTextInput } from 'react-native-paper';

import {launchImageLibrary} from 'react-native-image-picker';

const win = Dimensions.get('window');
const ratio = win.width/1661;

export default function EditView({ route, navigation }) {

    const { id } = route.params;
    const scrollRef = useRef();

    const [currentId, setCurrentId] = React.useState(id);

    const [product, setProduct] = React.useState({
        id: 0,
        name: "",
        price: 0,
        quantity: 0,
        image: "https://placehold.co/400",
        description: ""
    });

    const [quantity, setQuantity] = React.useState(1);

    const [recommendedProducts, setRecommendedProducts] = React.useState([
        {id: 0, name: "", precio: 0, image: "https://placehold.co/800", description: ""},
        {id: 0, name: "", precio: 0, image: "https://placehold.co/800", description: ""},
        {id: 0, name: "", precio: 0, image: "https://placehold.co/800", description: ""},
    ]);

    useEffect(() => {
        const product = mock_products.find((product) => product.id == id);
        setProduct(product);

        let data = [...mock_products];
        let shuffled = data
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
            .filter((product) => product.id != id)
            .slice(0, 3);

        setRecommendedProducts(shuffled)

    }, []);

    useEffect(() => {
        if(currentId == id) return;

        setQuantity(1);

        const product = mock_products.find((product) => product.id == currentId);
        setProduct(product);

        let data = [...mock_products];
        let shuffled = data
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
            .filter((product) => product.id != id)
            .slice(0, 3);

        setRecommendedProducts(shuffled)

        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }, [currentId]);

    const handleClick = (new_id) => {
        setCurrentId(new_id);
    }

    const changeImage = async() => {
       try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                includeBase64: false,
            });
            if(result.assets[0].uri) {
                setProduct({...product, image: result.assets[0].uri});
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.product_container_2}>
                <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>

                    <View>
                        <Image source={{uri: product.image}} style={styles.image_product} />
                        <FAB
                            icon="tray-arrow-up"
                            style={{
                                position: 'absolute',
                                margin: 16,
                                right: 0,
                                bottom: 0,
                                backgroundColor: '#fff',
                            }}
                            onPress={changeImage}
                        />
                    </View>
                   
                    <View style={styles.product_data}>

                        <PaperTextInput
                            label="Nombre del producto"
                            mode="outlined"
                            value={product.name}
                            onChangeText={text => setProduct({...product, name: text})}
                            style={{width: "100%", fontSize: 28, fontWeight: "bold", marginBottom: 10}}
                        />

                        <PaperTextInput
                            label="Precio (GTQ)"
                            mode="outlined"
                            value={product.price.toString()}
                            onChangeText={text => setProduct({...product, price: text})}
                            style={{width: "100%", fontSize: 24, fontWeight: "bold", color: "green", marginBottom: 10}}
                            keyboardType="number-pad"
                        />

                        <PaperTextInput
                            label="Existencias"
                            mode="outlined"
                            value={product.quantity.toString()}
                            onChangeText={text => setProduct({...product, quantity: text})}
                            style={{width: "100%", fontSize: 18, fontWeight: "bold", marginBottom: 10}}
                            keyboardType="number-pad"
                        />

                        <PaperTextInput
                            label="Descripción"
                            mode="outlined"
                            value={product.description}
                            onChangeText={text => setProduct({...product, description: text})}
                            style={{width: "100%", fontSize: 18, marginBottom: 10}}
                            multiline={true}

                        />

                        <View style={styles.order_container}>
                            <Button 
                                title="Eliminar Producto" 
                                color={"#ff0000"}
                                onPress={() => alert("Producto agregado al carrito")} />
                        </View>

                        <View style={styles.order_container}>
                            <Button 
                                title="Guardar Cambios" 
                                color={"#228B22"}
                                onPress={() => alert("Producto agregado al carrito")} />
                        </View>


                    </View>
                </ScrollView>

                <FAB
                    icon="arrow-left"
                    style={styles.fab}
                    onPress={() => navigation.goBack()}
                /> 
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
        position: 'absolute',
        margin: 16,
        left: 0,
        top: 0,
        backgroundColor: "#fff",
        borderRadius: 50,
    },

    product_container_2: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
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

        // paddingRight: 20,
    },

    button_login: {
        marginTop: 20,
        width: "80%",
    },

    quantity_container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // width: "100%",
        backgroundColor: "#acaeaf",
        borderRadius: 20,
        marginTop: 20,
        paddingHorizontal: 20,
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
    
});
  