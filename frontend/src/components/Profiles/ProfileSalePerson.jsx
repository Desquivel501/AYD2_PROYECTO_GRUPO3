import React, { useState, useEffect } from "react";
import "./ProfileUser.css";
import CustomNavbar from "../../components/navbar.jsx"
//import button_edit from "../assets/ButtonEdit/boton-editar.png";

const ProfileSalesPerson = () => {
    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await fetch("/profile")
                if(!response.ok){
                    throw new Error("Error al obtener los datos del vendedor")
                }
                const data = await response.json()
                setUserData(data)
            }catch(error){
                console.lop("Error: ", error)
            }
        }
        fetchData()
    }, [])

  return (
    <div>
      <CustomNavbar />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="aux">
            <div
              className="card text-center"
              style={{background: "#D5F5E3",height: "600%",width: "210%",top: "-250%",maxWidth: "5000%",}}>
                {userData &&(
                    <>
              <div className="profile-photo">
                  <img src={userData.imagen} alt="Profile" />
                </div>
                <div className="profile-info" style={{color:"#229954"}}>
                  <h1>{userData.name}</h1>
                  <div className="box-edit">
                    
                  </div>
                  <hr />
                  <h6>
                    <strong>Email: </strong> {userData.email}
                  </h6>
                </div>
                <div className="profile-cui">
                  <h6>CUI - {userData.cui}</h6>
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