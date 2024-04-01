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

import './MisVentas.css';
import { getData, postData } from '../../api/api';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import CustomNavbar from '../../components/navbar/navbar';
import { VentasRow } from './VentasRow';

import { Cart, Trash, Plus, Dash } from 'react-bootstrap-icons';

import Swal from 'sweetalert2';

export const MisVentas = () => {

    const navigate = useNavigate();

    const [productos, setProductos] = useState([]);
    const [usuario, setUsuario] = useState(0);
    const [total, setTotal] = useState(0);
    const [show, setShow] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);
    const [allowBuy , setAllowBuy] = useState(false);

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {

        var usuario = window.localStorage.getItem("user");
        if (usuario) {
            usuario = JSON.parse(usuario).id;
            setUsuario(usuario);
        } else {
            navigate("/");
        }

        let endpoint = `user/sales?dpi=${usuario}`
        getData({endpoint}).then(data => {
            console.log(data);
            setPedidos(data);
        });

    }, []);


    function getTotal(myProductos) {  
        let total = 0;
        myProductos.map(producto => {
            total += producto.costo * producto.cantidad;
        });
        return total;
    }

    return (
        <div className="cart-root">
        <CustomNavbar />
        <Container className="cart-content">
            
            <Row>
                <Col xl={12} className='pb-5'>
                    <h1 style={{color:"black", fontWeight:'bold'}}>Mis Ventas</h1>
                </Col>
            </Row>

            <Row style={{width:'100%', border: 2, borderColor:'#000'}}>

                <Col xl={12}>
                    <VentasRow header={true}/>
                </Col>

                <Col xl={12} style={{maxHeight: "75vh", overflow: "auto"}}>
                    

                    { 
                        pedidos.length > 0 ?
                        pedidos.map((pedido, index) => (
                            <VentasRow 
                                key={index}
                                id={index + 1}
                                // vendedor={pedido.name}
                                // productos={pedido.products}
                                // total={0}
                                // calificacion={pedido.score}
                                producto={pedido.name}
                                cantidad={pedido.cantidad}
                                precio={pedido.price}
                                total={pedido.total}
                                fecha={pedido.date}
                                imagen={pedido.image}
                            />
                        ))
                        
                        :
                        <h3 style={{color:"black", fontWeight:'bold'}}>No has realizado compras :(</h3>
                    }

                    

                </Col>

            </Row>


        </Container>

        </div>
    );
}