import React, { useEffect, useState } from 'react';
import CustomNavbar from "../../components/navbar/navbar.jsx";
import "./SellerRequests.css";
import image_rechazar from "./rechazar.png";
import image_aceptar from "./aceptar.png";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import {
  useNavigate,
} from 'react-router-dom';
import { getData, postData } from '../../api/api.js';

const MySwal = withReactContent(Swal)

const SellerRequests = () => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const user = localStorage.getItem("user");

  const cui = JSON.parse(user).id;
  const rol = JSON.parse(user).type;

  if (rol !== 0) {
    navigate("/");
  }


  useEffect(() => {
    const fetchData = async () => {
      let endpoint = `  `;
      getData({ endpoint }).then((data) => {
        setData(data);
      });
    };

    fetchData();
  }, []); 

  const handleDeleteClick = async (dpi) => {
    
    Swal.fire({
      title: "Estás seguro de denegar la solicitud a este vendedor "+dpi+" ?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      denyButtonText: `Don't save`
    }).then(async (result) => {
      if (result.isConfirmed) {
        let endpoint = `user/decline-seller`;
        let body = { dpi: parseInt(dpi) };

        postData({ endpoint, body }).then((data) => {
          if (data.TYPE === "SUCCESS") {
            Swal.fire("Se denegó la solicitud!", "", "success");
            setData((prevData) => {
              return prevData.filter((item) => item.dpi !== dpi);
            });
          } else {
            Swal.fire("No se denegó la solicitud!", "", "error");
          }
        });
        
      }
    });
  };

const handleAcceptClick = async (dpi) => {
    
    Swal.fire({
      title: "Estás seguro de aceptar la solicitud a este vendedor "+dpi+" ?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      denyButtonText: `Don't save`
    }).then(async (result) => {
      if (result.isConfirmed) {
        let endpoint = `user/accept-seller`;
        let body = { dpi: parseInt(dpi) };

        postData({ endpoint, body }).then((data) => {
          if (data.TYPE === "SUCCESS") {
            Swal.fire("Se aceptó la solicitud!", "", "success");
            setData((prevData) => {
              return prevData.filter((item) => item.dpi !== dpi);
            });
          } else {
            Swal.fire("No se aceptó la solicitud!", "", "error");
          }
        });
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