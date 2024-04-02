import React, { useState, useEffect } from "react";
import "./ProfileUser.css";
import CustomNavbar from "../../components/navbar/navbar";
import { useUserPermission } from "../../utilities/Security/Permission";

import { useNavigate } from 'react-router-dom';

const ProfileUser = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    name: "",
    email: "",
    image: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const user = localStorage.getItem("user");
    const cui = JSON.parse(user).id;
    const rol = JSON.parse(user).type;
    
    if (rol !== 1) {
      // console.log(rol);
      // window.location.href = "http://localhost:3000/"; 
      // return; 
      navigate("/");
    }
    let endpoint = `user/profile`;
    let body = { dpi: cui, role: rol };

    postData({ endpoint, body }).then((data) => {
      if (data.role === 1) {
        data.role = "Usuario";
      }
      if (data.state === 1) {
        setUserData(data);
      } else {
        setUserData({ name: "Usuario deshabilitado" });
      }
    });

  };

  useUserPermission(1)

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
                  maxWidth: "5000%",
                }}
              >
                {userData && (
                  <>
                    <div className="profile-photo">
                      <img
                          alt="Profile"
                          src={userData.image}
                          // width="80%"
                          // height="auto"
                          // className="d-inline-block align-top mb-3"
                      />
                    </div>

                    <div className="profile-info" style={{ color: "#007FAF" }}>
                    {editMode && <div className="edit-mode-overlay"></div>}
                      {editMode ? (
                        <>
                          <div className="edit-profile">
                            <form>
                              <div class="mb-3">
                                <label
                                  for="exampleInputEmail1"
                                  class="form-label"
                                >
                                  Email
                                </label>
                                <input
                                  type="email"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                />
                                
                              </div>
                              <div class="mb-3">
                                <label
                                  for="exampleInputEmail1"
                                  class="form-label"
                                >
                                  Nombre
                                </label>
                                <input
                                  type="email"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                />
                                
                              </div>
                              <div class="mb-3">
                                <label
                                  for="exampleInputEmail1"
                                  class="form-label"
                                >
                                  
                                </label>
                                <input
                                  type="email"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                />
                                
                              </div>
                              <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1"/>
                              </div>
                              
                              <div class="mb-3">
                                <label for="formFileSm" class="form-label">
                                  Nueva Imagen
                                </label>
                                <input
                                  class="form-control form-control-sm"
                                  id="formFileSm"
                                  type="file"
                                />
                              </div>
                              <button type="submit" class="btn btn-primary">
                                Submit
                              </button>
                            </form>
                          </div>
                        </>
                      ) : (
                        <>
                          <h1 style={{ textAlign: "center" }}>
                            {userData.name}
                          </h1>
                          <div className="box-edit">
                            {/*<button onClick={handleEditClick}>Editar</button>*/}
                          </div>
                          <hr />
                          <h6 style={{ textAlign: "center" }}>
                            <strong>Email: </strong> {userData.email}
                          </h6>
                        </>
                      )}
                    </div>
                    <div className="profile-cui">
                      <h6>DPI - {userData.dpi}</h6>
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
