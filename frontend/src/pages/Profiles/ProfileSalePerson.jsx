import React, { useState, useEffect } from "react";
import "./ProfileUser.css";
import CustomNavbar from "../../components/navbar/navbar";
import { useUserPermission } from "../../utilities/Security/Permission";
//import button_edit from "../assets/ButtonEdit/boton-editar.png";
import { postData } from "../../api/api";

import {
  useParams,
  useNavigate,
} from 'react-router-dom';


const ProfileSalesPerson = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const user = localStorage.getItem("user");

  const cui = JSON.parse(user).id;
  const rol = JSON.parse(user).type;

    useEffect(() => {

      // Función para realizar la solicitud POST

      try {
        // Obtener los datos del localStorage

        if (rol !== 2) {
          // window.location.href = "http://localhost:3000";
          // return;
          navigate("/");
        }

        // Verificar que cui y role no sean null
        if (!user) {
          throw new Error("No se encontraron datos en el localStorage");
        }

        postData({ endpoint: "user/profile", body: { dpi: cui, role: rol } }).then((data) => {
          console.log(data);
          if(data.role ==2){
            data.role = "Vendedor";
          }
          if(data.state==1){
            setUserData(data); // Actualizar el estado con los datos obtenidos
          }else{
            setUserData({name:"Usuario deshabilitado"})
          }
        });
      } catch (error) {
        console.error("Error:", error);
      }

    }, []);

  useUserPermission(2)

  return (
    <div>
      <CustomNavbar />
      <div className="container" style={{ margin: "12% auto" }} >
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
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
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