import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
/* import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'; */
import "../../styles/views/Login.scss";
import { Link, useNavigate } from "react-router-dom";
//import GeneralLayout from "../../layouts/GeneralLayout/GeneralLayout";
import { useUserLogin } from "../../api/usersApi";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import Error from "../../components/Error";
//import food1 from "../../media/images/food1.jpg";
import { usePermissionNavigation } from "../../utilities/Security/Permission";
//import logo from "../../media/images/logo.png";
//import FullLogo from "../../media/images/full-logo.png";
//import { BsPersonBoundingBox } from "react-icons/bs";
const queryClient = new QueryClient();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const useGetFetchQuery = (name) => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData(name);
  };

  const { mutate: mutLogin, data, isLoading, isError, error } = useUserLogin();

  //usePermissionNavigation()

  /* useEffect(() => {
    if (data) {
      console.log(data)
      if (data.data.user.status === 1) {
        //TODO: segun el numero de rol, redirigir a una pagina u otra
        setShowError(false);


        if (data.data.rol === 4) {
          navigate("/user");
        } else if (data.data.rol === 2) {
          navigate("/empresa");
        } else if (data.data.rol === 3) {
          navigate("/repartidor");
        }
        else if (data.data.rol === 1) {
          navigate("/admin");
        }
        navigate("/home")
        else if (data.data.usuario.role === "turist") {
          navigate("/user");
        } else if (data.data.usuario.role === "recepcionist") {
          navigate("/recepcionist");
        }
      } else {
        setShowError(true);
      }
    }
  }, [data]) */

  function handleSubmit(event) {
    event.preventDefault();
    queryClient.invalidateQueries('user');
    setShowError(false);
    const info = {
      "email": email,
      "password": password,
    }
    mutLogin(info)
  }
  return (
    <div className="Login">
      {/* <div className="title">
              <img src={FullLogo} alt="" />
            </div> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password" className="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="btns">
          {/* <Button className="SubmitBtn" block="true" size="lg">
            <BsPersonBoundingBox/> Face ID
          </Button> */}
          <Button className="SubmitBtn" block="true" size="lg" type="submit" disabled={!validateForm()}>
            Log in
          </Button>
          <div className="signin">
            ¿No tienes cuenta? <Link to="/register" className="link-to-registro">Registrate</Link>
          </div>
          <div className="signin">
            <Link to="/forget-password" className="link-to-registro">Olvide mi contraseña</Link>
          </div>
          {
            isError && (
              <Error msg={error} showw={isError} />
            )
          }
          <Error msg={data?.data?.user?.message} showw={showError} />
        </div>
      </Form>
    </div>
  )
}
