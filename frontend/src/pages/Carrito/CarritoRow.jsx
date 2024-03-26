

import Container from 'react-bootstrap/Container';
import { useState, useEffect, useContext } from 'react';
import {
  useParams,
  useNavigate,
} from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Modal } from 'react-bootstrap';

import './Carrito.css';

import { Cart, Trash, Plus, Dash } from 'react-bootstrap-icons';

export const CarritoRow = (props) => {

    const {
        id,
        imagen,
        nombre,
        precio,
        cantidad,
        onChange
    } = props;


    const addProduct = () => {
        onChange(id, 1);
    }

    const removeProduct = () => {
        onChange(id, -1);
    }


    return (
        <Row className='product-container2 p-2 mb-2'>
            <Col xl={2} className='text-center'>
                <img
                    alt=""
                    src={imagen ? imagen : "https://placehold.co/800"}
                    width="80%"
                    height="auto"
                    className="d-inline-block align-top "
                />
            </Col>

            <Col xl={9} className='product-info-container'>
                <Row>
                    <Col xl={6}>
                        <h3 style={{color:"black", textAlign: 'left'}}>{nombre}</h3>
                    </Col>

                    <Col xl={3}>
                        <h4 style={{color:"black", textAlign: 'center'}}> Q {precio} c/u</h4>
                    </Col>

                    <Col xl={3}>
                        <h4 style={{color:"black", fontWeight:'bold', textAlign: 'center'}} > Q {Number(precio) * Number(cantidad)}</h4>
                    </Col>
                </Row>
                

                <Row className='mt-2' style={{width: '30%'}}>
                
                    <Col xl={4}>
                        <Button variant="danger"
                            onClick={removeProduct}
                        >
                            <Dash size={20}/>
                        </Button>
                    </Col>

                    <Col xl={4} >
                        <h4 style={{color:"black", fontWeight:'bold', textAlign: 'center'}} > {cantidad} </h4>
                    </Col>

                    <Col xl={4}>
                        <Button variant="success"
                            onClick={addProduct}
                        >
                            <Plus size={20}/>
                        </Button>
                    </Col>
                </Row>

            </Col>
        </Row>
    )
}