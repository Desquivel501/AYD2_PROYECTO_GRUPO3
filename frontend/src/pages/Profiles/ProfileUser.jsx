import React, { useState, useEffect } from "react";
import "./ProfileUser.css";
import CustomNavbar from "../../components/navbar/navbar";

const ProfileUser = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Función para realizar la solicitud POST
    const fetchData = async () => {
      try {
        // Obtener los datos del localStorage
        const cui = localStorage.getItem("cui");
        const role = localStorage.getItem("role");

        // Verificar que cui y role no sean null
        if (!cui || !role) {
          throw new Error("No se encontraron datos en el localStorage");
        }

        // Realizar la solicitud POST
        const response = await fetch("http://localhost:8080/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ cui: parseInt(cui), role: role })
        });

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }
        const data = await response.json();
        setUserData(data); // Actualizar el estado con los datos obtenidos
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <CustomNavbar />
      <div className="container" style={{ margin: "12% auto" }}>
        <div className="row">
          <div className="col-md-6">
            <div className="aux">
              <div
                className="card text-center"
                style={{
                  background: "#D8EBFE",
                  height: "600%",
                  width: "210%",
                  maxWidth: "5000%"
                }}
              >
                {userData && (
                  <>
                    <div className="profile-photo">
                      <img src={userData.imagen} alt="Profile" />
                    </div>
                    <div className="profile-info" style={{ color: "#007FAF" }}>
                      <h1 style={{ textAlign: "center" }}>{userData.name}</h1>
                      <div className="box-edit"></div>
                      <hr />
                      <h6 style={{ textAlign: "center" }}>
                        <strong>Email: </strong> {userData.email}
                      </h6>
                    </div>
                    <div className="profile-cui">
                      <h6>CUI - {userData.cui}</h6>
                      <h5 style={{ color: "#007FAF" }}>{userData.role}</h5>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
