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

import './Producto.css';
import { getData } from '../../api/api';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import CustomNavbar from '../../components/navbar/navbar';

import { Cart, Trash, Plus, Dash } from 'react-bootstrap-icons';

import Swal from 'sweetalert2';

export const Producto = (props) => {

  const {
      logo,
      price,
      name
  } = props;

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    precio: 0,
    existencia: 0,
    categoria: "",
    vendedor: "",
    imagen: "https://placehold.co/800",
  });

  const [recommendedProducts, setRecommendedProducts] = useState([
    {id: 0, nombre: "", precio: 0, imagen: "https://placehold.co/800"},
    {id: 0, nombre: "", precio: 0, imagen: "https://placehold.co/800"},
    {id: 0, nombre: "", precio: 0, imagen: "https://placehold.co/800"},
  ]);

  const [cantidad, setCantidad] = useState(1);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = JSON.parse(localStorage.getItem('user'));
 
  useEffect(() => {
    let endpoint = `product?id=${id}`
    getData({ endpoint }).then((data) => {
        console.log(data);
        setProduct(data)

    });

    endpoint = `all-products`
    getData({ endpoint }).then((data) => {
        console.log(data);
        for(let i = data.length - 1; i > 0; i--){
          if(data[i].product_id == id){
            data.splice(i, 1);
            break;
          }
        }

        const random = data.sort(() => .5 - Math.random()).slice(0,3)

        setRecommendedProducts(random)
    });

  }, [id]);


  const addCarrito = () => {
    var carrito = window.sessionStorage.getItem("carrito");

    if (carrito == null || carrito == undefined) {
      carrito = {
        productos: [],
        usuario: user.id,
      };
    } else {
      carrito = JSON.parse(carrito);
    }

    var found = false;
    for (var i = 0; i < carrito.productos.length; i++) {
      if (
        carrito.productos[i].product_id == product.product_id
      ) {
        console.log("found");
        carrito.productos[i].cantidad = cantidad;
        found = true;
        break;
      }
    }

    if (!found) {
      carrito.productos.push({
        product_id: product.product_id,
        nombre: product.nombre,
        cantidad: cantidad,
        costo: product.precio,
        image: product.imagen,
      });
    }

    window.sessionStorage.setItem("carrito", JSON.stringify(carrito));

    handleClose();

    Swal.fire({
      icon: 'success',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 1500
    })

  };


  return (
    <div className="product-root">
      <CustomNavbar />
      <Container className="contentContainer">
        <Row style={{width:'100%'}}>
          <Col xl={7} className=''>
              <img
                  alt=""
                  src={product.imagen}
                  width="80%"
                  height="auto"
                  className="zoom d-inline-block align-top "
              />
          </Col>
          <Col xs={5} className='product-info-container'>
              <h1 style={{color:"black", fontWeight:'bold'}}>{product.nombre}</h1>

              <div className='mt-3'>
                <h5 style={{color:"blue", textAlign:"left"}} > Vendedor: {product.vendedor} </h5>
              </div>

              <hr class="mt-3 mb-1"/>
              
              <div className='mt-3'>
                <h3 style={{color:product.existencia ? "green" : "red", textAlign:"left"}} > {product.existencia > 0 ? "Disponible." : "No Disponible."} </h3>
              </div>

              {
                product.existencia > 0 ?
                <div>
                  <h5 style={{color:"black", textAlign:"left"}} > Existencias: {product.existencia} </h5>
                </div>
                :
                null
              }

              <div className='mt-3'>
                <h2 style={{color:"black", fontWeight:'bold'}} > Q {product.precio} </h2>
              </div>

              <hr class="mt-3 mb-1"/>

              <div className='mt-4'>
                <h4 style={{color:"black", textAlign:"left"}} > Categoria: </h4>
                <p style={{color:"black", textAlign:"left"}} > {product.categoria} </p>
              </div>

              <hr class="mt-3 mb-1"/>

              <div className='mt-4'>
                <h4 style={{color:"black", textAlign:"left"}} > Descripcion: </h4>
                <p style={{color:"black", textAlign:"left"}} > {product.descripcion} </p>
              </div>

              <hr class="mt-3 mb-1"/>

              <div className='mt-4'>
                <button type="button" class="btn-buy"
                  onClick={handleShow}
                >
                  Comprar
                </button>
              </div>
          </Col>
        </Row>

        <hr class="mt-5 mb-5"/>

        <Row>
          <Col xl={12} className='5'>
              <h2 style={{color:"black", textAlign:"left", fontWeight:'bold'}}>Productos Relacionados</h2>

              <Container fluid className='mt-5'>
                <Row style={{justifyContent:'space-around'}}>
                  {recommendedProducts.map((product, i) => (
                    <Col xl={4} className='px-1' key={i}>
                      <ProductCard
                        id={product.product_id}
                        logo={product.imagen}
                        price={product.precio}
                        name={product.nombre}
                      />
                    </Col>
                  ))}


                </Row>
                
              </Container>

          </Col>
        </Row>

      </Container>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
              <Modal.Title>Agregar al carrito</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Row>
                <Col xl={3} className='text-center'>
                  <img
                      alt=""
                      src={product.imagen}
                      width="80%"
                      height="auto"
                      className="zoom d-inline-block align-top "
                  />
                </Col>
                <Col xl={9} className='text-center'>
                    <Row>
                      <Col xl={9}>
                        <h3 style={{color:"black", textAlign: 'left'}}>{product.nombre}</h3>
                      </Col>
                      <Col xl={3}>
                        <h4 style={{color:"black", fontWeight:'bold', textAlign: 'left'}} > Q {product.precio} </h4>
                      </Col>
                    </Row>
                      

                    <Row className='mt-2'>
                      
                      <Col xl={2}>
                        <Button variant="danger">
                          {
                            cantidad > 1 ? 
                            <Dash size={20} onClick={() => setCantidad(cantidad - 1)}/>
                            : 
                            <Trash size={20} onClick={handleClose}/>
                          }
                        </Button>
                      </Col>

                      <Col xl={2} >
                        <h4 style={{color:"black", fontWeight:'bold', textAlign: 'center'}} > {cantidad} </h4>
                      </Col>

                      <Col xl={2}>
                        <Button variant="success">
                          <Plus size={20} onClick={() => {
                            if(cantidad < product.existencia){
                              setCantidad(cantidad + 1)
                            } 
                          }}/>
                        </Button>
                      </Col>
                    </Row>

                </Col>
              </Row>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Cancelar
              </Button>
              <Button variant="primary" onClick={addCarrito}>
                  Agregar
              </Button>
          </Modal.Footer>
      </Modal>

    </div>
  );
}