import React, { useEffect, useState } from "react";
import CustomNavbar from "../../components/navbar/navbar.jsx";
import "./enable_disable.css";
import image_deshabilitar from "./deshabilitar-cursor.png";
import image_habilitar from "./destello.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { postData } from "../../api/api.js";

import {
  useNavigate,
} from 'react-router-dom';
import { getData } from "../../api/api.js";

const MySwal = withReactContent(Swal);
const EnableDisabledSeller = () => {

  const navigate = useNavigate();

  const [data_en, setData_en] = useState([]);

  const [data_dis, setData_dis] = useState([]);

  const user = localStorage.getItem("user");

  // const cui = localStorage.getItem("id_user");
  // const rol = localStorage.getItem("type");
  const cui = JSON.parse(user).id;
  const rol = JSON.parse(user).type;

  if (rol !== 0) {
    navigate("/");
  }

  const fetchDataEnable = async () => {

    let endpoint = `enabled-users`;
    getData({ endpoint }).then((data) => {
      setData_en(data);
    });

  };
  
  useEffect(() => {
    fetchDataEnable();
  }, []);

  const fetchDataDisable = async () => {
    let endpoint = `disabled-users`;
    getData({ endpoint }).then((data) => {
      setData_dis(data);
    });
  };
  
  useEffect(() => {
    fetchDataDisable();
  }, []);
  

  const handleDisableClick = async (dpi) => {
    Swal.fire({
      title: "Estas seguro de deshabilitar este usuario " + dpi + " ?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      denyButtonText: `Don't save`,
    }).then(async (result) => { // Utilizamos async aquí también

      if (result.isConfirmed) {

        let endpoint = `user/disable-user`;

        let body = { dpi: parseInt(dpi) };

        postData({ endpoint, body }).then((data) => {
          if (data.TYPE === "SUCCESS") {
            Swal.fire("Se deshabilitó al usuario!", "", "success");
            setData_en((prevData) => {
              return prevData.filter((item) => item.dpi !== dpi);
            });
            fetchDataEnable();
            fetchDataDisable();
          } else {
            Swal.fire("No se pudo deshabilitar al usuario!", "", "error");
          }
        });
      }
    });
  };

  const handleEnableClick = async (dpi) => {
    Swal.fire({
      title: "Estas seguro de habilitar este usuario " + dpi + " ?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      denyButtonText: `Don't save`,
    }).then(async (result) => { // Utilizamos async aquí también
      if (result.isConfirmed) {

        let endpoint = `user/enable-user`;
        let body = { dpi: parseInt(dpi) };

        postData({ endpoint, body }).then((data) => {
          if (data.TYPE === "SUCCESS") {
            Swal.fire("Se habilitó el usuario!", "", "success");
            setData_dis((prevData) => {
              return prevData.filter((item) => item.dpi !== dpi);
            });
            fetchDataEnable();
            fetchDataDisable();
          } else {
            Swal.fire("No se pudo habilitar al usuario!", "", "error");
          }
        });


      }
    });
  };

  return (
    <div>
      <CustomNavbar />
      <div className="tittle-history">
        <h1 style={{ textAlign: "center" }}>Vendedores</h1>
        <hr />
      </div>
      <div className="box-table">
        <table className="table table-striped  table-success">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>DPI</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>
                <a style={{ color: "#929292" }}>
                  <strong>Deshabilitar</strong>
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {data_en.map((item) => (
              <tr key={item.dpi}>
                {item.role === 2 ? (
                  <>
                    <td>
                      <img
                        src={item.image}
                        alt="Imagen del vendedor"
                        style={{ width: "100px", height: "auto" }}
                      />
                    </td>
                    <td style={{ paddingTop: "3%" }}>{item.dpi}</td>
                    <td style={{ paddingTop: "3%" }}>{item.name}</td>
                    <td style={{ paddingTop: "3%" }}>{item.email}</td>
                    <td>
                      <button
                        className="buttonDisabled"
                        onClick={() => handleDisableClick(item.dpi)}
                      >
                        <img
                          src={image_deshabilitar}
                          alt="Eliminar"
                          style={{ width: "45px", height: "auto" }}
                        />
                      </button>
                    </td>
                  </>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="tittle-history">
        <h1 style={{ textAlign: "center" }}>Vendedores Deshabilitados</h1>
        <hr />
      </div>
      <div className="box-table">
        <table className="table table-striped  table-dark">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>DPI</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>
                <a style={{ color: "#F1C40F" }}>
                  <strong>Habilitar</strong>
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {data_dis.map((item) => (
              <tr key={item.dpi}>
                {item.role === 2 ? (
                  <>
                    <td>
                      <img
                        src={item.image}
                        alt="Imagen del Vendedor"
                        style={{ width: "100px", height: "auto" }}
                      />
                    </td>
                    <td style={{ paddingTop: "3%" }}>{item.dpi}</td>
                    <td style={{ paddingTop: "3%" }}>{item.name}</td>
                    <td style={{ paddingTop: "3%" }}>{item.email}</td>
                    <td>
                      <button
                        className="buttonEnable"
                        onClick={() => handleEnableClick(item.dpi)}
                      >
                        <img
                          src={image_habilitar}
                          alt="Eliminar"
                          style={{ width: "45px", height: "auto" }}
                        />
                      </button>
                    </td>
                  </>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnableDisabledSeller;
