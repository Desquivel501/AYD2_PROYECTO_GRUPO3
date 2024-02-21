import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import logo from '../../assets/react.svg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Catalogo.css';
import productImage1 from '../../assets/camera.png';
import productImage2 from '../../assets/camera2.png';
import productImage3 from '../../assets/camera3.png';
import productImage4 from '../../assets/camera4.png';

import { Cart, Search } from 'react-bootstrap-icons';

import { ProductCard } from '../../components/ProductCard/ProductCard';


export default function Catalogo() {
  return (
    <div className="catalog-content">
        <Container fluid className=''>

        <Row>
            <Col xl={12} className='pb-3'>
                <h1 style={{color:"black", fontWeight:'bold'}}>Catalogo</h1>
            </Col>
        </Row>

        <Row >

            <Col xl={3} className='pb-3'>
                <Container fluid className='filtros-container p-4'>
                    <Row>
                        <Col xl={12} className='pb-3'>
                            <h3 style={{color:"black", fontWeight:'bold'}}>Filtros</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12} className='pb-3'>
                            <h5 style={{color:"black", fontWeight:'bold'}}>Buscar</h5>
                            {/* <input type="text" id="search" name="search"/> */}
                            <InputGroup className="mb-3">
                                <Form.Control
                                    aria-label="Buqueda"
                                />
                                <Button variant="outline-secondary" id="button-addon2">
                                    <Search />
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12} className='pb-3'>
                            <h5 style={{color:"black", fontWeight:'bold'}}>Precio</h5>
                            {/* <input type="range" class="form-range" id="price" name="price" min="0" max="10000"/> */}

                            <InputGroup className="mb-3">
                                <input class="form-control" placeholder="Min" aria-label="Username"/>
                                <span class="input-group-text">-</span>
                                <input class="form-control" placeholder="Max" aria-label="Server"/>
                            </InputGroup>

                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12} className='pb-3' >
                            <h5 style={{color:"black", fontWeight:'bold'}}>Categoria</h5>
                            <Form aria-label="Categorias" className='categoria-form' style={{maxHeight: "40vh", overflow: "auto"}}>
                                <Form.Check type='checkbox' id='camaras' label='Camaras'/>
                                <Form.Check type='checkbox' id='lentes' label='Lentes'/>
                                <Form.Check type='checkbox' id='accesorios' label='Accesorios'/>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Col>

            <Col xl={9} style={{maxHeight: "75vh", overflow: "auto"}}>
                <Container fluid className=''>
                <Row>
                    <Col xl={3} className='px-1 mb-2'>
                    <ProductCard
                        logo={productImage2}
                        price={2000}
                        name="Camara 1"
                    />
                    </Col>
                    <Col xl={3} className='px-1 mb-2'>
                    <ProductCard
                        logo={productImage3}
                        price={1500}
                        name="Camara 2"
                    />
                    </Col>
                    <Col xl={3} className='px-1 mb-2'>
                    <ProductCard
                        logo={productImage4}
                        price={300}
                        name="Lentes"
                    />
                    </Col>
                    <Col xl={3} className='px-1 mb-2'>
                    <ProductCard
                        logo={productImage4}
                        price={300}
                        name="Lentes"
                    />
                    </Col>
                    <Col xl={3} className='px-1 mb-2'>
                    <ProductCard
                        logo={productImage2}
                        price={2000}
                        name="Camara 1"
                    />
                    </Col>
                    <Col xl={3} className='px-1 mb-2'>
                    <ProductCard
                        logo={productImage3}
                        price={1500}
                        name="Camara 2"
                    />
                    </Col>
                    <Col xl={3} className='px-1 mb-2'>
                    <ProductCard
                        logo={productImage4}
                        price={300}
                        name="Lentes"
                    />
                    </Col>
                    <Col xl={3} className='px-1 mb-2'>
                    <ProductCard
                        logo={productImage4}
                        price={300}
                        name="Lentes"
                    />
                    </Col>
                    
                    <Col xl={3} className='px-1 mb-2'>
                    <ProductCard
                        logo={productImage2}
                        price={2000}
                        name="Camara 1"
                    />
                    </Col>
                    <Col xl={3} className='px-1 mb-2'>
                    <ProductCard
                        logo={productImage3}
                        price={1500}
                        name="Camara 2"
                    />
                    </Col>
                    <Col xl={3} className='px-1 mb-2'>
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