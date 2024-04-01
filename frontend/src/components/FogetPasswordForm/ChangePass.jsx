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

export default function ChangePass() {
    const navigate = useNavigate();
    const useGetFetchQuery = (name) => {
        const queryClient = useQueryClient();
        return queryClient.getQueryData(name);
    };

    // const [email, setEmail] = useState("");

    const [password, setPassword] = useState();

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
  
        postData({endpoint: "user/change-password", body: {email: email, password: password}}).then((response) => {
  
          console.log(response);
  
          if(response.TYPE === "SUCCESS"){
            Swal.fire({
              title: 'Contraseña cambiada',
              text: response.MESSAGE,
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.removeItem('email');
                navigate("/log-in");
    
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
                        <h3> Ingrese su nueva contraseña</h3>
                    
                        <Form.Group size="lg" controlId="email">
                          <Form.Label>Contraseña</Form.Label>
                          <Form.Control
                            autoFocus
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Group>
                      
                        <div className="btns">
                          <Button className="SubmitBtn" block="true" size="lg" type="submit"
                            onClick={handleSubmit}
                          >
                            Cambiar
                          </Button>
                        </div>

                    </div>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}
