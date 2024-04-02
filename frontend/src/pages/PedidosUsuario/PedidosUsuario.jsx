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

import './MisPedidos.css';
import { getData, postData } from '../../api/api';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import CustomNavbar from '../../components/navbar/navbar';
import { PedidosRow } from './PedidosRow';

import { Cart, Trash, Plus, Dash } from 'react-bootstrap-icons';

import Swal from 'sweetalert2';

export const PedidosUsuario = () => {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(0);
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {

        var usuario = window.localStorage.getItem("user");
        if (usuario) {
            usuario = JSON.parse(usuario).id;
            setUsuario(usuario);
        } else {
            navigate("/");
        }

        let endpoint = `user/purchases?dpi=${usuario}`
        getData({endpoint}).then(data => {
            console.log(data);
            setPedidos(data);
        });

    }, []);

    return (
        <div className="cart-root">
        <CustomNavbar />
        <Container className="cart-content">
            
            <Row>
                <Col xl={12} className='pb-5'>
                    <h1 style={{color:"black", fontWeight:'bold'}}>Mis Pedidos</h1>
                </Col>
            </Row>

            <Row style={{width:'100%', border: 2, borderColor:'#000'}}>
                <Col xl={12} style={{maxHeight: "75vh", overflow: "auto"}}>
                    
                    <PedidosRow header={true}/>


                    { 
                        pedidos.length > 0 ?
                        pedidos.map((pedido, index) => (
                            <PedidosRow 
                                key={index}
                                id={pedido.purchase_id}
                                vendedor={pedido.name}
                                productos={pedido.products}
                                total={0}
                                calificacion={pedido.score}
                                id_vendedor={pedido.dpi}
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