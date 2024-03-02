import React, { useEffect, useState } from 'react';
import CustomNavbar from "../../components/navbar/navbar.jsx";
import "./SellerRequests.css";
import image_rechazar from "./rechazar.png";
import image_aceptar from "./aceptar.png";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const SellerRequests = () => {
  const [data, setData] = useState([]);

  const cui = localStorage.getItem("id_user");
       const rol = localStorage.getItem("type");
       if (rol !== 0) {
        window.location.href = "http://localhost:3000"; 
        return; 
       }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/pending-sellers');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []); 

  const handleDeleteClick = (dpi) => {
    
    Swal.fire({
      title: "Estas seguro de denegar la solicitud a este vendedor "+dpi+" ?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        

        try {
          const response =  fetch('http://localhost:8080/user/decline-seller', {
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({dpi: parseInt(dpi)})
          });  
          const ok = response.json();

          if(ok.type === 'SUCCESS'){
            Swal.fire("Se denegó la solicitud!", "", "success");
            setData(prevData => {
              return prevData.filter(item => item.dpi !== dpi);
            });
          }else{
            Swal.fire("No se denegó la solicitud!", "", "error");
          }
        } catch (error) {
          console.log('Error', error);
          Swal.fire("Ocurrio un error!", "", "error");
        }
        
      }
    });
  };

  const handleAcceptClick = (dpi) => {
    
    Swal.fire({
      title: "Estas seguro de aceptar la solicitud a este vendedor "+dpi+" ?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        

        try {
          const response =  fetch('http://localhost:8080/user/accept-seller', {
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({dpi: parseInt(dpi)})
          });  
          const ok = response.json();

          if(ok.type === 'SUCCESS'){
            Swal.fire("Se aceptó la solicitud!", "", "success");
            setData(prevData => {
              return prevData.filter(item => item.dpi !== dpi);
            });
          }else{
            Swal.fire("No se aceptó la solicitud!", "", "error");
          }
        } catch (error) {
          console.log('Error', error);
          Swal.fire("Ocurrio un error!", "", "error");
        }
        
      }
    });
  };

  return (
    <div>
      <CustomNavbar />
      <div className='tittle-history'>
        <h1 style={{ textAlign: 'center' }}>Solicitudes de Vendedores</h1>
        <hr />
      </div>
      <div className='box-table'>
        <table className="table table-striped  table-primary" >
          <thead>
            <tr >
              <th >Imagen</th> 
              <th >DPI</th>
              <th >Nombre</th>
              <th >Correo</th> 
              <th ><a style={{color:'#FF0000'}}><strong>Denegar</strong></a> / <a style={{color:'#2ECC71'}}><strong>Aceptar</strong></a></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.dpi}>
                <td ><img src={item.image} alt="Imagen del Vendedor" style={{ width: '100px', height: 'auto' }} /></td> 
                <td style={{paddingTop:"3%"}}>{item.dpi}</td>
                <td style={{paddingTop:"3%"}}>{item.name}</td>
                <td style={{paddingTop:"3%"}}>{item.email}</td>
                <td>
                  <button className='buttonDelete' onClick={() => handleDeleteClick(item.dpi)} >
                    <img src={image_rechazar} alt="Eliminar" style={{ width: '45px', height: 'auto' }} />
                  </button>
                  <button className='buttonAccept' onClick={() => handleAcceptClick(item.dpi)} >
                    <img src={image_aceptar} alt="Aceptar" style={{ paddingTop:"10%", width: '33px', height: 'auto' }} />
                  </button>
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerRequests;
