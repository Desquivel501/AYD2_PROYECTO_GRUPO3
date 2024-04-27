import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ImageBackground, Image, Dimensions } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getData, storeData } from "../../utils/Storage";
import { useUserLogin } from "../../api/usersApi";
// const image = { uri: "../assets/bk.png"}

const win = Dimensions.get('window');
const ratio = win.width/1661;

export default function LoginView({ navigation }) {
    const { navigate } = navigation;
    const dataU =  getData("user");

    console.log(dataU);

    // const [message, setMessage] = React.useState('Useless Text');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState("");
    const { mutate: mutLogin, isLoading, isError, error,data } = useUserLogin();

    // useFocusEffect(() => {
    //     storeData("cart", []);
    // }, []);
    const handleSubmit = async () => {
        // Evitar que se dispare el evento de manera múltiple
        if (isLoading) return;

        // Validar campos de entrada
        if (!email || !password) {
            setShowError(true);
            setMessage("Por favor, complete todos los campos.");
            return;
        }

        // Realizar la lógica de inicio de sesión
        try {
            const info = {
                email,
                password
            };
            setShowError(false);
            await mutLogin(info);

            // Si el inicio de sesión fue exitoso, navegar a la siguiente pantalla
            //navigation.navigate('UserMenu');
        } catch (error) {
            setShowError(true);
            setMessage(error.message); // O cualquier otro mensaje de error que desees mostrar
        }
    };



    useEffect(() => {
        if (data) {
          if (data.data.TYPE === "ERROR") {
            setShowError(true);
            setMessage(data.data.MESSAGE);
          } else {
            //TODO: segun el numero de rol, redirigir a una pagina u otra
            setShowError(false);
    
    
             if (data.data.MESSAGE === '2') {
              navigate("SellerMenu");
            } else if (data.data.MESSAGE === "1") {
              navigate("UserMenu");
            }
            else if (data.data.MESSAGE === '0') {
              navigate("AdminMenu");
            }
            /* navigate("/home")
            else if (data.data.usuario.role === "turist") {
              navigate("/user");
            } else if (data.data.usuario.role === "recepcionist") {
              navigate("/recepcionist");
            } */
          }
        }
      }, [data])

    /* useFocusEffect(
        React.useCallback(() => {
            storeData("cart", []) 
        }, [])
    ); */

    return (
        <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../assets/bk_2.png')} style={styles.background}>
            <Image source={require('../../assets/market_logo_white_outline.png')} style={styles.logo}/>
            <TextInput
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                style={styles.input}
            />
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={styles.input}
            />
            <View style={styles.button_login}>
                <Button
                    title="Iniciar Sesión"
                    onPress={handleSubmit}
                    disabled={isLoading}
                />
            </View>
            {showError && <Text style={styles.error}>{message}</Text>}
            <View>
                <Text style={{color: "#fff", marginTop: 20}}>¿No tienes cuenta? 
                    <Text style={{color: "#fff", fontWeight: "bold"}} onPress={() => navigate("RegisterUser")}>  Regístrate</Text>
                </Text>
            </View>
        </ImageBackground>
    </SafeAreaView>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#228B22",
        alignItems: "center",
        justifyContent: "center",
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
    error: {
        backgroundColor: "#FF5050",
        color: "#fff",
        textAlign: "center",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    }
});
  