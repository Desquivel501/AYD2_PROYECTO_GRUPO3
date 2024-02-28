import React, { useEffect } from 'react'
//import GeneralLayout from '../../layouts/GeneralLayout/GeneralLayout'
import bk from '../../media/images/bk_2.png'
import { Col, Container, Row } from 'react-bootstrap'
import '../LandingView/LandingView.scss'
//import Signin from '../../components/RegistroForm/Signin'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useUserPermission } from '../../utilities/Security/Permission'
import Login from '../../components/Login/Login'
import logo from '../../assets/market_logo_white.png';
//import logo from "../../media/images/logo.png";

export default function LoginView() {
    const navigate = useNavigate();
    const useGetFetchQuery = (name) => {
        const queryClient = useQueryClient();
        return queryClient.getQueryData(name);
    };

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
                        <div className='landing-title'>¡Encuentra todo lo que buscas!</div>
                    </Col>
                    <Col md={12} lg={5} className='landing-col'>
                        <Login />
                    </Col>
                </Row>
            </Container>
        </div>
        //</GeneralLayout>
    )
}
