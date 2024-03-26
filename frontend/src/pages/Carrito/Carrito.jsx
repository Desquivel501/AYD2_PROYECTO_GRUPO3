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

    const [productos, setProductos] = useState([]);
    const [usuario, setUsuario] = useState(0);
    const [total, setTotal] = useState(0);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        var carrito = window.sessionStorage.getItem("carrito");
        if (carrito) {
            setProductos(JSON.parse(carrito).productos);
            setUsuario(JSON.parse(carrito).usuario);
            setTotal(getTotal(JSON.parse(carrito).productos));
        }
    }, []);

    const handleCantidad = (id, cantidad) => {
        let newProductos = productos.map(producto => {
            if (producto.product_id === id) {
                producto.cantidad += cantidad;
            }
            return producto;
        });
        newProductos = newProductos.filter(producto => producto.cantidad > 0);
        setProductos(newProductos);
        window.sessionStorage.setItem("carrito", JSON.stringify({productos: newProductos, usuario: usuario}));
        setTotal(getTotal(newProductos));
    }

    function getTotal(myProductos) {  
        let total = 0;
        myProductos.map(producto => {
            total += producto.costo * producto.cantidad;
        });
        console.log(total);
        return total;
    }

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
                    
                    {/* <CarritoRow id={1}/>

                    <CarritoRow id={2}/> */}
                    {
                        productos.map((producto, index) => (
                            <CarritoRow
                                key={index}
                                id={producto.product_id}
                                imagen={producto.image}
                                nombre={producto.nombre}
                                precio={producto.costo}
                                cantidad={producto.cantidad}
                                onChange={handleCantidad}
                            />
                        ))
                    }

                </Col>

                <Col xl={4} className='pl-4'>

                    <div className='resumen-container p-4'>
                        <div className='resumen-price mb-2'>
                            <h5 style={{color:"black", fontWeight:'bold'}}> Subtotal:</h5>
                            <h5 style={{color:"black", fontWeight:'bold'}}> Q {total} </h5>
                        </div>

                        <div className='resumen-price mb-2'>
                            <h5 style={{color:"black", fontWeight:'bold'}}> Envio:</h5>
                            <h5 style={{color:"black", fontWeight:'bold'}}> Q20 </h5>
                        </div>

                        <hr class="mt-2"/>

                        <div className='resumen-price mb-2'>
                            <h5 style={{color:"black", fontWeight:'bold'}}> Total:</h5>
                            <h5 style={{color:"black", fontWeight:'bold'}}> Q {total + 20}</h5>
                        </div>

                        <hr class="mt-2"/>

                        <div className='resumen-price mb-2'>
                            <h5 style={{color:"black", fontWeight:'bold'}}> Forma de pago:</h5>
                        </div>

                        <Row style={{width: '100%'}}>
                            <Col xl={9} 
                                style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
                            >

                                <select className='form-select mb-2' aria-label="Default select example"
                                    style={{width: '100%', height: '40px'}}
                                >
                                    <option value="1">Tarjeta terminada en **12</option>
                                    <option value="2">Tarjeta terminada en **56</option>
                                    <option value="3">Tarjeta terminada en **89</option>
                                </select>
                            </Col>
                            <Col xl={3}>

                                <Button block
                                    style={{height: '40px'}}
                                    onClick={handleShow}
                                >
                                    <Plus size={20}/>
                                </Button>
                            </Col>  
                        </Row>

                        <hr class="mt-2"/>

                        <Button className='btn-buy' block>Comprar</Button>

                    </div>
                
                </Col>


            </Row>


        </Container>

        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar forma de pago</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <Form>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Alias</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre Titular</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Numero de tarjeta</Form.Label>
                        <Form.Control type="text" placeholder="1234 5678 9012 3456" />
                    </Form.Group>

                    <Row>
                        <Col xl={6}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Fecha de expiracion</Form.Label>
                                <Form.Control type="text" placeholder="MM/AA" />
                            </Form.Group>
                        </Col>
                        <Col xl={6}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control type="number" placeholder="000" />
                            </Form.Group>
                        </Col>
                    </Row>

                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Agregar
                </Button>
            </Modal.Footer>
        </Modal>



        </div>
    );
}