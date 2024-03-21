import Container from 'react-bootstrap/Container';
import { useState, useEffect, useContext } from 'react';
import {
  useParams,
  useNavigate,
} from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../assets/react.svg';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'; 
import { Button, Modal } from 'react-bootstrap';

import './Carrito.css';
import { getData } from '../../api/api';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import CustomNavbar from '../../components/navbar/navbar';
import { CarritoRow } from './CarritoRow';

import { Cart, Trash, Plus, Dash } from 'react-bootstrap-icons';

import Swal from 'sweetalert2';

export const Carrito = () => {

    return (
        <div className="cart-root">
        <CustomNavbar />
        <Container className="cart-content">
            
            <Row>
                <Col xl={12} className='pb-5'>
                    <h1 style={{color:"black", fontWeight:'bold'}}>Mi Pedido</h1>
                </Col>
            </Row>

            <Row style={{width:'100%', border: 2, borderColor:'#000'}}>
                <Col xl={8} style={{maxHeight: "75vh", overflow: "auto"}}>
                    
                    <CarritoRow id={1}/>

                </Col>

                <Col xl={4} className='pl-4'>

                    <div className='resumen-container p-4'>
                        {/* <h3 style={{color:"black", fontWeight:'bold'}}>Resumen</h3>
                        <hr/>
                        <h4 style={{color:"black", fontWeight:'bold'}}>Subtotal: Q 100</h4>
                        <h4 style={{color:"black", fontWeight:'bold'}}>Envio: Q 20</h4>
                        <h4 style={{color:"black", fontWeight:'bold'}}>Total: Q 120</h4>
                        <Button variant="success" size="lg" block>Comprar</Button> */}

                        <div className='resumen-price mb-2'>
                            <h5 style={{color:"black", fontWeight:'bold'}}> Subtotal:</h5>
                            <h5 style={{color:"black", fontWeight:'bold'}}> Q100 </h5>
                        </div>

                        <div className='resumen-price mb-2'>
                            <h5 style={{color:"black", fontWeight:'bold'}}> Envio:</h5>
                            <h5 style={{color:"black", fontWeight:'bold'}}> Q20 </h5>
                        </div>

                        <hr class="mt-2"/>

                        <div className='resumen-price mb-2'>
                            <h5 style={{color:"black", fontWeight:'bold'}}> Total:</h5>
                            <h5 style={{color:"black", fontWeight:'bold'}}> Q120 </h5>
                        </div>

                        <Button className='btn-buy' block>Comprar</Button>

                    </div>
                
                </Col>


            </Row>


        </Container>


        </div>
    );
}