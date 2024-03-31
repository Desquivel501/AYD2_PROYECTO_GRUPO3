

import Container from 'react-bootstrap/Container';
import { useState, useEffect, useContext } from 'react';
import {
  useParams,
  useNavigate,
} from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Button, Modal } from 'react-bootstrap';

import './MisPedidos.css';

import { StarFill } from 'react-bootstrap-icons';

export const PedidosRow = (props) => {

    const {
        id,
        vendedor,
        productos = [],
        calificacion,
        header = false
    } = props;

    const [total, setTotal] = useState(0);
    const [calificacionVendedor, setCalificacionVendedor] = useState(calificacion);
    const [calificacionPreview, setCalificacionPreview] = useState(5);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if(productos.length > 0) {
            var my_total = 0;
            for (let i = 0; i < productos.length; i++) {
                my_total += productos[i].price * productos[i].cantidad; 
            }
            setTotal(my_total);
        }
    }, []);

    const handleCalificar = () => {
        setCalificacionVendedor(calificacionPreview);
        handleClose();
    }


    return (

        <>

        <Row className='product-container2 p-2 mb-2' 
            style={{backgroundColor: header ? '#949596' : 'white'}}
        >

            <Col xl={1}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRight: header ? '1px solid black' : '1px solid #949596' 
                }}
            >
                <h3 style={{color:"black", fontWeight: header ? 'bold': '', textAlign: 'left'}}>{header ? "Id": id}</h3>
            </Col>

            {/* <hr style={{color:"black", fontWeight: header ? 'bold': '', textAlign: 'center'}}/> */}

            <Col xl={3}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRight: header ? '1px solid black' : '1px solid #949596' 
                }}
            >
                <h4 style={{color:"black", fontWeight: header ? 'bold': '', textAlign: 'center'}}> {header ? "Vendedor": vendedor} </h4>
            </Col>

            <Col xl={4}
                style={{
                    borderRight: header ? '1px solid black' : '1px solid #949596' 
                }}
            >
                {
                    header ?
                    <h4 style={{color:"black", fontWeight: 'bold', textAlign: 'center'}}>Productos</h4>
                    :
                    productos.map((producto, index) => (
                        <Row key={index} className='p-2 mb-2'>
                            <Col xl={6}>
                                <h5 style={{color:"black", textAlign: 'center'}}>{producto.name}</h5>
                            </Col>
                            <Col xl={3}>
                                <h5 style={{color:"black", fontWeight: 'bold', textAlign: 'center'}}>Q{producto.price}</h5>
                            </Col>
                            <Col xl={3}>
                                <h5 style={{color:"black", fontWeight: 'bold', textAlign: 'center'}}>x{producto.cantidad}</h5>
                            </Col>
                        </Row>
                    ))
                }
            </Col>

            <Col xl={2}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRight: header ? '1px solid black' : '1px solid #949596' 
                }}
            >
                <h4 style={{color:"black", fontWeight: 'bold', textAlign: 'center'}} > {header ? "Total": "Q" + total} </h4>
            </Col>

            <Col xl={2}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {
                    header ?
                        <h4 style={{color:"black", fontWeight: 'bold', textAlign: 'center'}}>Calificación</h4>
                    :
                    <>
                    {
                        calificacionVendedor == 0 ?
                        <Button variant="primary" onClick={handleShow}>
                            Calificar
                        </Button>
                        :
                        <Row>
                            <Col xl={12}>
                                <StarFill color={calificacionVendedor >= 1 ? '#ffc03e' : '#5f646d'} size={20} />
                                <StarFill color={calificacionVendedor >= 2 ? '#ffc03e' : '#5f646d'} size={20} />
                                <StarFill color={calificacionVendedor >= 3 ? '#ffc03e' : '#5f646d'} size={20} />
                                <StarFill color={calificacionVendedor >= 4 ? '#ffc03e' : '#5f646d'} size={20} />
                                <StarFill color={calificacionVendedor >= 5 ? '#ffc03e' : '#5f646d'} size={20} />
                            </Col>
                        </Row>
                    }
                   </>
                }
            </Col>

        </Row>

        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            {/* <Modal.Header closeButton>
                <Modal.Title>Calificar</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
                
                {/* <Form>
                    
                   

                </Form> */}

                <Row className='mb-3'>
                    <Col xl={12}>
                        <h3 style={{color:"black", fontWeight:'bold'}}>Califica tu compra</h3>
                    </Col>
                </Row>

                <Row>
                    <Col xl={12} 
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                       {
                            [1,2,3,4,5].map((star, index) => (
                                <StarFill 
                                    key={index}
                                    className='mx-1'
                                    size={40}    
                                    style={{
                                        cursor: 'pointer',
                                        color: calificacionPreview >= index + 1 ? '#ffc03e' : '#5f646d',
                                    }}
                                    onClick={() => setCalificacionPreview(index + 1)}
                                />
                            ))
                       }


                    </Col>
                </Row>

                <Row className='mt-3'>
                    <h4>Vendedor: {vendedor}</h4>
                </Row>



            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleCalificar}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>

        </>
    )
}