import React, { useEffect, useState } from "react";
import CustomNavbar from "../../components/navbar/navbar.jsx";
import "./enable_disable.css";
import image_deshabilitar from "./deshabilitar-cursor.png";
import image_habilitar from "./destello.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const EnableDisabledSeller = () => {
  const [data_en, setData_en] = useState([]);

  const [data_dis, setData_dis] = useState([]);

  const cui = localStorage.getItem("id_user");
       const rol = localStorage.getItem("type");
       if (rol !== 0) {
        window.location.href = "http://localhost:3000"; 
        return; 
      }

  const fetchDataEnable = async () => {
    try {
      const response = await fetch("http://localhost:8080/enabled-users");
      const jsonData = await response.json();
      setData_en(jsonData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
  
  useEffect(() => {
    fetchDataEnable();
  }, []);

  const fetchDataDisable = async () => {
    try {
      const response = await fetch("http://localhost:8080/disabled-users");
      const jsonData = await response.json();
      setData_dis(jsonData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
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
        try {
          const response = await fetch("http://localhost:8080/user/disable-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ dpi: parseInt(dpi) }),
          });
          const ok = await response.json(); // Esperamos la resolución de la promesa
          console.log(ok);
          if (ok.TYPE === "SUCCESS") {
            Swal.fire("Se deshabilitó al usuario!", "", "success");
            setData_en((prevData) => {
              return prevData.filter((item) => item.dpi !== dpi);
            });
            fetchDataEnable();
            fetchDataDisable();
          } else {
            Swal.fire("No se pudo deshabilitar al usuario!", "", "error");
          }
        } catch (error) {
          console.log("Error", error);
          Swal.fire("Ocurrio un error!", "", "error");
        }
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
        try {
          const response = await fetch("http://localhost:8080/user/enable-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ dpi: parseInt(dpi) }),
          });
          const ok = await response.json(); // Esperamos la resolución de la promesa
  
          if (ok.TYPE === "SUCCESS") {
            Swal.fire("Se habilitó el usuario!", "", "success");
            setData_dis((prevData) => {
              return prevData.filter((item) => item.dpi !== dpi);
            });
            fetchDataEnable();
            fetchDataDisable();
          } else {
            Swal.fire("No se pudo habilitar al usuario!", "", "error");
          }
        } catch (error) {
          console.log("Error", error);
          Swal.fire("Ocurrio un error!", "", "error");
        }
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
