import React, { useState, useEffect } from "react";
import "./ProfileUser.css";
import CustomNavbar from "../../components/navbar/navbar";
//import button_edit from "../assets/ButtonEdit/boton-editar.png";

const ProfileSalesPerson = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      // Función para realizar la solicitud POST
      const fetchData = async () => {
        try {
          // Obtener los datos del localStorage
         const cui = localStorage.getItem("id_user");
          const rol = localStorage.getItem("type");
          if (rol !== 2) {
            window.location.href = "http://localhost:3000"; 
            return; 
          }
  
          // Verificar que cui y role no sean null
          if (!cui || !role) {
            throw new Error("No se encontraron datos en el localStorage");
          }
  
          // Realizar la solicitud POST
          const response = await fetch("http://localhost:8080/user/profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ dpi: cui, role: rol })
          });
  
          if (!response.ok) {
            throw new Error("Error al obtener los datos del usuario");
          }
          const data = await response.json();
          console.log(data)
          if(data.role ==2){
            data.role = "Vendedor";
          }
          if(data.state==1){
            setUserData(data); // Actualizar el estado con los datos obtenidos
          }else{
            setUserData({name:"Usuario deshabilitado"})
          }
        
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div>
      <CustomNavbar />
      <div className="container" style={{margin:"12% auto"}} >
        <div className="row">
          <div className="col-md-6">
            <div className="aux">
            <div
              className="card text-center"
              style={{background: "#D5F5E3",height: "600%",width: "210%",maxWidth: "5000%",}}>
                {userData &&(
                    <>
              <div className="profile-photo">
                  <img src={userData.image} alt="Profile" />
                </div>
                <div className="profile-info" style={{color:"#229954"}}>
                  <h1 style={{textAlign:"center"}}>{userData.name}</h1>
                  <div className="box-edit">
                    
                  </div>
                  <hr />
                  <h6 style={{textAlign:"center"}}>
                    <strong>Email: </strong> {userData.email}
                  </h6>
                </div>
                <div className="profile-cui">
                  <h6>DPI - {userData.dpi}</h6>
                  <h5 style={{color:"#229954"}}>{userData.role}</h5>
                </div>
                </>
                )}
                <div className="rate">
                <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSalesPerson;