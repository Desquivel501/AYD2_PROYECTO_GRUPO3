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

export default function VerificarCodigo() {
    const navigate = useNavigate();
    const useGetFetchQuery = (name) => {
        const queryClient = useQueryClient();
        return queryClient.getQueryData(name);
    };

    // const [email, setEmail] = useState("");

    const [code, setCode] = useState();

    var censorWord = function (str) {
        return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
    }
     
     var censorEmail = function (email){
        var arr = email.split("@");
        return censorWord(arr[0]) + "@" + censorWord(arr[1]);
    }

    const censoredEmail = censorEmail(localStorage.getItem('email'));

    const handleSubmit = async () => {

        const email = localStorage.getItem('email');
  
        postData({endpoint: "user/validate-code", body: {email: email, code: Number(code)}}).then((response) => {
  
          console.log(response);
  
          if(response.TYPE === "SUCCESS"){
            Swal.fire({
              title: 'Validado',
              text: response.MESSAGE,
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/cambiar-contrasena");
    
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
                        <h3> Ingresa el codigo enviado a {censoredEmail}</h3>
                    
                        <Form.Group size="lg" controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            autoFocus
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                          />
                        </Form.Group>
                      
                        <div className="btns">
                          <Button className="SubmitBtn" block="true" size="lg" type="submit"
                            onClick={handleSubmit}
                          >
                            Verificar
                          </Button>
                        </div>

                    </div>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}
