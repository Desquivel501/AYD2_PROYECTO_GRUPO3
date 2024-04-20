import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ImageBackground, Image, Dimensions, ScrollView, Alert } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Searchbar } from 'react-native-paper';
// import { ProductCard } from "../../components/ProductCard/ProductCard";
import { ProductCard2 } from "../../components/ProductCard/ProductCard2";

import { storeData, getData } from "../../utils/Storage";
import { mock_products } from "../../assets/mock_data";

import RNPickerSelect from 'react-native-picker-select';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const win = Dimensions.get('window');
const ratio = win.width/1661;

export default function CarritoView({ navigation }) {

    const [total, setTotal] = React.useState(0);
    const [productos, setProductos] = React.useState([]);
    const [paymentMethods, setPaymentMethods] = React.useState([]);
    const [currentPaymentMethod, setCurrentPaymentMethod] = React.useState(-1);
    const [newPaymentMethod, setNewPaymentMethod ] = React.useState(true);

    const [paymentMethod, setPaymentMethod] = React.useState({
        alias: "",
        number: 0,
        name: "",
        expiration: "",
        cvv: 0
    });

    const [allowPayment, setAllowPayment] = React.useState(false);

    useFocusEffect(
        React.useCallback(() => {
            getData("cart").then((data) => {
                if(data == null || data == undefined || data.length == 0) {
                    setProductos([]);
                    storeData("cart", []);
                    return;
                }
                if(data != null) {

                    fetch("http://34.16.176.103:8080/all-products").then((response) => {
                        return response.json();
                    }).then((productos) => {
                        listado = []
                        if(productos != null || productos != undefined || productos.length > 0) {
                            for (let i = 0; i < data.length; i++) {

                                let product = productos.find((product) => product.product_id == data[i].id);
                                product.cantidad = data[i].quantity;
                                listado.push(product);
                            }
                        }
                        setProductos(listado);
                        setTotal(getTotal(listado));
                    });
                }
            });

            fetch(`http://34.16.176.103:8080/user/get-payment-methods?dpi=53681241`).then((response) => {
                return response.json();
            }).then((data) => {
                // console.log(data);
                setPaymentMethods(data);
            });

        }, [])
    );

    function getTotal(listado){
        let total = 0;

        if (listado.length == 0) {
            return 0;
        }

        for (let i = 0; i < listado.length; i++) {
            total += listado[i].precio * listado[i].cantidad;
        }
        return total;
    }

    const changeCarrito = (id, quantity) => {

        if(quantity <= 0) {
            getData("cart").then((data) => {
                let listado = [...productos];
                let product = listado.find((product) => product.product_id == id);
                let index = listado.indexOf(product);
                listado.splice(index, 1);
                setProductos(listado);
                setTotal(getTotal());
                storeData("cart", listado);
            });
        }

        let listado = [...productos];
        let product = listado.find((product) => product.product_id == id);
        product.cantidad = quantity;
        setProductos(listado);
        setTotal(getTotal(listado));

        getData("cart").then((data) => {
            let listado = [...data];
            let product = listado.find((product) => product.id == id);
            product.quantity = quantity;
            storeData("cart", listado);
        });
    };

    async function handleBuyNewMethod(){

        console.log("here");

        if(paymentMethod.number == 0 || paymentMethod.name == "" || paymentMethod.expiration == "" || paymentMethod.cvv == 0) {
            alert("Debe llenar todos los campos");
            return;
        }

        let body = {
            dpi: 53681241,
            alias: paymentMethod.alias,
            number: Number(paymentMethod.number),
            cardholder: paymentMethod.name,
            exp: paymentMethod.expiration,
            cvv: Number(paymentMethod.cvv)
        };

        await fetch(`http://34.16.176.103:8080/user/add-payment-method`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json();
        }).then((data) => {

            if(data.TYPE == "SUCCESS"){
                fetch(`http://34.16.176.103:8080/user/get-payment-methods?dpi=53681241`).then((response) => {
                    return response.json();
                }).then((data2) => {
                    // console.log(data);
                    // setPaymentMethods(data);
                    data2.forEach((method) => {
                        if(method.alias == paymentMethod.alias) {   
                            let body = {
                                client_id: 53681241,
                                productos: productos,
                                payment_id: method.id,
                                total: total
                            };

                            fetch(`http://34.16.176.103:8080/user/purchase`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(body)
                            }).then((response) => {
                                return response.json();
                            }).then((data3) => {
                                // alert(data3.MESSAGE);
                                Alert.alert(
                                    "Compra",
                                    data3.MESSAGE,
                                    [
                                        {
                                            text: "OK",
                                            onPress: () => {
                                                cleanUp();
                                            }
                                        }
                                    ]
                                );
                            });
                            cleanUp();
                            return
                        }
                    });
                });
            } else {
                setCurrentPaymentMethod(-1);
                alert("Error al agregar metodo de pago");
            }
        });
    }

    async function handlebuy () {

        if (currentPaymentMethod <= 0) {
            alert("Debe seleccionar un metodo de pago");
            return;
        }

        let body = {
            client_id: 53681241,
            productos: productos,
            payment_id: currentPaymentMethod,
            total: total
        };

        fetch(`http://34.16.176.103:8080/user/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            // alert(data.MESSAGE);
            Alert.alert(
                "Compra",
                data.MESSAGE,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            cleanUp();
                        }
                    }
                ]
            );
            
        });
    }

    function cleanUp(){
        setAllowPayment(false);
        setNewPaymentMethod(false);
        setPaymentMethod({
            alias: "",
            number: 0,
            name: "",
            expiration: "",
            cvv: 0
        });
        storeData("cart", []);
        setProductos([]);
        setTotal(0);
        navigation.navigate("Catalogo");
    }


    return (
        <View style={styles.container_carrito}>

            <Text style={styles.title_carrito}>Carrito</Text>

            <View style={styles.container_products}>
                <ScrollView showsVerticalScrollIndicator={false}>

                   {
                    productos.length > 0 ?
                    <>
                        <Text style={{fontSize: 25, fontWeight: "bold", marginBottom: 10}}>Productos</Text>
                        {
                            productos.map((product, index) => {
                                return (
                                <ProductCard2
                                        key={index}
                                        id={product.product_id}
                                        name={product.nombre}
                                        price={product.precio}
                                        image={product.imagen}
                                        quantity={product.cantidad}
                                        existingQuantity={product.existencia}
                                        onChange={changeCarrito}
                                    />
                                )
                            })
                        }

                        <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 10, alignSelf: "flex-end"}}>Sub-Total: GTQ {total}</Text>

                        <Text style={{fontSize: 25, fontWeight: "bold", marginBottom: 10}}>Forma de Pago</Text> 

                        {
                            !newPaymentMethod ? 
                            <>
                                <View style={{
                                    marginBottom: 10,
                                    borderRadius: 10
                                }}>
                                    <RNPickerSelect
                                        onValueChange={(value) => {
                                            setCurrentPaymentMethod(value);
                                            setAllowPayment(true);
                                        }}
                                        items={
                                            paymentMethods.map((method) => {
                                                return {
                                                    label: method.alias + " (**" + String(method.number).slice(-2) + ")",
                                                    value: method.id
                                                }
                                            })
                                        }
                                        style={{
                                            borderColor: "#000",
                                            marginBottom: 10,
                                        }}
                                    />
                                </View>
                                <View style={styles.button_new}>
                                    <Button title="Agregar metodo de pago" onPress={() => setNewPaymentMethod(true)} />
                                </View>
                                
                                
                            </>
                            :
                            <>
                                <View style={{
                                    borderRadius: 12,
                                    borderColor: "#000",
                                    borderWidth: 1,
                                    padding: 10,
                                    marginBottom: 60
                                }}>
                                    <TextInput placeholder="Alias" style={styles.search}
                                        value={paymentMethod.alias} 
                                        onChangeText={(text) => setPaymentMethod({...paymentMethod, alias: text.toString()})}
                                    />
                                    <TextInput placeholder="Numero de tarjeta" style={styles.search} keyboardType="number-pad" 
                                        value={paymentMethod.number} 
                                        onChangeText={(text) => setPaymentMethod({...paymentMethod, number: text})}
                                    />
                                    <TextInput placeholder="Nombre en la tarjeta" style={styles.search} 
                                        value={paymentMethod.name} 
                                        onChangeText={(text) => setPaymentMethod({...paymentMethod, name: text})}
                                    />
                                    <TextInput placeholder="Fecha de expiracion" style={styles.search} 
                                        value={paymentMethod.expiration} 
                                        onChangeText={(text) => setPaymentMethod({...paymentMethod, expiration: text})}
                                    />
                                    <TextInput placeholder="CVV" style={styles.search} keyboardType="number-pad"
                                        value={paymentMethod.cvv}
                                        onChangeText={(text) => setPaymentMethod({...paymentMethod, cvv: text})}
                                    />
                                    <View style={{ marginBottom: 10 }}>
                                        <Button title="Cancelar" color={"#ff0000"} onPress={() => setNewPaymentMethod(false)} />
                                    </View>
                                
                                </View>

                                
                            </>
                        }
                    </>
                    :
                    <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 10, alignSelf:"center", marginTop: 10}}>No se han agregado productos al carrito</Text>

                   }

                         
                </ScrollView>
            </View>

            
                
            

            <View style={styles.button_ordenar}>
                {/* {
                    newPaymentMethod ?  
                    <Button 
                        title="Pagar" 
                        color={"#228B22"}
                        onPress={handleBuyNewMethod} />
                    :
                    <Button 
                        title="Pagar" 
                        color={"#228B22"}
                        onPress={handlebuy} />
                } */}
                <Button 
                        title="Pagar" 
                        color={"#228B22"}
                        onPress={newPaymentMethod ? handleBuyNewMethod : handlebuy} />
                
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
    button_new: {
        alignSelf: "center",
        width: "90%",
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
  