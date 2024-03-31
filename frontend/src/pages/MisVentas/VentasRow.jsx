

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

import './MisVentas.css';

import { StarFill } from 'react-bootstrap-icons';

export const VentasRow = (props) => {

    const {
        id,
        producto,
        cantidad,
        precio,
        fecha,
        header = false,
        imagen,
        total
    } = props;

    // const [total, setTotal] = useState(0);

    useEffect(() => {
        // if(productos.length > 0) {
        //     var my_total = 0;
        //     for (let i = 0; i < productos.length; i++) {
        //         my_total += productos[i].price * productos[i].cantidad; 
        //     }
        //     setTotal(my_total);
        // }
    }, []);


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
                <h3 style={{color:"black", fontWeight: header ? 'bold': '', textAlign: 'left'}}>{header ? "#": id}</h3>
            </Col>
            

            {
                header ?
                null:
                <Col xl={1} className='text-center'>
                    <img
                        alt=""
                        src={imagen ? imagen : "https://placehold.co/800"}
                        width="80%"
                        height="auto"
                        className="d-inline-block align-top "
                    />
                </Col>
            }

            <Col xl={header ? 4 : 3}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRight: header ? '1px solid black' : '1px solid #949596' 
                }}
            >
                <h4 style={{color:"black", fontWeight: header ? 'bold': '', textAlign: 'center'}}> {header ? "Producto": producto} </h4>
            </Col>

            {
                header ?
                null:
                <Col xl={1}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRight: header ? '1px solid black' : '' 
                    }}
                >
                    <h4 style={{color:"black", fontWeight: 'bold', textAlign: 'center'}} > {"Q" + precio} </h4>
                </Col>
            }

            <Col xl={header ? 2 : 1}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRight: header ? '1px solid black' : '1px solid #949596' 
                }}
            >
                <h4 style={{color:"black", fontWeight: 'bold', textAlign: 'center'}} > {header ? "Precio": "x" + cantidad} </h4>
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

            <Col xl={3}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <h4 style={{color:"black", fontWeight: 'bold', textAlign: 'center'}} > {header ? "Fecha": fecha} </h4>
            </Col>

        </Row>

        </>
    )
}