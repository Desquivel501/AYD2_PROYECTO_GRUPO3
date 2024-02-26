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

import { useState, useEffect, useContext } from 'react';

import { Cart, Search } from 'react-bootstrap-icons';

import { ProductCard } from '../../components/ProductCard/ProductCard';

import { getData } from '../../api/api';

export default function Catalogo() {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);
    const [categories2, setCategories2] = useState([]);


    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    useEffect(() => {
        const endpoint = `all-products`
        getData({ endpoint }).then((data) => {
            console.log(data);
            setProducts(data);

            let categories = new Set();
            data.forEach(product => {
                categories.add(product.categoria);
            });
            setCategories(Array.from(categories));

        });
    }, []);

    useEffect(() => {
        // if(minPrice > maxPrice) setMaxPrice(minPrice)
        // if(maxPrice < minPrice) setMinPrice(maxPrice)
        if(minPrice < 0) setMinPrice(0)
        if(maxPrice < 0) setMaxPrice(0)
        // if(minPrice === '') setMinPrice(0)
        // if(maxPrice === '') setMaxPrice(10000)
    }, [minPrice, maxPrice]);


    const changeCategory = (event) => {
        // console.log(event.target.id)        
        
        // let categories2 = categories

        var found = false
        for (var i = 0; i < categories.length; i++){
            if(categories[i] == event.target.id){
                found = true
                categories.splice(i, 1)
                break;
            } 
        }
        if(!found){
            categories.push(event.target.id)
        }

        setCategories(categories)
        // setCategories2(categories)

        // setCategories(categories2)
    }


    // useEffect(() => {
    //     const updateSearch = () => {
    //         if(sent != search){
    //             if(search != "" && search != undefined && search != null){
    //                 console.log(search)
    //                 setSent(search)
    //             } 
    //         }    
    //     };
    
    //     const interval =  setInterval(() => {
    //         updateSearch()
          
    //     }, 750);
    //     return () => clearInterval(interval);
    // },[search]);


    function filter(item) {
        if(item.precio < minPrice || item.precio > maxPrice) return false

        // if(categories2.length > 0 && !categories2.includes(item.categoria)) return false

        if(search === '') return true
        return item.nombre.toLowerCase().includes(search.toLowerCase())
    }


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
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
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
                                    <input className="form-control" placeholder="Min" aria-label="min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}/>
                                    <span className="input-group-text">-</span>
                                    <input className="form-control" placeholder="Max" aria-label="max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}/>
                                </InputGroup>

                            </Col>
                        </Row>
                        <Row>
                            <Col xl={12} className='pb-3' >
                                <h5 style={{color:"black", fontWeight:'bold'}}>Categoria</h5>
                                <Form aria-label="Categorias" className='categoria-form' style={{maxHeight: "40vh", overflow: "auto"}}>
                                    {/* <Form.Check type='checkbox' id='camaras' label='Camaras'/>
                                    <Form.Check type='checkbox' id='lentes' label='Lentes'/>
                                    <Form.Check type='checkbox' id='accesorios' label='Accesorios'/> */}
                                    {categories.map((category, i) => {
                                        return (
                                            <Form.Check type='checkbox' id={category} label={category} key={i} onChange={changeCategory}/>
                                        );
                                    })}
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Col>


                <Col xl={9} style={{maxHeight: "75vh", overflow: "auto"}}>
                    <Container fluid className=''>
                    <Row>
                        {/* {products.map((product, i) => {
                            return (
                                <Col xl={3} className='px-1 mb-2' key={i}>
                                    <ProductCard
                                        logo={product.imagen}
                                        price={product.precio}
                                        name={product.nombre}
                                    />
                                </Col>
                            );
                        })} */}

                        {products.map((product, i) => (
                            filter(product) &&
                            <Col xl={3} className='px-1 mb-2' key={i}>
                                <ProductCard
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