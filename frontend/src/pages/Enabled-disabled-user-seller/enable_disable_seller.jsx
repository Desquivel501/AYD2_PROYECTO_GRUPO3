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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/enabled-users");
        const jsonData = await response.json();
        setData_en(jsonData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/disabled-users");
        const jsonData = await response.json();
        setData_dis(jsonData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleDisableClick = (dpi) => {
    Swal.fire({
      title: "Estas seguro de deshabilitar este vendedor " + dpi + " ?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const response = fetch("http://localhost:8080/user/disable-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ dpi: parseInt(dpi) }),
          });
          const ok = response.json();

          if (ok.type === "SUCCESS") {
            Swal.fire("Se deshabilitó al vendedor!", "", "success");
            setData((prevData) => {
              return prevData.filter((item) => item.dpi !== dpi);
            });
          } else {
            Swal.fire("No se pudo deshabilitar al vendedor!", "", "error");
          }
        } catch (error) {
          console.log("Error", error);
          Swal.fire("Ocurrio un error!", "", "error");
        }
      }
    });
  };

  const handleEnableClick = (dpi) => {
    Swal.fire({
      title: "Estas seguro de habilitar este vendedor " + dpi + " ?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const response = fetch("http://localhost:8080/user/enable-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ dpi: parseInt(dpi) }),
          });
          const ok = response.json();

          if (ok.type === "SUCCESS") {
            Swal.fire("Se habilitó el vendedor!", "", "success");
            setData((prevData) => {
              return prevData.filter((item) => item.dpi !== dpi);
            });
          } else {
            Swal.fire("No se pudo habilitar al vendedor!", "", "error");
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
