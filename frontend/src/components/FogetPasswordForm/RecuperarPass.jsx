import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../../styles/views/Login.scss";
import bk from '../../media/images/bk_2.png'
import { Col, Container, Row } from 'react-bootstrap'

import "./recovery.scss"

import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useUserPermission } from '../../utilities/Security/Permission'
import logo from '../../assets/market_logo_white.png';
import { postData } from "../../api/api";

import Swal from 'sweetalert2'

export default function RecuperarPass() {

    const navigate = useNavigate();
    const useGetFetchQuery = (name) => {
        const queryClient = useQueryClient();
        return queryClient.getQueryData(name);
    };

    const [email, setEmail] = useState("");

    const handleSubmit = async () => {

      console.log("here");

      postData({endpoint: "user/generate-code", body: {email: email}}).then((response) => {

        console.log(response);

        if(response.TYPE === "SUCCESS"){
          Swal.fire({
            title: 'Codigo enviado',
            text: 'Se ha enviado un codigo a tu correo',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              // navigate("/forget-password/verify-code");
              localStorage.setItem('email', email);
              navigate("/verificar-codigo");
  
            }
          });
          
        } else {
          Swal.fire({
            title: 'Error',
            text: response.MESSAGE,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      })

    }
  

    //const dataU = useGetFetchQuery('user');
    //useUserPermission(0, true);
    return (
        //<GeneralLayout navtype='landingpage'>
        <div className='landing-main' style={{ background: `url(${bk})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }} >
            <Container className='landing-container'>
                <Row className='landing-row'>
                    <Col md={12} lg={7} className='landing-col'>
                        <div className='landing-logo'>
                            <img src={logo} alt="logo" />
                        </div>
                    </Col>
                    <Col md={12} lg={5} className='landing-col'>
                        

                    <div className="Login">
                        <h3> Recuperar contraseña</h3>
                    
                        <Form.Group size="lg" controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            autoFocus
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Form.Group>
                      
                        <div className="btns">
                          <Button className="SubmitBtn" block="true" size="lg" type="submit"
                            onClick={handleSubmit}
                          >
                            Enviar codigo
                          </Button>
                        </div>

                    </div>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}
