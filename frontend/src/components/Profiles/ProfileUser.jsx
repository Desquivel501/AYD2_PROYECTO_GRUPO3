import React, { useState, useEffect } from "react";
import "./ProfileUser.css";
import CustomNavbar from "../../components/navbar.jsx";

const ProfileUser = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Función para realizar la solicitud GET
    const fetchData = async () => {
      try {
        const response = await fetch("/profile");
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
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="aux">
              <div
                className="card text-center"
                style={{
                  background: "#D8EBFE",
                  height: "600%",
                  width: "210%",
                  top: "-250%",
                  maxWidth: "5000%"
                }}
              >
                {userData && (
                  <>
                    <div className="profile-photo">
                      <img src={userData.imagen} alt="Profile" />
                    </div>
                    <div className="profile-info" style={{ color: "#007FAF" }}>
                      <h1>{userData.name}</h1>
                      <div className="box-edit"></div>
                      <hr />
                      <h6>
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
