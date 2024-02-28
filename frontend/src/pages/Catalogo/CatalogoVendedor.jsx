import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Catalogo.css';
import CustomNavbar from '../../components/navbar/navbar';

import { useState, useEffect, useContext } from 'react';
import { Cart, Search } from 'react-bootstrap-icons';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { getData } from '../../api/api';
import { useNavigate } from 'react-router-dom';


export const CatalogoVendedor = () => {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);
    const [categories2, setCategories2] = useState([]);


    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    const navigate = useNavigate();

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
        if(minPrice < 0) setMinPrice(0)
        if(maxPrice < 0) setMaxPrice(0)
    }, [minPrice, maxPrice]);


    const changeCategory = (event) => {
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
    }

    const handleClick = (e) => {

        if(e === -1) {
            navigate('/crear-producto');
            return;
        }

        console.log(e);
        const route = `/producto/edit/${e}`;
        navigate(route);
    }


    function filter(item) {
        if(item.precio < minPrice || item.precio > maxPrice) return false
        if(search === '') return true
        return item.nombre.toLowerCase().includes(search.toLowerCase())
    }


    return (
        <div className="catalog-root">
            <CustomNavbar />

            <Container fluid className='catalog-content'>

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
                        <Col xl={3} className='px-1 mb-2' onClick={() => handleClick(-1)}>
                            <ProductCard
                                id={-1}
                                logo={"https://cdn-icons-png.flaticon.com/512/2661/2661440.png"}
                                price={0}
                                name={"Crear Producto"}
                            />
                        </Col>
                        {products.map((product, i) => (
                            filter(product) &&
                            <Col xl={3} className='px-1 mb-2' key={i} onClick={() => handleClick(product.product_id)}>
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