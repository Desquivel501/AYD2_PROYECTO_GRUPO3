import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ImageBackground, Image, Dimensions } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { storeData } from "../../utils/Storage";

// const image = { uri: "../assets/bk.png"}

const win = Dimensions.get('window');
const ratio = win.width/1661;

export default function LoginView({ navigation }) {

    // const [message, setMessage] = React.useState('Useless Text');
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    // useFocusEffect(() => {
    //     storeData("cart", []);
    // }, []);

    useFocusEffect(
        React.useCallback(() => {
            storeData("cart", []) 
        }, [])
    );

    const handleClick = () => {

        if(email == "Vendedor"){
            navigation.navigate('SellerMenu')
        }else if(email == "Admin"){
            navigation.navigate('AdminMenu')
        } else {
            navigation.navigate('UserMenu')
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <ImageBackground source={require('../../assets/bk_2.png')} style={  styles.background }>
            

            {/* <Text style={styles.title}>MarketUSAC</Text> */}

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
                keyboardType="visible-password"
                secureTextEntry
                style={styles.input}
                onSubmitEditing={() => alert("Welcome to GeeksforGeeks")}
            />

                <View style={styles.button_login}>
                <Button
                    title="Iniciar Sesión"
                    width="80%"
                    onPress={handleClick}
                />
                </View>

                <View>
                    <Text style={{color: "#fff", marginTop: 20}}>¿No tienes cuenta? 
                        <Text style={{color: "#fff", fontWeight: "bold"}} onPress={() => alert("Registro")}>  Regístrate</Text>
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
    }
});
  