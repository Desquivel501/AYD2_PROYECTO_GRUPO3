import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import "../../../styles/views/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../../components/Error";
import Correct from "../../../components/Correct";
import { useAddEmpresa, useAddUser } from "../../../api/usersApi";
import { DepartamentosyMunicipios } from "../../../utilities/options";

export default function SigninEmpresa(props) {
  const { stylee } = props;
  const [showError, setShowError] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [name, setName] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [zona, setZona] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && name.length > 0 && type.length > 0 && departamento.length > 0 && municipio.length > 0;
  }

  const { mutate: mutAddEmpresa, data, isLoading, isError, error } = useAddEmpresa();

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
  
    // Verificar si el archivo es un PDF
    if (file.type === 'application/pdf') {
      convertToBase64(file)
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
        });
    } else {
      console.error('Por favor, selecciona un archivo PDF.');
    }
  };

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
      "descripcion": descripcion,
      "correo": email,
      "password": password,
      "tipo": type,
      "departamento": departamento,
      "municipio": municipio,
      "file": file
    }
    //console.log(info);
    mutAddEmpresa(info);
    //}
  }


  return (
    <div className="Signin" style={{ backgroundColor: (stylee ? ('white') : ''), color: (stylee ? ('black') : 'white'), }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="nameEmp" >
          <Form.Label>Nombre de la empresa</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="descriptionEmp" >
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            as="textarea" 
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Form.Group>
        
        {/* <Form.Group size="lg" controlId="lastNameEmp" className="option">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group> */}
        {/* <Form.Group size="lg" controlId="usuario">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group> */}
        <Form.Group size="lg" controlId="emailEmp" className="option">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="passwordEmp" className="option">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {/* <Form.Group size="lg" controlId="havelicense" className="option">
          <Form.Check type="checkbox" label="Cuenta con licencia"
            value={haveLicense}
            onChange={e => {
              setHaveLicense(e.target.checked)
                (e.target.checked === false) && setTypeLicense("")
            }} />
        </Form.Group> */}
        <Form.Group size="lg" controlId="typelicense" className="option">
          <Form.Label>Tipo</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={type}
            onChange={(e) => setType(e.target.value)}>
            <option value="">Selecciona uno...</option>
            <option value="Restaurantes">Restaurantes</option>
            <option value="Tienda de conveniencia">Tienda de conveniencia</option>
            <option value="Supermercado">Supermercado</option>
          </Form.Select>
        </Form.Group>
        <Form.Group size="lg" controlId="depaEmp" className="option">
          <Form.Label>Departamento</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}>
            <option value="">Selecciona uno...</option>
            {
              DepartamentosyMunicipios.map((departamento, index) => {
                return (
                  <option key={index} value={departamento.title}>{departamento.title}</option>
                )
              })
            }
          </Form.Select>
        </Form.Group>
        {
          departamento && (
            <Form.Group size="lg" controlId="muni" className="option">
              <Form.Label>Municipio</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={municipio}
                onChange={(e) => setMunicipio(e.target.value)}>
                <option value="">Selecciona uno...</option>
                {
                  DepartamentosyMunicipios.find(depa => depa.title === departamento)?.mun.map((municipio, index) => {
                    return (
                      <option key={index} value={municipio}>{municipio}</option>
                    )
                  }
                  )
                }
              </Form.Select>
            </Form.Group>
          )}
        {/* 
        {
          municipio && (
            <Form.Group size="lg" controlId="zona" className="option">
              <Form.Label>Zona</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={zona}
                onChange={(e) => setZona(e.target.value)}
              />
            </Form.Group>
          )
        } */}
        <Form.Group size="lg" controlId="files" className="option">
          <Form.Label>Documento</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileUpload}
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
  )
}
