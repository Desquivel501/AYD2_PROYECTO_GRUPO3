import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import "../../../styles/views/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../../components/Error";
import Correct from "../../../components/Correct";
import { useAddUser } from "../../../api/usersApi";

export default function SigninAdministrador(props) {
    const { stylee } = props;
    const [showError, setShowError] = useState(false);
    const [showCorrect, setShowCorrect] = useState(false);
    const typeUser = "turist";
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Cpassword, setCPassword] = useState("");
  
    function validateForm() {
      return email.length > 0 && password.length > 0 && name.length > 0 && lastName.length > 0 && phoneNumber.length > 0 ;
    }
  
    const { mutate: mutAddUser, data, isLoading, isError, error } = useAddUser();
  
    useEffect(() => {
      if (data) {
        //console.log(data?.data);
        if (data.data.status === 1) {
          setShowError(false);
          setShowCorrect(true);
          //navigate("/")
        } else {
          setShowError(true);
        }
      }
    }, [data])
  
  
    function handleSubmit(event) {
      event.preventDefault();
      setShowCorrect(false);
      setShowError(false);
      /* if(password !== Cpassword){
        setShowError(true);
      } else{ */
      //Aqui se hara la petición al backend
      const info = {
        "nombre": name,
        "apellidos": lastName,
        "correo": email,
        "password": password,
        "celular": phoneNumber,
      }
      //console.log(info);
      mutAddUser(info)
      //}
    }
  
    return (
      <div className="Signin" style={{ backgroundColor: (stylee ? ('white') : ''), color: (stylee ? ('black') : 'white'), }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="nameAdmin" >
            <Form.Label>Nombre(s)</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="lastNameAdmin" className="option">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
          <Form.Group size="lg" controlId="emailAdmin" className="option">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="phoneAdmin" className="option">
            <Form.Label>Numero de telefono</Form.Label>
            <Form.Control
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="passwordAdmin" className="option">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {/* <Form.Group size="lg" controlId="Cpassword" className="password">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                value={Cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </Form.Group> */}
          <div className="btns">
            <Button className="SubmitBtn" block="true" size="lg" type="submit" disabled={!validateForm()}>
              Registrarse
            </Button>
            <div className="signin">
              ¿Ya tienes cuenta? <Link to="/log-in" className="link-to-inicio-sesion">Inicia Sesion</Link>
            </div>
            <Error msg={data?.data?.message} showw={showError} />
            <Correct msg={data?.data?.message} showw={showCorrect} />
          </div>
        </Form>
      </div>
    );
  }
  