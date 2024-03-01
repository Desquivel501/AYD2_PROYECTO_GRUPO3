import React, { useEffect, useState } from 'react';
import CustomNavbar from "../../components/navbar/navbar.jsx";
import "./History_buys.css";

const HistoryBuys = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/history-buys'); 
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <CustomNavbar />
      <div className='tittle-history'>
        <h1 style={{ textAlign: 'center' }}>Historial de Compras</h1>
        <hr />
      </div>
      <div className='box-table'>
        <table className="table table-striped table-primary">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Vendedor</th>
              <th>Precio</th>
              <th>Imagen</th> 
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id_compra}>
                <td>{item.id_compra}</td>
                <td>{item.nombre_producto}</td>
                <td>{item.vendedor}</td>
                <td>{item.precio}</td>
                <td><img src={item.imagen} alt="Imagen del producto" style={{ width: '100px', height: 'auto' }} /></td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryBuys;
