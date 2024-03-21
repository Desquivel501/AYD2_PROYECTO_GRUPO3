import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './CrearProducto.css';

import { ProductCard } from '../../components/ProductCard/ProductCard';
import CustomNavbar from '../../components/navbar/navbar';

import { getData, SubirImagen, postData, deleteData } from '../../api/api';

import {
  useParams,
  useNavigate,
} from 'react-router-dom';

import Swal from 'sweetalert2';
import { useUserPermission } from '../../utilities/Security/Permission';


export const EditProduct = (props) => {

  const {
      crear = false
  } = props;

    const { id = 0 } = useParams();
    const navigate = useNavigate();

    const user = localStorage.getItem('user');
    const userJson = JSON.parse(user);

    useUserPermission(2);

    const [show, setShow] = useState(false);

    const [product, setProduct] = useState({
        id: 0,
        nombre: "",
        descripcion: "",
        precio: 0,
        existencia: 0,
        categoria: "Papas",
        vendedor: "",
        imagen: "https://placehold.co/800",
        preview: "https://placehold.co/800",
        file: null
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if(!crear){
          let endpoint = `product?id=${id}`
          getData({ endpoint }).then((data) => {
              // console.log(data);
              setProduct({
                  ...data,
                  preview: data.imagen
              })

          });
        }
    }, []);

    const updateProduct = async () => {
      let url = null;
      if(product.file){
        url = await SubirImagen(product.file);
      }

      const endpoint = `edit-product`;

      const body = { 
        product_id: product.product_id,
        nombre: product.nombre,
        categoria: product.categoria,
        precio: Number(product.precio),
        descripcion: product.descripcion,
        existencia: Number(product.existencia),
        imagen: url ? url : product.imagen,
      }

      postData({ endpoint, body }).then((data) => {
          // console.log(data);

          if(data.type == "SUCCESS"){
            // alert("Producto actualizado correctamente");
            Swal.fire({
              title: 'Producto actualizado',
              icon: 'success',
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result.isConfirmed) {
                navigate(0);
              }
            })
          } else {
            // alert("Error al actualizar producto");
            Swal.fire({
              title: 'Error!',
              text: data.Error,
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
      });
    }

    const deleteProduct = async () => {
      const endpoint = `/delete-product?id=${id}`;

      getData({ endpoint }).then((data) => {
        // console.log(data);
        if(data.type === "SUCCESS"){
          // alert("Producto eliminado correctamente");
          Swal.fire({
            title: 'Producto eliminado',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(-1);
            }
          })
        } else {
          Swal.fire({
            title: 'Error!',
            text: data.Error,
            icon: 'error',
            confirmButtonText: 'Ok'
          })

        }
      });
    }

    const createProduct = async () => {

      let url = null;
      if(product.file){
        url = await SubirImagen(product.file);
      }
  
      const endpoint = `create-product`;
  
      const body = { 
        nombre: product.nombre,
        vendedor: String(userJson.id),
        existencia: Number(product.existencia),
        precio: Number(product.precio),
        categoria: "Test",
        descripcion: product.descripcion,
        imagen: url ? url : product.imagen,
      }

      console.log(body);
      
      postData({ endpoint, body }).then((data) => {
        if(data.type === "SUCCESS"){
          Swal.fire({
            title: 'Producto creado!',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(`/vendedor/${userJson.id}/catalogo`);
            }
          })
        } else {
          Swal.fire({
            title: 'Error!',
            text: data.Error,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      });
    }


  return (
    <div className="product-root">
      <CustomNavbar />
      <Container className="contentContainer">
        <Row>
          <Col xl={7} className='product-info-container'>
              
              <div className='product-image-container'>
                <img
                    alt=""
                    src={product.imagen}
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

              <Form.Control type="text" placeholder="Nombre del producto" style={{color:"black", fontWeight:'bold', fontSize:'2.5rem'}}
                value={product.nombre}
                onChange={
                    (e) => setProduct({...product, nombre: e.target.value})
                }
              />

              <div className='mt-3'>
                <h5 style={{color:"blue", textAlign:"left"}} > Vendedor: {product.vendedor} </h5>
              </div>

              <hr class="mt-3 mb-1"/>
            
              <div className='mt-4'>
                <h4 style={{color:"black", textAlign:"left"}} > Existencias: </h4>
                <input class="form-control" placeholder="0.00" aria-label="precio" type='number' style={{fontSize:'1.5rem'}} 
                    value={product.existencia} 
                    onChange={
                        (e) => setProduct({...product, existencia: e.target.value})
                    }/>
              </div>

              <hr class="mt-3 mb-1"/>

              <InputGroup className="mt-3">
                  {/* <input class="form-control" placeholder="Min" aria-label="Username"/> */}
                  <span class="input-group-text" style={{fontSize:'1.5rem'}}>Q</span>
                  <input class="form-control" placeholder="0.00" aria-label="precio" type='number' style={{fontSize:'1.5rem'}}
                    value={product.precio}
                    onChange={
                        (e) => setProduct({...product, precio: e.target.value})
                    }
                  />
              </InputGroup>

              <hr class="mt-3 mb-1"/>

              <div className='mt-4'>
                <h4 style={{color:"black", textAlign:"left"}} > Descripcion: </h4>
                <Form.Control as="textarea" placeholder="" style={{color:"black", textAlign:"left", fontSize:'1rem'}} rows={5}
                    value={product.descripcion}
                    onChange={
                        (e) => setProduct({...product, descripcion: e.target.value})
                    }
                />
              </div>

              <hr class="mt-3 mb-1"/>

              {
                !crear ? <>
                
                  <div className='mt-4'>
                    <button type="button" class="btn-create"
                      onClick={updateProduct}
                    >
                      Guardar Cambios
                    </button>
                  </div>

                  <div className='mt-4'>
                    <button type="button" class="btn-create"
                      onClick={deleteProduct}
                      style={{background:"#9d0000", color: '#fff', "&:hover": {background: '#b03232'}}}
                    >
                      Eliminar Producto
                    </button>
                  </div>
                </> 
                :
                <>
                  <div className='mt-4'>
                    <button type="button" class="btn-create"
                      onClick={createProduct}
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </>
              }

              


          </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'center'}}>

              <img src={product.preview}
                alt="Avatar" className="img-fluid my-5" style={{ width: '200px' }} />
              <input type="file" name="cover" sx={{ align:'center' }}
                onChange= {(e) => {
                //   setPreview(URL.createObjectURL(e.target.files[0]))
                setProduct({...product, preview: URL.createObjectURL(e.target.files[0]), file: e.target.files[0]})
              }} />


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"
                onClick={() => {
                        // setPreview(image); 
                        setProduct({...product, preview: product.imagen, file: null})
                        setShow(false)
                    }} 
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
                //   setImage(preview)
                setProduct({...product, imagen: product.preview})
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