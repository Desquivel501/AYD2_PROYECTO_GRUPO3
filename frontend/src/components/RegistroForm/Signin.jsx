import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import Navbar from 'react-bootstrap/Navbar';
//import Container from 'react-bootstrap/Container';
import "../../styles/views/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../components/Error";
import Correct from "../../components/Correct";
import { useAddUser, useVerifyCode } from "../../api/usersApi";
import { SubirImagen } from "../../api/api";
//import Webcam from "react-webcam";
//import htmlToImage from 'html-to-image';
//import { toPng } from 'html-to-image';
//import { BsBoxArrowDown, BsCameraFill, BsX } from "react-icons/bs";

export default function Signin(props) {
  const { stylee } = props;
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");
  const [showCorrect, setShowCorrect] = useState(false);
  const [showErrorV, setShowErrorV] = useState(false);
  const [showCorrectV, setShowCorrectV] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dpi, setDpi] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [datebirth, setDatebirth] = useState("");
  const [file, setFile] = useState({});
  const [usingWebcam, setUsingWebcam] = useState(false);
  const [showverification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

  function validateForm() {
    return email.length > 0 && password.length > 0 && name.length > 0 && Cpassword.length > 0 && dpi.length > 0;
  }

  const { mutate: mutAddUser, data, isLoading, isError, error } = useAddUser();
  const { mutate: mutVerifyCode, data: dataV, isLoading: isLoadingV, isError: isErrorV, error: errorV } = useVerifyCode();

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

  // Convertir archivo pdf a base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

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

  /* const webcamRef = useRef(null); // Referencia a la cámara web
  const [capturedImage, setCapturedImage] = useState(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };


  useEffect(() => {
    //image to base 64
    if (capturedImage) {
      setFile({
        filename: "webcam-screenshot.jpeg",
        content_type: "image/jpeg",
        file: capturedImage,
      });
    }
  }, [capturedImage]) */


  async function handleSubmit(event) {
  event.preventDefault();
  setShowCorrect(false);
  setShowError(false);

  const uploadImage = async () => {
    let url = "";
    if (file) {
      url = await SubirImagen(file);
    }
    return url;
  };

  try {
    const imageUrl = await uploadImage();
    console.log(imageUrl);

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
        image: imageUrl,
        type: "usuario",
      };
      //console.log(info);
      mutAddUser(info)
    }
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    setShowError(true);
    setMessage("Error al subir la imagen");
    // Manejar el error según sea necesario
  }
}

  function handleVerification(event) {
    event.preventDefault();
    setShowCorrect(false);
    setShowError(false);
    if (password !== Cpassword) {
      setShowError(true);
    } else {
      //Aqui se hara la petición al backend
      const info = {
        "email": email,
        "code": verificationCode,
      }
      mutVerifyCode(info)
    }
  }

  /* useEffect(() => {
    if (dataV) {
      console.log(dataV);
      if (dataV.statusCode === 400) {
        setShowErrorV(false);
        setShowCorrectV(true);
        setShowVerification(true);
        //navigate("/")
      } else {
        setShowError(true);
      }
    }
  }, [dataV]) */



  return (
    <div className="Signin" style={{ backgroundColor: (stylee ? ('white') : ''), color: (stylee ? ('black') : 'white'), }}>
      {/* <h3>¡Unete como repartidor!</h3> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="name" >
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        {/* <Form.Group size="lg" controlId="lastName" className="option">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group> */}
        <Form.Group size="lg" controlId="email" className="option">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="cv" className="option image-updater">
          <Form.Label>Foto de perfil</Form.Label>
          {/* <Button
            className="WebcamToggleBtn"
            variant="secondary"
            onClick={() => setUsingWebcam(!usingWebcam)}
          >
            {usingWebcam ? (
              <>
                <BsBoxArrowDown /> Imagen del sistema
              </>
            ) : (
              <>
                <BsCameraFill /> Usar webcam
              </>
            )}
          </Button>
          {usingWebcam ? (
            <div className='take-picture'>
              {capturedImage && (
                <div
                  className="close-btn">
                  <Button
                    onClick={() => setCapturedImage(null)}
                  >
                    <BsX />
                  </Button>
                </div>
              )}
              {!capturedImage && (
                <div className="web-cam">
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                  />
                </div>
              )}
              {capturedImage && (
                <div className="captured-image">
                  <img src={capturedImage} alt="Captured" />
                </div>
              )}
              <div
                className="take-picture-btn">

                <div className="btn-margin">
                  <Button
                    onClick={captureImage}
                    variant="secondary"
                    size="lg"
                  >
                  </Button>
                </div>
              </div>
            </div>
              ) : ( */}
          <Form.Control
            type="file"
            onChange={handleFileUpload}
            accept="image/png, image/jpeg, image/jpg"
          />
        </Form.Group>
        {/* <Form.Group size="lg" controlId="usuario">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group> */}
        <Form.Group size="lg" controlId="phone" className="option">
          <Form.Label>DPI</Form.Label>
          <Form.Control
            type="text"
            value={dpi}
            onChange={(e) => setDpi(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password" className="option">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="Cpassword" className="option">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            type="password"
            value={Cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
        </Form.Group>
        {/* <Form.Group size="lg" controlId="date-birth" className="password">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control
            type="date"
            value={datebirth}
            onChange={(e) => setDatebirth(e.target.value)}
          />
        </Form.Group> */}
        <div className="btns">
          <Button className="SubmitBtn" block="true" size="lg" type="submit" disabled={!validateForm()}>
            Registrarse
          </Button>
          <div className="signin">
            ¿Ya tienes cuenta? <Link to="/log-in" className="link-to-inicio-sesion">Inicia Sesion</Link>
          </div>
          <Error msg={message} showw={showError} />
          <Correct msg={message} showw={showCorrect} />
        </div>
      </Form>
      {/* <Button className="SubmitBtn" block="true" size="lg" onClick={() => { navigate('/register/repartidor') }}>
        Repartidor
      </Button> */}
      <Link to="/register/vendedor" className="link-to-inicio-sesion">Registrarse como vendedor</Link>
      {showverification && (
        <Form onSubmit={handleVerification}>
          <Form.Group size="lg" controlId="verification-code" >
            <Form.Label>Codigo de verificacion</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </Form.Group>
          <div className="btns">
            <Button className="SubmitBtn" block="true" size="lg" type="submit">
              Verificar
            </Button>
            <Error msg={"Codigo de verificacion vencido"} showw={showErrorV} />
            <Correct msg={"Correo verificado"} showw={showCorrectV} />
          </div>
        </Form>
      )}
    </div>
  );
}
