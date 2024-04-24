    import React, { useEffect, useRef } from "react";
    import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ImageBackground, Image, Dimensions, ScrollView, Alert } from 'react-native';
    import { NavigationContainer } from '@react-navigation/native';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import Icon from 'react-native-vector-icons/FontAwesome';
    import { Row, Col } from "../../components/MyGrid/MyGrid";
    import { Searchbar } from 'react-native-paper';
    import { ProductCard } from "../../components/ProductCard/ProductCard";

    import { storeData, getData } from "../../utils/Storage";
    import { mock_products } from "../../assets/mock_data";

    import { FAB } from 'react-native-paper';

    const win = Dimensions.get('window');
    const ratio = win.width/1661;

    export default function ProductView({ route, navigation }) {

        const { id } = route.params;
        const scrollRef = useRef();

        const [currentId, setCurrentId] = React.useState(id);

        const [product, setProduct] = React.useState({
            product_id: 0,
            nombre: "",
            precio: 0,
            existencia: 0,
            imagen: "https://placehold.co/400",
            descripcion: ""
        });

        const [quantity, setQuantity] = React.useState(1);

        const [recommendedProducts, setRecommendedProducts] = React.useState([
            {product_id: 0, nombre: "", precio: 0, imagen: "https://placehold.co/800", descripcion: ""},
            {product_id: 0, nombre: "", precio: 0, imagen: "https://placehold.co/800", descripcion: ""},
            {product_id: 0, nombre: "", precio: 0, imagen: "https://placehold.co/800", descripcion: ""},
        ]);

        useEffect(() => {

            fetch(`http://34.16.176.103:8080/product?id=${id}`).then((response) => {
                return response.json();
            }).then((data) => {
                if(data != null || data != undefined) {
                    setProduct(data);
                }
            });

            fetch(`http://34.16.176.103:8080/all-products`).then((response) => {
                return response.json();
            }).then((data) => {
                if(data != null || data != undefined || data.length > 0) {
                    let listado = [...data];
                    let shuffled = listado
                        .map(value => ({ value, sort: Math.random() }))
                        .sort((a, b) => a.sort - b.sort)
                        .map(({ value }) => value)
                        .filter((product) => product.product_id != id)
                        .slice(0, 3);

                    setRecommendedProducts(shuffled)
                }
            });

        }, []);

        useEffect(() => {
            if(currentId == id) return;

            setQuantity(1);

            fetch(`http://34.16.176.103:8080/product?id=${currentId}`).then((response) => {
                return response.json();
            }).then((data) => {
                if(data != null || data != undefined) {
                    setProduct(data);
                }
            });

            fetch(`http://34.16.176.103:8080/all-products`).then((response) => {
                return response.json();
            }).then((data) => {
                if(data != null || data != undefined || data.length > 0) {
                    let listado = [...data];
                    let shuffled = listado
                        .map(value => ({ value, sort: Math.random() }))
                        .sort((a, b) => a.sort - b.sort)
                        .map(({ value }) => value)
                        .filter((product) => product.product_id != id)
                        .slice(0, 3);

                    setRecommendedProducts(shuffled)
                }
            });

            scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
        }, [currentId]);


        const handleClick = (new_id) => {
            setCurrentId(new_id);
        }

        const handleAddToCart = () => {
            
        try{
                getData("cart").then((data) => {
                    if(data == null) {
                        storeData("cart", [{id: product.product_id, quantity: quantity}]);
                    } else {
                        let index = data.findIndex((item) => item.id == product.id);
                        if(index == -1) {
                            data.push({id: product.product_id, quantity: Number(quantity)});
                        } else {
                            data[index].quantity += Number(quantity);
                        }
                        storeData("cart", data);
                    }

                    Alert.alert(
                        "Se ha agregado el producto al carrito:" ,
                        product.nombre + " x" + quantity,
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );

                });
            } catch (error) {
                Alert.alert(
                    "Error al agregar al carrito:" ,
                    error,
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        }

        return (
            <View style={styles.container}>
                <View style={styles.product_container_2}>
                    <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
                        <Image source={{uri: product.imagen}} style={styles.image_product} />

                        <View style={styles.product_data}>

                            <Text style={{fontSize: 28, fontWeight: "bold"}}>{product.nombre}</Text>
                            <Text style={{fontSize: 24, fontWeight: "bold", color: "green", paddingBottom: 10}}>GTQ {product.precio}</Text>

                            <Text style={{fontSize: 16, fontWeight: "bold", paddingBottom: 10 }}>Existencias: {product.existencia}</Text>

                            <Text style={{fontSize: 16, fontWeight: "bold"}}>Descripción:</Text>
                            <Text style={{fontSize: 16, paddingBottom: 10}}>{product.descripcion}</Text>

                            <View style={styles.quantity_container} >

                                <Icon
                                    name="minus"
                                    size={20}
                                    color="black"
                                    onPress={() => quantity > 1 ? setQuantity(quantity - 1) : null}
                                />

                                <TextInput
                                    style={{
                                        width: 50,
                                        height: 50,
                                        textAlign: "center",
                                        fontSize: 20,
                                        color: "black",
                                        marginHorizontal: 10,
                                    }}
                                    keyboardType="number-pad"
                                    value={quantity.toString()}
                                    onChangeText={(text) => {
                                        if(text == "") {
                                            setQuantity(1);
                                        } else {
                                            if(Number(text) <= 0) {
                                                setQuantity(1)
                                            } else if (Number(text) > product.existencia) {
                                                setQuantity(product.existencia)
                                            } else {
                                                setQuantity(Number(text))
                                            }
                                        }
                                    }}
                                />

                                <Icon
                                    name="plus"
                                    size={20}
                                    color="black"
                                    onPress={() => quantity < product.existencia ? setQuantity(quantity + 1) : null}
                                />

                            </View>

                            <View style={styles.order_container}>
                                <Button 
                                    title="Agregar al carrito" 
                                    color={"#228B22"}
                                    onPress={handleAddToCart} />
                            </View>


                        </View>

                        <View style={styles.product_data}>

                            <Text style={{fontSize: 24, fontWeight: "bold", paddingBottom: 20}}>Productos relacionados</Text>

                        {
                                recommendedProducts.map((product, index) => {
                                    return (
                                        index < 3 ? 
                                        <>
                                            <ProductCard
                                                key={index}
                                                id={product.product_id}
                                                name={product.nombre}
                                                price={product.precio}
                                                image={product.imagen}
                                                description={product.descripcion}
                                                onSelect={handleClick}
                                            /> 
                                            <View key={index + "-line"} style={styles.line} />
                                        </>
                                        : null
                                    )
                                        
                                    
                                })
                        }
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
    