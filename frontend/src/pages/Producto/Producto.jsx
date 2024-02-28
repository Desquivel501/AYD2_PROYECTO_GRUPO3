import Container from 'react-bootstrap/Container';
import { useState, useEffect, useContext } from 'react';
import {
  useParams,
  useNavigate,
} from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../assets/react.svg';
import './Producto.css';
import productImage1 from '../../assets/camera.png';
import productImage2 from '../../assets/camera2.png';
import productImage3 from '../../assets/camera3.png';
import productImage4 from '../../assets/camera4.png';

import { getData } from '../../api/api';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import CustomNavbar from '../../components/navbar/navbar';


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
 
  useEffect(() => {
    let endpoint = `product?id=${id}`
    getData({ endpoint }).then((data) => {
        console.log(data);
        setProduct(data)

    });

    endpoint = `all-products`
    getData({ endpoint }).then((data) => {
        console.log(data);
        setRecommendedProducts(data.slice(0, 3))
    });

  }, [id]);


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

              <div className='mt-3'>
                <h2 style={{color:"black", fontWeight:'bold'}} > Q {product.precio} </h2>
              </div>

              <hr class="mt-3 mb-1"/>

              <div className='mt-4'>
                <h4 style={{color:"black", textAlign:"left"}} > Descripcion: </h4>
                <p style={{color:"black", textAlign:"left"}} > {product.descripcion} </p>
              </div>

              <hr class="mt-3 mb-1"/>

              <div className='mt-4'>
                <button type="button" class="btn-buy">Comprar</button>
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
    </div>
  );
}