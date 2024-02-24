import React, { useEffect } from 'react'
//import GeneralLayout from '../../layouts/GeneralLayout/GeneralLayout'
import bk from '../../media/images/bk_2.png'
import { Col, Container, Row } from 'react-bootstrap'
import './LandingView.scss'
import Signin from '../../components/RegistroForm/Signin'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useUserPermission } from '../../utilities/Security/Permission'
/* import logo from "../../media/images/logo.png"; */
import logo from '../../assets/market_logo_white.png';
import { getLogUser } from '../../utilities/LogUser'

export default function LandingView() {
  const navigate = useNavigate();
  const useGetFetchQuery = (name) => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData(name);
  };


  //const dataU = useGetFetchQuery('user');
  //useUserPermission(0, true);

  let dataU = getLogUser();

  useEffect(() => {
    if (dataU) {
      /* if (dataU.data.user.rol === 1) {
        navigate("/admin");
      }else if(dataU.data.user.rol === 0){ */
        navigate("/home");
      //}
    }
  }, [])

  return (
    //<GeneralLayout navtype='landingpage'>
    <div className='landing-main' style={{ background: `url(${bk})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }} >
      <Container className='landing-container'>
        <Row className='landing-row'>
          <Col md={12} lg={7} className='landing-col'>
            <div className='landing-logo'>
              <img src={logo} alt="logo"/>
            </div>
            <div className='landing-title'>¡Encuentra todo lo que buscas!</div>
          </Col>
          <Col md={12} lg={5} className='landing-col'>
            <Signin />
          </Col>
        </Row>
      </Container>
    </div>
    //</GeneralLayout>
  )
}
