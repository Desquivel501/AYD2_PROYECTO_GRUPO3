import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useAddUser } from "../../api/usersApi";

export default function RegisterView() {
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Cpassword, setCPassword] = useState("");
    const [dpi, setDpi] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [showverification, setShowVerification] = useState(false);
    const { mutate: mutAddUser } = useAddUser();

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
    };

    return (
        <div>RegisterView</div>
    )
}
