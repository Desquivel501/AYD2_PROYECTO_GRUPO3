import React, { Component } from 'react';
import './Profile.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Swal from 'sweetalert2'
// import { sesionContext } from "../../context/SessionContext";
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import CustomNavbar from '../../components/navbar/navbar';

// import { getDataAuth, patchData } from '../../api/api';

import { getData, postData, SubirImagen } from '../../api/api';

export default function CustomProfile() {

    const navigate = useNavigate();

    const [state, setState] = useState({
        nombre: '', 
        nombretemp: '',
        tipo_usuario: '', 
        dpi: 0,
        correo: '', 
        correotemp: '',
        imagen: 'https://ih0.redbubble.net/image.1046392278.3346/raf,360x360,075,t,fafafa:ca443f4786.jpg',
        contrasena: '',
        nueva_contrasena: '',
        verificar_contrasena: '',
        preview: 'https://ih0.redbubble.net/image.1046392278.3346/raf,360x360,075,t,fafafa:ca443f4786.jpg',
        color: '#212529',
        file: null,
    })
    const [count, setCount] = useState(0);

    const user = localStorage.getItem("user");
    const cui = JSON.parse(user).id;
    const rol = JSON.parse(user).type;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    useEffect(() => {

        if (!user) {
            throw new Error("No se encontraron datos en el localStorage");
        }

        postData({ endpoint: "user/profile", body: { dpi: cui, role: rol } }).then((data) => {
            // console.log(data);
            if(!data){
                Swal.fire({
                    title: 'Error',
                    text: 'Error al obtener los datos de usuario',
                    icon: 'error',
                    confirmButtonColor: '#9d0000',
                    confirmButtonText: 'Cerrar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(0);
                    }
                })
            }

            setState({
                ...state,
                nombre: data.name,
                nombretemp: data.name,
                tipo_usuario: (data.role == 0 ? 'Administrador' : data.role == 1 ? 'Usuario' : 'Vendedor'),
                correo: data.email,
                correotemp: data.email,
                imagen: data.image,
                contrasena: data.password,
            })

        });
    }, []);


    const handleUpdate = async () => {

        if (state.verificar_contrasena !== state.contrasena) {
            Swal.fire({
                title: 'Error',
                text: 'La contraseña ingresada no coincide',
                icon: 'error',
                confirmButtonColor: '#9d0000',
                confirmButtonText: 'Cerrar'
            }).then((result) => {
                if (result.isConfirmed) {
                    return;
                }
            })
            return;
        }

        let url = null;
        if(state.file){
            url = await SubirImagen(state.file);
            console.log(url);
        }

        const endpoint = "user/update-profile";
        
        const body = {
            dpi: cui,
            name: state.nombretemp,
            email: state.correotemp,
            image: (url ? url : state.imagen),
            password: state.contrasena
        }

        postData({ endpoint: endpoint, body: body }).then((data) => {
            console.log(data);

            if(!data){
                Swal.fire({
                    title: 'Error',
                    text: 'Error al actualizar los datos',
                    icon: 'error',
                    confirmButtonColor: '#9d0000',
                    confirmButtonText: 'Cerrar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        return;
                    }
                })
                return;
            }

            if(data.TYPE === 'ERROR'){
                Swal.fire({
                    title: 'Error',
                    text: data.MESSAGE,
                    icon: 'error',
                    confirmButtonColor: '#9d0000',
                    confirmButtonText: 'Cerrar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        return;
                    }
                })
            }else{
                Swal.fire({
                    title: 'Datos actualizados',
                    text: 'Los datos se han actualizado correctamente',
                    icon: 'success',
                    confirmButtonColor: '#9d0000',
                    confirmButtonText: 'Cerrar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(0);
                    }
                })
            }
        });

        setState({...state, verificar_contrasena: '', nueva_contrasena: '', contrasena: ''})
    }

    return (

        <div className="profile-root">

        <CustomNavbar />
                                
            <section className="vh-170">
                <div className="container pb-3 h-80" style={{maxWidth:'100%'}}>

                    <div className="row d-flex justify-content-center align-items-center h-50">
                        <div className="card mb-3" style={{ borderRadius: '.5rem'}}>
                            <div className="row g-0 px-4" style={{ justifyContent:'center' }}>
                                
                                <div className="col-md-12 text-center text-white pb-4"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', backgroundColor:state.color }}>
                                    <img src={state.imagen}
                                        alt="Avatar" className="img-fluid my-5" 
                                        style={{ width: '400px', border:1, borderColor:'#000',
                                                boxShadow: '5px 5px 10px #000000',
                                                margin: '4em', 
                                                borderRadius: '50%',
                                        }} 
                                    />

                                    <h3 style={{color:'#fff'}}>Perfil</h3>
                                    <h1>{state.nombre}</h1>
                                    <h4>{state.tipo_usuario}</h4>

                                    {
                                        rol === 2 ?
                                        <div className='my-2'>
                                            <span class="fa fa-star px-1 checked"></span>
                                            <span class="fa fa-star px-1 checked"></span>
                                            <span class="fa fa-star px-1 checked"></span>
                                            <span class="fa fa-star px-1 checked"></span>
                                            <span class="fa fa-star px-1 checked"></span>
                                            </div>
                                        : null
                                    }

                                </div>

                                <div className="col-md-10">
                                    <div className="row d-flex p-4">
                                        <div className="row pt-1 pb-1">
                                            <h3>Actualizar mis datos</h3>
                                        </div>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1" style={{justifyContent:'center'}}>
                                            <div className="col-7 mb-3">
                                                <h5>Nombre</h5>

                                                <Form.Control type="text" placeholder="" 
                                                    style={{color:"black", fontSize:'1.5rem'}}
                                                    value={state.nombretemp}
                                                    onChange={(e) => setState({...state, nombretemp: e.target.value})}
                                                />

                                            </div>

                                        </div>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1" style={{justifyContent:'center'}}>
                                            

                                            <div className="col-7 mb-3">
                                                <h5>Correo</h5>
                                                <Form.Control type="text" placeholder="" 
                                                    style={{color:"black", fontSize:'1.5rem'}}
                                                    value={state.correotemp}
                                                    onChange={(e) => setState({...state, correotemp: e.target.value})}
                                                />
                                            </div>
                                            <hr className="mt-0 mb-4" />

                                            <div className="col-7 mb-3">
                                                <h5>DPI</h5>
                                                <p className="text-muted">{cui}</p>
                                            </div>
                                            <hr className="mt-0 mb-4" />

                                            
                                            <div className="col-7 mb-3">
                                                <h5>Actualizar Foto de Perfil</h5>

                                                <button type="button" class="btn-image"
                                                    onClick={handleShow}
                                                >
                                                    Cambiar
                                                </button>

                                            </div>
                                            <hr className="mt-0 mb-4" />
                                            <div className="col-7 mb-3">

                                                <button type="button" class="btn-update"
                                                    onClick={handleShow2}
                                                >
                                                    Actualizar datos
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cambiar foto de perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'center'}}>

                    <img src={state.preview}
                        alt="Avatar" className="img-fluid my-5" style={{ width: '200px' }} />
                    <input type="file" name="cover" sx={{ align:'center' }}
                        onChange= {(e) => {
                        //   setPreview(URL.createObjectURL(e.target.files[0]))
                        setState({...state, preview: URL.createObjectURL(e.target.files[0]), file: e.target.files[0]})
                    }} />


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={() => {
                                // setPreview(image); 
                                setState({...state, preview: state.imagen, file: null})
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
                            setState({...state, imagen: state.preview})
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


            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar datos</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'center'}}>

                    <h5 variant="details" noWrap component="div"  align="left" alignSelf={'left'}
                        sx={{ border:0, pb:1, color: '#fff'}}
                    >
                        Confirme su contraseña para guardar los cambios
                    </h5>

                    <Form.Control type="password" placeholder="" 
                        style={{color:"black", fontSize:'1rem', width:'70%'}}
                        value={state.verificar_contrasena}
                        onChange={(e) => setState({...state, verificar_contrasena: e.target.value})}
                    />




                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={() => {
                            // setPreview(image); 
                            setState({...state, verificar_contrasena: '', nueva_contrasena: '', contrasena: ''})
                            setShow2(false)
                        }} 

                        style={{
                            background:"#9d0000",
                            color: '#fff',
                            "&:hover": {
                                background: '#b03232'
                            }
                        }}
                    >
                        Cancelar
                    </Button>

                    <Button variant="primary" 
                        onClick={() => {
                            //   setImage(preview)
                            handleUpdate()
                            setShow2(false)
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
                        Actualizar
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>



    )
    
}