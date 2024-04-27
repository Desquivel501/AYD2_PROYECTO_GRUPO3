import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, ImageBackground, Dimensions, Image } from 'react-native';
import { useAddUser } from "../../api/usersApi";
import { FAB } from "react-native-paper";
import { launchImageLibrary } from 'react-native-image-picker';

const win = Dimensions.get('window');
const ratio = win.width / 1661;

export default function RegisterView({ navigation }) {
    const { navigate } = navigation;
    const [showError, setShowError] = useState(false);
    const [showCorrect, setShowCorrect] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Cpassword, setCPassword] = useState("");
    const [dpi, setDpi] = useState("");
    const [file, setFile] = useState(null);
    const [verificationCode, setVerificationCode] = useState("");
    const [showverification, setShowVerification] = useState(false);
    const { mutate: mutAddUser, data, isLoading, isError, error } = useAddUser();


    function validateForm() {
        return email.length > 0 && password.length > 0 && name.length > 0 && Cpassword.length > 0 && dpi.length > 0;
    }

    useEffect(() => {
        if (data) {
            console.log(data);
            if (data.data.TYPE === "SUCCESS") {
                setShowError(false);
                setShowCorrect(true);
                setMessage(data.data.MESSAGE);
                //setShowVerification(true);
                //navigate("/")
            } else {
                setShowError(true);
            }
        }
    }, [data])

    useEffect(() => {
        if (isError) {
            setShowError(true);
            setMessage(error.message);
        }
    }, [isError])

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        console.log(file.type);
        // Verificar si el archivo es un PDF
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
            /* convertToBase64(file)
              .then((base64) => {
                // Aquí tienes el archivo PDF convertido a base64
                setFile({
                  "filename": file.name,
                  "content_type": file.type,
                  "file": base64
                });
              })
              .catch((error) => {
                console.error('Error al convertir el archivo a base64:', error);
              }); */
            setFile(file);

        } else {
            console.error('Por favor, selecciona un archivo de tipo imagen.');
        }
    };

    const handleSubmit = async () => {
        //event.preventDefault();
        setShowCorrect(false);
        setShowError(false);

        //try {
        /* const imageUrl = await uploadImage();
        console.log(imageUrl); */

        if (password !== Cpassword) {
            setShowError(true);
            setMessage("Las contraseñas no coinciden");
        } else {
            // Aquí se hará la petición al backend
            const info = {
                name: name,
                email: email,
                dpi: parseInt(dpi),
                password: password,
                image: 'https://www.w3schools.com/howto/img_avatar.png',
                type: "usuario",
            };
            //console.log(info);
            mutAddUser(info)
        }
        /* } catch (error) {
            console.error("Error al subir la imagen:", error);
            //setShowError(true);
            if (data.data.TYPE === "ERROR") {
                setShowError(true);
                setMessage(data.data.MESSAGE);
            }
            //setMessage(error);
            // Manejar el error según sea necesario
        } */
    }

    useEffect(() => {
        if (data) {
            /* console.log("DATAAAAA \n")
            console.log(data) */
            if (data.data.TYPE === "ERROR") {
                setShowError(true);
                setMessage(data.data.MESSAGE);
            } else {
                setShowCorrect(true);
                setShowError(false);
                setMessage(data.data.MESSAGE);
            }
        }
    }, [data])

    const changeImage = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                includeBase64: false,
            });
            if (result.assets[0].uri) {

                const url = await AWSHelper.uploadFile(result.assets[0].uri);

                if (url != "") {
                    setFile(url);
                }

            }
        } catch (error) {
            console.log(error);
        }
    }
    /* const handleSubmit = async () => {
        setShowError(false);
        const info = {
            name: name,
            email: email,
            dpi: parseInt(dpi),
            password: password,
            // No se maneja la carga de archivos en este ejemplo de React Native
        };

        if (password !== Cpassword) {
            setShowError(true);
            setMessage("Las contraseñas no coinciden");
        } else {
            try {
                await mutAddUser(info);
                // Aquí podrías navegar a otra pantalla si el registro fue exitoso
            } catch (error) {
                setShowError(true);
                setMessage("Error al registrar usuario");
                console.error("Error al registrar usuario:", error);
            }
        }
    }; */

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../assets/bk_2.png')} style={styles.background}>
                <Image source={require('../../assets/market_logo_white_outline.png')} style={styles.logo} />
                <TextInput
                    autoFocus
                    placeholder="Nombre completo"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <TextInput
                    placeholder="DPI"
                    keyboardType="numeric"
                    value={dpi}
                    onChangeText={setDpi}
                    style={styles.input}
                />
                {/* TODO: Ver que funcione la foto de perfil del usuaior */}
                {/* <Text style={{ color: "#fff", marginTop: 20 }}>Subir imagen</Text>
                <Image source={{ uri: file }} style={styles.image_product} />
                <FAB
                    icon="tray-arrow-up"
                    style={{
                        
                        margin: 16,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#fff',
                    }}
                    onPress={changeImage}
                /> */}

                <TextInput
                    placeholder="Contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Confirmar contraseña"
                    secureTextEntry
                    value={Cpassword}
                    onChangeText={setCPassword}
                    style={styles.input}
                />
                <View style={styles.button_login}>
                    <Button
                        title="Registrate"
                        onPress={handleSubmit}
                        disabled={isLoading || !validateForm()}
                    />
                </View>
                {showError && <Text style={styles.error}>{message}</Text>}
                {showCorrect && <Text style={styles.correct}>{message}</Text>}
                <View>
                    <Text style={{ color: "#fff", marginTop: 20 }}>¿Ya tienes una cuenta?
                        <Text style={{ color: "#fff", fontWeight: "bold" }} onPress={() => navigate("Login")}>  Inicia Sesion</Text>
                    </Text>
                </View>
                <View>
                    <Text style={{ color: "#fff", fontWeight: "bold", marginTop:16 }} onPress={() => navigate("RegisterVendedor")}> Registrate como vendedor</Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
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
    logo: {
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
    },
    correct: {
        backgroundColor: "#FF5050",
        color: "#fff",
        textAlign: "center",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    }
});
