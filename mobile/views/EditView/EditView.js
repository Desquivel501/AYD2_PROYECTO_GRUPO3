import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ImageBackground, Image, Dimensions, ScrollView, Alert } from 'react-native';
import { FAB } from 'react-native-paper';
import { TextInput as PaperTextInput } from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import AWSHelper from "../../utils/AWSHelper";
import { storeData, getData } from "../../utils/Storage";

const win = Dimensions.get('window');
const ratio = win.width/1661;

export default function EditView({ route, navigation }) {

    const { id, crear } = route.params;
    const scrollRef = useRef();

    const [product, setProduct] = React.useState({
        product_id: 0,
        nombre: "",
        precio: 0,
        existencia: 0,
        imagen: "https://placehold.co/400",
        descripcion: "",
        categoria: ""
    });

    const [count , setCount] = React.useState(1);

    useEffect(() => {

        if(crear) return;

        fetch(`http://34.16.176.103:8080/product?id=${id}`).then((response) => {
            return response.json();
        }).then((data) => {
            if(data != null || data != undefined) {
                setProduct(data);
            }
        });

    }, []);

    const changeImage = async() => {
       try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                includeBase64: false,
            });
            if(result.assets[0].uri) {

                const url = await AWSHelper.uploadFile(result.assets[0].uri);

                if(url != "") {
                    setProduct({...product, imagen: url});
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateProduct = async () => {
        await fetch(`http://34.16.176.103:8080/edit-product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            // console.log(data);
            if(data != null || data != undefined) {
                if(data.type == "SUCCESS"){
                    Alert.alert("Producto actualizado", "El producto ha sido actualizado correctamente",[
                        {
                            text: "Aceptar",
                            onPress: () => navigation.goBack()
                        }
                    ]);
                } else {
                    Alert.alert("Error al actualizar", data.message);
                }
            } else {
                Alert.alert("Error al actualizar", "No se pudo actualizar el producto");
            }
        }).catch((er) => console.log(er));
    }
    

    const crearProducto = async () => {

        getData("user").then((user) => {
            let body = {
                ...product,
                vendedor: String(user.id)
            } 

            console.log(body);
    
            fetch(`http://34.16.176.103:8080/create-product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then((response) => {
                return response.json();
            }).then((data) => {
                // console.log(data);
                if(data != null || data != undefined) {
                    if(data.type == "SUCCESS"){
                        Alert.alert("Producto creado", "El producto ha sido creado correctamente", [
                            {
                                text: "Aceptar",
                                onPress: () => navigation.goBack()
                            }
                        ]);
                    } else {
                        Alert.alert("Error al actualizar", data.message);
                    }
                } else {
                    Alert.alert("Error al actualizar", "No se pudo crear el producto");
                }
            }).catch((er) => console.log(er));
        });
    }

    const eliminarProducto = async () => {

        

        await fetch(`http://34.16.176.103:8080/delete-product?id=${id}`).then((response) => {
            return response.json();
        }).then((data) => {
            // console.log(data);
            if(data != null || data != undefined) {
                if(data.type == "SUCCESS"){
                    Alert.alert("Producto eliminado", "El producto ha sido eliminado correctamente", [
                        {
                            text: "Aceptar",
                            onPress: () => navigation.goBack()
                        }
                    ]);
                } else {
                    Alert.alert("Error al eliminar", data.message);
                }
            } else {
                Alert.alert("Error al eliminar", "No se pudo eliminar el producto");
            }
        }).catch((er) => console.log(er));
    }

    return (
        <View style={styles.container}>
            <View style={styles.product_container_2}>
                <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>

                    <View>
                        <Image source={{uri: product.imagen}} style={styles.image_product} />
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
                            value={product.nombre}
                            onChangeText={text => setProduct({...product, nombre: text})}
                            style={{width: "100%", fontSize: 28, fontWeight: "bold", marginBottom: 10}}
                        />

                        <PaperTextInput
                            label="Precio (GTQ)"
                            mode="outlined"
                            value={product.precio.toString()}
                            onChangeText={text => setProduct({...product, precio: Number(text)})}
                            style={{width: "100%", fontSize: 24, fontWeight: "bold", color: "green", marginBottom: 10}}
                            keyboardType="number-pad"
                        />

                        <PaperTextInput
                            label="Existencias"
                            mode="outlined"
                            value={product.existencia.toString()}
                            onChangeText={text => setProduct({...product, existencia: Number(text)})}
                            style={{width: "100%", fontSize: 18, fontWeight: "bold", marginBottom: 10}}
                            keyboardType="number-pad"
                        />

                        <PaperTextInput
                            label="Categoria"
                            mode="outlined"
                            value={product.categoria}
                            onChangeText={text => setProduct({...product, categoria: text})}
                            style={{width: "100%", fontSize: 18, marginBottom: 10}}
                        />

                        <PaperTextInput
                            label="Descripción"
                            mode="outlined"
                            value={product.descripcion}
                            onChangeText={text => setProduct({...product, descripcion: text})}
                            style={{width: "100%", fontSize: 18, marginBottom: 10}}
                            multiline={true}

                        />

                        {
                            crear ?
                            null
                            :
                            <View style={styles.order_container}>
                                <Button 
                                    title="Eliminar Producto" 
                                    color={"#ff0000"}
                                    onPress={() => Alert.alert("Eliminar producto", "¿Está seguro que desea eliminar el producto?", [
                                        {
                                            text: "Cancelar",
                                            onPress: () => {}
                                        },
                                        {
                                            text: "Aceptar",
                                            onPress: () => eliminarProducto()
                                        }
                                    ])} />
                            </View>
                        }

                        <View style={styles.order_container}>
                            <Button 
                                title="Guardar Cambios" 
                                color={"#228B22"}
                                onPress={crear ? crearProducto : updateProduct} />
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
      },
});
  