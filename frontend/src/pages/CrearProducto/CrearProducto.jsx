import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import logo from '../../assets/react.svg';
import './CrearProducto.css';
import productImage1 from '../../assets/camera.png';
import productImage2 from '../../assets/camera2.png';
import productImage3 from '../../assets/camera3.png';
import productImage4 from '../../assets/camera4.png';

import { ProductCard } from '../../components/ProductCard/ProductCard';


export const CrearProducto = (props) => {

  const {
    logo,
    price,
    name
  } = props;

  const [preview, setPreview] = useState("https://i5.walmartimages.com/seo/NBD-Digital-Camera-4K-48MP-Compact-Camera-3-0-Inch-Ultra-Clear-Screen-YouTube-Vlogging-Camera-16x-Digital-Zoom-Video-Camera-Cameras-for-Photography_6ac10792-1adc-4637-9c53-e7890dea9fca.452220c9a4e75ac44f7bf578e6e517fe.jpeg");
  const [image, setImage] = useState("https://i5.walmartimages.com/seo/NBD-Digital-Camera-4K-48MP-Compact-Camera-3-0-Inch-Ultra-Clear-Screen-YouTube-Vlogging-Camera-16x-Digital-Zoom-Video-Camera-Cameras-for-Photography_6ac10792-1adc-4637-9c53-e7890dea9fca.452220c9a4e75ac44f7bf578e6e517fe.jpeg");


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="contentContainer">
    <Container fluid>
      <Row>
        <Col xl={7} className='product-info-container'>
            
            <div className='product-image-container'>
              <img
                  alt=""
                  src={image}
                  width="80%"
                  height="auto"
                  className="d-inline-block align-top "
                  style={{alignSelf:'center'}}
              />
            </div>

            <div className='mt-3'>
              <button type="button" class="btn-upload-create" onClick={handleShow}>Subir Imagen</button>
            </div>

        </Col>
        <Col xs={5} className='product-info-container'>
            {/* <h1 style={{color:"black", fontWeight:'bold'}}>Nombre Producto</h1> */}

            <Form.Control type="text" placeholder="Nombre del producto" style={{color:"black", fontWeight:'bold', fontSize:'2.5rem'}}/>

            <div className='mt-3'>
              <h5 style={{color:"blue", textAlign:"left"}} > Vendedor: Nombre Vendedor </h5>
            </div>

            <hr class="mt-3 mb-1"/>
            
            {/* <div className='mt-3'>
              <h3 style={{color:"green", textAlign:"left"}} > Disponible. </h3>
            </div> */}

            <Form.Check className='custom-checkbox mt-3' id='disponibilidad' label='Disponible?' style={{color:"green", textAlign:"left", fontSize:'1.5rem'}}/>

            {/* <Form.Control className='mt-3' type="number" placeholder="Price" style={{color:"black", fontWeight:'bold', fontSize:'1.5rem'}}/> */}

            {/* <Form.Control className='mt-3' type="number" placeholder="Precio" style={{color:"black", fontWeight:'bold', fontSize:'1.5rem'}}/> */}

            <InputGroup className="mt-3">
                {/* <input class="form-control" placeholder="Min" aria-label="Username"/> */}
                <span class="input-group-text" style={{fontSize:'1.5rem'}}>Q</span>
                <input class="form-control" placeholder="0.00" aria-label="precio" type='number' style={{fontSize:'1.5rem'}}/>
            </InputGroup>

            {/* <div className='mt-3'>
              <h2 style={{color:"black", fontWeight:'bold'}} > Q 300.00 </h2>
            </div> */}

            <hr class="mt-3 mb-1"/>

            <div className='mt-4'>
              <h4 style={{color:"black", textAlign:"left"}} > Descripcion: </h4>
              {/* <p style={{color:"black", textAlign:"left"}} > Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt urna ut massa pharetra semper. Etiam tortor odio, posuere in suscipit vitae, faucibus non felis. Fusce suscipit tellus facilisis nisl faucibus pretium. Morbi quis nunc id justo euismod volutpat. Maecenas eget dolor tempor, commodo magna rhoncus, aliquet urna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p> */}
              <Form.Control as="textarea" placeholder="" style={{color:"black", textAlign:"left", fontSize:'1rem'}} rows={5}/>
            </div>

            <hr class="mt-3 mb-1"/>

            <div className='mt-4'>
              <button type="button" class="btn-create">Crear</button>
            </div>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'center'}}>

            <img src={preview}
              alt="Avatar" className="img-fluid my-5" style={{ width: '200px' }} />
            <input type="file" name="cover" sx={{ align:'center' }}
              onChange= {(e) => {
                setPreview(URL.createObjectURL(e.target.files[0]))
            }} />


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"
            onClick={() => {setPreview(image); setShow(false);}} 
                      style={{
                        background:"#9d0000",
                        color: '#fff',
                        "&:hover": {
                            background: '#b03232'
                        }
                      }}
          >
            Close
          </Button>
          <Button variant="primary" 
            onClick={() => {
                setImage(preview)
                setShow(false)
            }}
            style={{
                mr: 3,
                background:"#1c4966",
                color: '#fff',
                "&:hover": {
                    background: '#7691a3'
                }
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
    

   



    </div>
  );
}