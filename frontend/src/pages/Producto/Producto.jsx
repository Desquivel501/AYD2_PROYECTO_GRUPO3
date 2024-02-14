import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../assets/react.svg';
import './Producto.css';
import productImage1 from '../../assets/camera.png';
import productImage2 from '../../assets/camera2.png';
import productImage3 from '../../assets/camera3.png';
import productImage4 from '../../assets/camera4.png';

import { ProductCard } from '../../components/ProductCard/ProductCard';


export default function Producto() {
  return (
    <div className="contentContainer">
    <Container fluid>
      <Row>
        <Col xl={7} className=''>
            <img
                alt=""
                src={productImage1}
                width="80%"
                height="auto"
                className="zoom d-inline-block align-top "
            />
        </Col>
        <Col xs={5} className='product-info-container'>
            <h1 style={{color:"black", fontWeight:'bold'}}>Nombre Producto</h1>

            <div className='mt-3'>
              <h5 style={{color:"blue", textAlign:"left"}} > Vendedor: Nombre Vendedor </h5>
            </div>

            <hr class="mt-3 mb-1"/>
            
            <div className='mt-3'>
              <h3 style={{color:"green", textAlign:"left"}} > Disponible. </h3>
            </div>

            <div className='mt-3'>
              <h2 style={{color:"black", fontWeight:'bold'}} > Q 300.00 </h2>
            </div>

            <hr class="mt-3 mb-1"/>

            <div className='mt-4'>
              <h4 style={{color:"black", textAlign:"left"}} > Descripcion: </h4>
              <p style={{color:"black", textAlign:"left"}} > Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt urna ut massa pharetra semper. Etiam tortor odio, posuere in suscipit vitae, faucibus non felis. Fusce suscipit tellus facilisis nisl faucibus pretium. Morbi quis nunc id justo euismod volutpat. Maecenas eget dolor tempor, commodo magna rhoncus, aliquet urna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p>
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
                <Col xl={4} className='px-1'>
                  <ProductCard
                    logo={productImage2}
                    price={2000}
                    name="Camara 1"
                  />
                </Col>
                <Col xl={4} className='px-1'>
                  <ProductCard
                    logo={productImage3}
                    price={1500}
                    name="Camara 2"
                  />
                </Col>
                <Col xl={4} className='px-1'>
                  <ProductCard
                    logo={productImage4}
                    price={300}
                    name="Lentes"
                  />
                </Col>
              </Row>
              
            </Container>

        </Col>
      </Row>

    </Container>
    </div>
  );
}